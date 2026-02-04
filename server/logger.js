const formatEntry = (level, message, meta = {}) => {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  return `${JSON.stringify(entry)}\n`;
};

const writeInfo = (message, meta) => {
  process.stdout.write(formatEntry('info', message, meta));
};

const writeWarn = (message, meta) => {
  process.stdout.write(formatEntry('warn', message, meta));
};

const writeError = (message, meta) => {
  process.stderr.write(formatEntry('error', message, meta));
};

export const logger = {
  info: writeInfo,
  warn: writeWarn,
  error: writeError,
};
