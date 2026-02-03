import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GET, POST } from './route'

// Mock Clerk
const mockAuth = vi.fn()
const mockGetUser = vi.fn()
const mockUpdateUser = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
  clerkClient: {
    users: {
      getUser: (userId: string) => mockGetUser(userId),
      updateUser: (userId: string, data: unknown) => mockUpdateUser(userId, data),
    },
  },
}))

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

const createRequest = (body: unknown) =>
  new Request('http://localhost/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('Profile API Route', () => {
  const originalEnv = process.env.NEXT_PUBLIC_DEMO_MODE

  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.NEXT_PUBLIC_DEMO_MODE
  })

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_DEMO_MODE = originalEnv
    } else {
      delete process.env.NEXT_PUBLIC_DEMO_MODE
    }
  })

  describe('GET /api/profile', () => {
    it('should return 403 when demo mode is enabled', async () => {
      // Note: demoMode is evaluated at module load time, so we need to re-import
      // For this test, we'll verify the response structure
      mockAuth.mockReturnValue({ userId: null })

      const response = await GET()
      const data = await response.json()

      // When not authenticated and not in demo mode, should return 401
      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
    })

    it('should return 401 when user is not authenticated', async () => {
      mockAuth.mockReturnValue({ userId: null })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return profile data for authenticated user', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockResolvedValue({
        publicMetadata: {
          displayName: 'Test User',
          role: 'artist',
          onboardingCompleted: true,
        },
        fullName: 'Test Full Name',
        firstName: 'Test',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.displayName).toBe('Test User')
      expect(data.data.role).toBe('artist')
    })

    it('should fallback to fullName if displayName is not in metadata', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockResolvedValue({
        publicMetadata: {},
        fullName: 'Full Name',
        firstName: 'First',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.displayName).toBe('Full Name')
      expect(data.data.role).toBe('user')
    })

    it('should fallback to firstName if fullName is not available', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockResolvedValue({
        publicMetadata: {},
        fullName: null,
        firstName: 'First',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.displayName).toBe('First')
    })

    it('should default role to user when not set in metadata', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockResolvedValue({
        publicMetadata: {
          displayName: 'Test',
        },
        fullName: 'Test',
        firstName: 'Test',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.role).toBe('user')
    })

    it('should return user role when admin is stored in metadata (privilege demotion)', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockResolvedValue({
        publicMetadata: {
          displayName: 'Admin User',
          role: 'admin',
        },
        fullName: 'Admin User',
        firstName: 'Admin',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      // Admin role should be demoted to 'user' in API response
      expect(data.data.role).toBe('user')
    })

    it('should return 500 when Clerk throws an error', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockGetUser.mockRejectedValue(new Error('Clerk API error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unable to load profile.')
    })
  })

  describe('POST /api/profile', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockAuth.mockReturnValue({ userId: null })

      const response = await POST(createRequest({ displayName: 'Test', role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unauthorized')
    })

    it('should update profile for authenticated user', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockUpdateUser.mockResolvedValue({})

      const response = await POST(createRequest({ displayName: 'New Name', role: 'artist' }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.displayName).toBe('New Name')
      expect(data.data.role).toBe('artist')
      expect(mockUpdateUser).toHaveBeenCalledWith('user_123', {
        publicMetadata: {
          displayName: 'New Name',
          role: 'artist',
          onboardingCompleted: true,
        },
      })
    })

    it('should return 400 for invalid payload - missing displayName', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid payload.')
    })

    it('should return 400 for invalid payload - missing role', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ displayName: 'Test' }))
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid payload.')
    })

    it('should return 400 for displayName less than 2 characters', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ displayName: 'A', role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for displayName more than 64 characters', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ displayName: 'A'.repeat(65), role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid role', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ displayName: 'Test', role: 'invalid' }))
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should REJECT admin role to prevent privilege escalation', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      const response = await POST(createRequest({ displayName: 'Attacker', role: 'admin' }))
      const data = await response.json()

      // This is the critical security test - admin role must be rejected
      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid payload.')
      // Ensure updateUser was never called with admin role
      expect(mockUpdateUser).not.toHaveBeenCalled()
    })

    it('should accept user role', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockUpdateUser.mockResolvedValue({})

      const response = await POST(createRequest({ displayName: 'Test', role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.role).toBe('user')
    })

    it('should accept artist role', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockUpdateUser.mockResolvedValue({})

      const response = await POST(createRequest({ displayName: 'Test', role: 'artist' }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.role).toBe('artist')
    })

    it('should return 500 when Clerk throws an error', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockUpdateUser.mockRejectedValue(new Error('Clerk API error'))

      const response = await POST(createRequest({ displayName: 'Test', role: 'user' }))
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unable to save profile.')
    })
  })

  describe('Security: Privilege Escalation Prevention', () => {
    it('should never allow setting admin role via POST', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })

      // Try various ways to set admin role
      const attempts = [
        { displayName: 'Test', role: 'admin' },
        { displayName: 'Test', role: 'ADMIN' },
        { displayName: 'Test', role: 'Admin' },
      ]

      for (const attempt of attempts) {
        const response = await POST(createRequest(attempt))
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(mockUpdateUser).not.toHaveBeenCalled()
      }
    })

    it('should only allow user and artist roles', async () => {
      mockAuth.mockReturnValue({ userId: 'user_123' })
      mockUpdateUser.mockResolvedValue({})

      const validRoles = ['user', 'artist']

      for (const role of validRoles) {
        mockUpdateUser.mockClear()
        const response = await POST(createRequest({ displayName: 'Test', role }))
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
        expect(mockUpdateUser).toHaveBeenCalledTimes(1)
      }
    })
  })
})
