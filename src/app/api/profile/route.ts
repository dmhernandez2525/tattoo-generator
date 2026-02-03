import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'

type ProfileRole = 'user' | 'artist'

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// User-facing roles - admin is excluded to prevent privilege escalation
const profileSchema = z.object({
  displayName: z.string().min(2).max(64),
  role: z.enum(['user', 'artist']),
})

// Metadata schema for reading (can include admin for existing users)
const metadataSchema = z.object({
  displayName: z.string().optional(),
  role: z.enum(['user', 'artist', 'admin']).optional(),
  onboardingCompleted: z.boolean().optional(),
})

const buildProfileResponse = (data: { displayName: string; role: ProfileRole }) => {
  return NextResponse.json({ success: true, data })
}

export async function GET() {
  if (demoMode) {
    return NextResponse.json({ success: false, error: 'Demo mode enabled.' }, { status: 403 })
  }

  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await clerkClient.users.getUser(userId)
    const parsed = metadataSchema.safeParse(user.publicMetadata)
    const displayName = parsed.success
      ? parsed.data.displayName ?? user.fullName ?? user.firstName ?? ''
      : user.fullName ?? user.firstName ?? ''
    // Constrain role to user-facing options (admin users show as 'user' in API response)
    const rawRole = parsed.success ? parsed.data.role ?? 'user' : 'user'
    const role: ProfileRole = rawRole === 'admin' ? 'user' : rawRole === 'artist' ? 'artist' : 'user'

    return buildProfileResponse({ displayName, role })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    logger.error('profile.get.failed', { detail: message })
    return NextResponse.json({ success: false, error: 'Unable to load profile.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (demoMode) {
    return NextResponse.json({ success: false, error: 'Demo mode enabled.' }, { status: 403 })
  }

  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const parsedBody = profileSchema.safeParse(await request.json())
    if (!parsedBody.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload.' }, { status: 400 })
    }

    const { displayName, role } = parsedBody.data

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        displayName,
        role,
        onboardingCompleted: true,
      },
    })

    return buildProfileResponse({ displayName, role })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    logger.error('profile.save.failed', { detail: message })
    return NextResponse.json({ success: false, error: 'Unable to save profile.' }, { status: 500 })
  }
}
