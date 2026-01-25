# INK SYNTHESIS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

AI-Driven Tattoo Generation & Haptic Imprinting Interface - a futuristic React application for generating tattoo designs using AI and controlling hardware for imprinting.

## Features

- **Design Generator**: Describe your vision and generate AI-powered tattoo designs
- **Style Controls**: Adjust line thickness, contrast, and composition
- **Machine Interface**: Connect to haptic imprinting hardware
- **Real-time Preview**: Preview designs with grid-based haptic matrix visualization
- **Dark Theme**: Cyberpunk-inspired neon aesthetic

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to view the application.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 build system
- Tailwind CSS 4
- Framer Motion animations
- Radix UI primitives
- Lucide icons

## Project Structure

```
src/
├── components/
│   ├── features/
│   │   ├── generator/    # AI tattoo generation UI
│   │   └── machine/      # Hardware interface dashboard
│   ├── layout/           # Page layout components
│   └── ui/               # Reusable UI primitives
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Deployment

### Render.com

This project is configured for deployment on Render.com using `render.yaml`.

**Required Environment Variables (set in Render Dashboard):**

| Variable | Service | Description |
|----------|---------|-------------|
| `VITE_API_URL` | Frontend | URL of the backend API (e.g., `https://ink-synthesis-api.onrender.com`) |
| `REPLICATE_API_TOKEN` | Backend | API token from [Replicate](https://replicate.com) for AI image generation |
| `STRIPE_SECRET_KEY` | Backend | Stripe secret key for payments |
| `STRIPE_WEBHOOK_SECRET` | Backend | Stripe webhook signing secret |
| `CORS_ORIGIN` | Backend | Frontend URL for CORS (e.g., `https://ink-synthesis-site.onrender.com`) |

**Auto-configured (via render.yaml):**
- `PORT`: 10000
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Auto-generated

### Steps

1. Fork/clone this repository
2. Create a new Blueprint on Render
3. Connect your repository
4. Set the required environment variables in the dashboard
5. Deploy

## License

MIT
