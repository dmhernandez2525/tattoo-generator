import { describe, it, expect } from 'vitest';
import {
  profileRoleSchema,
  profileSchema,
  profileMetadataSchema,
  profileResponseSchema,
  profileRoleOptions,
  userFacingRoleOptions,
  type ProfileRole,
} from './profile';

describe('Profile utilities', () => {
  describe('profileRoleSchema', () => {
    it('should accept valid roles', () => {
      expect(profileRoleSchema.safeParse('user').success).toBe(true);
      expect(profileRoleSchema.safeParse('artist').success).toBe(true);
      expect(profileRoleSchema.safeParse('admin').success).toBe(true);
    });

    it('should reject invalid roles', () => {
      expect(profileRoleSchema.safeParse('invalid').success).toBe(false);
      expect(profileRoleSchema.safeParse('').success).toBe(false);
      expect(profileRoleSchema.safeParse(123).success).toBe(false);
      expect(profileRoleSchema.safeParse(null).success).toBe(false);
      expect(profileRoleSchema.safeParse(undefined).success).toBe(false);
    });

    it('should return the role value when valid', () => {
      const result = profileRoleSchema.parse('user');
      expect(result).toBe('user');
    });
  });

  describe('profileSchema', () => {
    it('should accept valid profile data', () => {
      const validProfile = {
        displayName: 'John Doe',
        role: 'user' as ProfileRole,
      };
      expect(profileSchema.safeParse(validProfile).success).toBe(true);
    });

    it('should accept displayName between 2 and 64 characters', () => {
      expect(profileSchema.safeParse({ displayName: 'AB', role: 'user' }).success).toBe(true);
      expect(profileSchema.safeParse({ displayName: 'A'.repeat(64), role: 'user' }).success).toBe(true);
    });

    it('should reject displayName less than 2 characters', () => {
      expect(profileSchema.safeParse({ displayName: 'A', role: 'user' }).success).toBe(false);
      expect(profileSchema.safeParse({ displayName: '', role: 'user' }).success).toBe(false);
    });

    it('should reject displayName more than 64 characters', () => {
      expect(profileSchema.safeParse({ displayName: 'A'.repeat(65), role: 'user' }).success).toBe(false);
    });

    it('should reject missing fields', () => {
      expect(profileSchema.safeParse({ displayName: 'John' }).success).toBe(false);
      expect(profileSchema.safeParse({ role: 'user' }).success).toBe(false);
      expect(profileSchema.safeParse({}).success).toBe(false);
    });

    it('should accept all valid roles', () => {
      const roles: ProfileRole[] = ['user', 'artist', 'admin'];
      for (const role of roles) {
        const result = profileSchema.safeParse({ displayName: 'Test User', role });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('profileMetadataSchema', () => {
    it('should accept empty object', () => {
      expect(profileMetadataSchema.safeParse({}).success).toBe(true);
    });

    it('should accept partial data', () => {
      expect(profileMetadataSchema.safeParse({ displayName: 'John' }).success).toBe(true);
      expect(profileMetadataSchema.safeParse({ role: 'user' }).success).toBe(true);
      expect(profileMetadataSchema.safeParse({ onboardingCompleted: true }).success).toBe(true);
    });

    it('should accept all fields', () => {
      const metadata = {
        displayName: 'John Doe',
        role: 'artist' as ProfileRole,
        onboardingCompleted: true,
      };
      expect(profileMetadataSchema.safeParse(metadata).success).toBe(true);
    });

    it('should accept onboardingCompleted as boolean', () => {
      expect(profileMetadataSchema.safeParse({ onboardingCompleted: true }).success).toBe(true);
      expect(profileMetadataSchema.safeParse({ onboardingCompleted: false }).success).toBe(true);
    });

    it('should reject invalid onboardingCompleted type', () => {
      expect(profileMetadataSchema.safeParse({ onboardingCompleted: 'true' }).success).toBe(false);
      expect(profileMetadataSchema.safeParse({ onboardingCompleted: 1 }).success).toBe(false);
    });

    it('should reject invalid role in metadata', () => {
      expect(profileMetadataSchema.safeParse({ role: 'invalid' }).success).toBe(false);
    });
  });

  describe('profileResponseSchema', () => {
    it('should accept success response with data', () => {
      const response = {
        success: true,
        data: {
          displayName: 'John Doe',
          role: 'user' as ProfileRole,
        },
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(true);
    });

    it('should accept success response without data', () => {
      const response = {
        success: true,
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(true);
    });

    it('should accept error response', () => {
      const response = {
        success: false,
        error: 'Something went wrong',
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(true);
    });

    it('should accept response with both data and error', () => {
      const response = {
        success: false,
        data: {
          displayName: 'John',
          role: 'user' as ProfileRole,
        },
        error: 'Partial failure',
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(true);
    });

    it('should reject missing success field', () => {
      const response = {
        data: {
          displayName: 'John',
          role: 'user',
        },
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(false);
    });

    it('should reject invalid success type', () => {
      const response = {
        success: 'true',
        data: {
          displayName: 'John',
          role: 'user',
        },
      };
      expect(profileResponseSchema.safeParse(response).success).toBe(false);
    });
  });

  describe('profileRoleOptions', () => {
    it('should have 3 role options', () => {
      expect(profileRoleOptions).toHaveLength(3);
    });

    it('should have user option with label Collector', () => {
      const userOption = profileRoleOptions.find((o) => o.value === 'user');
      expect(userOption).toBeDefined();
      expect(userOption?.label).toBe('Collector');
    });

    it('should have artist option with label Artist', () => {
      const artistOption = profileRoleOptions.find((o) => o.value === 'artist');
      expect(artistOption).toBeDefined();
      expect(artistOption?.label).toBe('Artist');
    });

    it('should have admin option with label Admin', () => {
      const adminOption = profileRoleOptions.find((o) => o.value === 'admin');
      expect(adminOption).toBeDefined();
      expect(adminOption?.label).toBe('Admin');
    });

    it('should have unique values', () => {
      const values = profileRoleOptions.map((o) => o.value);
      expect(new Set(values).size).toBe(values.length);
    });
  });

  describe('userFacingRoleOptions', () => {
    it('should have 2 role options (excluding admin)', () => {
      expect(userFacingRoleOptions).toHaveLength(2);
    });

    it('should include user option', () => {
      const userOption = userFacingRoleOptions.find((o) => o.value === 'user');
      expect(userOption).toBeDefined();
    });

    it('should include artist option', () => {
      const artistOption = userFacingRoleOptions.find((o) => o.value === 'artist');
      expect(artistOption).toBeDefined();
    });

    it('should not include admin option', () => {
      const adminOption = userFacingRoleOptions.find((o) => o.value === 'admin');
      expect(adminOption).toBeUndefined();
    });

    it('should be a subset of profileRoleOptions', () => {
      const allValues = profileRoleOptions.map((o) => o.value);
      userFacingRoleOptions.forEach((option) => {
        expect(allValues).toContain(option.value);
      });
    });
  });
});
