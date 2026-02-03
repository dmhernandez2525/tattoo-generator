// Ink Synthesis API - Express server
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './logger.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: corsOrigin.split(',').map(o => o.trim()),
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (required by Render)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API version info
app.get('/api', (_req, res) => {
  res.json({
    name: 'Ink Synthesis API',
    version: '0.1.0',
    description: 'Backend API for AI-Driven Tattoo Generation',
  });
});

// Placeholder routes (to be implemented)
app.get('/api/designs', (_req, res) => {
  res.json({
    message: 'Designs endpoint - coming soon',
    designs: [],
  });
});

app.post('/api/designs/generate', (_req, res) => {
  res.status(501).json({
    error: 'Not implemented',
    message: 'AI generation endpoint - coming soon',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Unknown error';
  logger.error('api.error', { detail: message });
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : message,
  });
});

// Start server
app.listen(PORT, () => {
  logger.info('api.start', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
  });
});
