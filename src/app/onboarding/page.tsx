'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { z } from 'zod'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DemoRoleSelector } from '@/components/demo/DemoRoleSelector'

type ProfileRole = 'user' | 'artist' | 'admin'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const profileResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      displayName: z.string(),
      role: z.enum(['user', 'artist', 'admin']),
    })
    .optional(),
  error: z.string().optional(),
})

const roleOptions: { value: ProfileRole; label: string }[] = [
  { value: 'user', label: 'Collector' },
  { value: 'artist', label: 'Artist' },
]

export default function OnboardingPage() {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
  if (demoMode) {
    return <DemoRoleSelector />
  }

  return <OnboardingForm />
}

function OnboardingForm() {
  const { user, isLoaded } = useUser()
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<ProfileRole>('user')
  const [status, setStatus] = useState<SaveState>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isLoaded || !user) return
    const name = user.fullName || user.firstName || ''
    // Use setTimeout to avoid synchronous setState in effect body
    if (name) {
      setTimeout(() => setDisplayName(name), 0)
    }
  }, [isLoaded, user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!displayName.trim()) {
      setStatus('error')
      setMessage('Please enter a display name.')
      return
    }

    setStatus('saving')
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: displayName.trim(),
          role,
        }),
      })

      const payloadResult = profileResponseSchema.safeParse(await response.json())
      const payload = payloadResult.success ? payloadResult.data : null

      if (!response.ok || !payload?.success) {
        setStatus('error')
        setMessage(payload?.error ?? 'Unable to save profile.')
        return
      }

      setStatus('saved')
      setMessage('Profile saved. You are ready to explore.')
    } catch {
      setStatus('error')
      setMessage('Unable to save profile.')
    }
  }

  return (
    <Layout className="flex items-center justify-center min-h-[80vh] py-12">
      <Card variant="glass" className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Display Name</label>
              <Input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold tracking-wide transition-all ${
                      role === option.value
                        ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                        : 'border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <p
                className={`text-sm ${
                  status === 'error' ? 'text-red-400' : 'text-neon-cyan'
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type="submit"
              disabled={status === 'saving' || !isLoaded}
              className="w-full"
            >
              {status === 'saving' ? 'Saving...' : 'Finish Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}
