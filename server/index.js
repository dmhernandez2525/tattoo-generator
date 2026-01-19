// Ink Synthesis API - Minimal health check server
import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    name: 'Ink Synthesis API',
    version: '0.1.0',
  });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
