import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { logger } from './logger';

describe('Logger', () => {
  const originalStdoutWrite = process.stdout.write;
  const originalStderrWrite = process.stderr.write;
  let stdoutOutput: string[] = [];
  let stderrOutput: string[] = [];

  beforeEach(() => {
    stdoutOutput = [];
    stderrOutput = [];
    process.stdout.write = ((str: string) => {
      stdoutOutput.push(str);
      return true;
    }) as typeof process.stdout.write;
    process.stderr.write = ((str: string) => {
      stderrOutput.push(str);
      return true;
    }) as typeof process.stderr.write;
  });

  afterEach(() => {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  });

  describe('logger.info', () => {
    it('should write to stdout', () => {
      logger.info('Test message');
      expect(stdoutOutput.length).toBeGreaterThan(0);
      expect(stderrOutput.length).toBe(0);
    });

    it('should include level in output', () => {
      logger.info('Test message');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.level).toBe('info');
    });

    it('should include message in output', () => {
      logger.info('Hello World');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Hello World');
    });

    it('should include timestamp in output', () => {
      logger.info('Test');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.timestamp).toBeDefined();
      expect(new Date(parsed.timestamp).toString()).not.toBe('Invalid Date');
    });

    it('should include context when provided', () => {
      logger.info('User action', { userId: '123', action: 'login' });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.userId).toBe('123');
      expect(parsed.action).toBe('login');
    });

    it('should handle string context values', () => {
      logger.info('Test', { key: 'value' });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.key).toBe('value');
    });

    it('should handle number context values', () => {
      logger.info('Test', { count: 42 });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.count).toBe(42);
    });

    it('should handle boolean context values', () => {
      logger.info('Test', { enabled: true });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.enabled).toBe(true);
    });

    it('should handle null context values', () => {
      logger.info('Test', { empty: null });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.empty).toBeNull();
    });

    it('should handle array context values', () => {
      logger.info('Test', { items: [1, 2, 3] });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.items).toEqual([1, 2, 3]);
    });

    it('should handle nested object context values', () => {
      logger.info('Test', { user: { name: 'John', age: 30 } });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.user).toEqual({ name: 'John', age: 30 });
    });

    it('should output newline-terminated JSON', () => {
      logger.info('Test');
      const output = stdoutOutput[0] ?? '';
      expect(output.endsWith('\n')).toBe(true);
    });
  });

  describe('logger.warn', () => {
    it('should write to stdout', () => {
      logger.warn('Warning message');
      expect(stdoutOutput.length).toBeGreaterThan(0);
      expect(stderrOutput.length).toBe(0);
    });

    it('should include level as warn', () => {
      logger.warn('Warning');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.level).toBe('warn');
    });

    it('should include message in output', () => {
      logger.warn('Deprecated feature used');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Deprecated feature used');
    });

    it('should include context when provided', () => {
      logger.warn('Low memory', { available: 100 });
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.available).toBe(100);
    });
  });

  describe('logger.error', () => {
    it('should write to stderr', () => {
      logger.error('Error message');
      expect(stderrOutput.length).toBeGreaterThan(0);
      expect(stdoutOutput.length).toBe(0);
    });

    it('should include level as error', () => {
      logger.error('Error occurred');
      const output = stderrOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.level).toBe('error');
    });

    it('should include message in output', () => {
      logger.error('Database connection failed');
      const output = stderrOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Database connection failed');
    });

    it('should include context when provided', () => {
      logger.error('Request failed', { statusCode: 500, path: '/api/users' });
      const output = stderrOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.statusCode).toBe(500);
      expect(parsed.path).toBe('/api/users');
    });

    it('should output newline-terminated JSON', () => {
      logger.error('Error');
      const output = stderrOutput[0] ?? '';
      expect(output.endsWith('\n')).toBe(true);
    });
  });

  describe('logger without context', () => {
    it('should work for info without context', () => {
      logger.info('Simple message');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Simple message');
      expect(Object.keys(parsed)).toEqual(['level', 'message', 'timestamp']);
    });

    it('should work for warn without context', () => {
      logger.warn('Simple warning');
      const output = stdoutOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Simple warning');
    });

    it('should work for error without context', () => {
      logger.error('Simple error');
      const output = stderrOutput[0] ?? '';
      const parsed = JSON.parse(output.trim());
      expect(parsed.message).toBe('Simple error');
    });
  });
});
