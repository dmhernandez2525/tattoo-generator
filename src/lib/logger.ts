type LogLevel = 'info' | 'warn' | 'error'

type LogValue = string | number | boolean | null | LogValue[] | { [key: string]: LogValue }

type LogContext = Record<string, LogValue>

const writeEntry = (level: LogLevel, message: string, context?: LogContext) => {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context ?? {}),
  }

  const output = `${JSON.stringify(entry)}\n`

  if (level === 'error') {
    process.stderr.write(output)
    return
  }

  process.stdout.write(output)
}

export const logger = {
  info: (message: string, context?: LogContext) => writeEntry('info', message, context),
  warn: (message: string, context?: LogContext) => writeEntry('warn', message, context),
  error: (message: string, context?: LogContext) => writeEntry('error', message, context),
}
