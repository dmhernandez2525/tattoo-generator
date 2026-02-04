import { z } from 'zod'

export const profileRoleSchema = z.union([
  z.literal('user'),
  z.literal('artist'),
  z.literal('admin'),
])

export type ProfileRole = z.infer<typeof profileRoleSchema>

export const profileSchema = z.object({
  displayName: z.string().min(2).max(64),
  role: profileRoleSchema,
})

export const profileMetadataSchema = z.object({
  displayName: z.string().optional(),
  role: profileRoleSchema.optional(),
  onboardingCompleted: z.boolean().optional(),
})

export const profileResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      displayName: z.string(),
      role: profileRoleSchema,
    })
    .optional(),
  error: z.string().optional(),
})

type ProfileRoleOption = {
  value: ProfileRole
  label: string
}

export const profileRoleOptions: ProfileRoleOption[] = [
  { value: 'user', label: 'Collector' },
  { value: 'artist', label: 'Artist' },
  { value: 'admin', label: 'Admin' },
]

export const userFacingRoleOptions = profileRoleOptions.filter(
  (option) => option.value !== 'admin'
)
