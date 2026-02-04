# INK SYNTHESIS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

AI-Driven Tattoo Generation & Haptic Imprinting Interface - a futuristic Next.js application for generating tattoo designs using AI and controlling hardware for imprinting.

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

Open `http://localhost:3000` to view the application.

## Tech Stack

- Next.js 15 + React 19 + TypeScript 5.9
- Tailwind CSS v4
- Framer Motion animations
- Radix UI primitives
- Lucide icons
- Prisma + PostgreSQL
- Clerk authentication

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/
│   ├── features/        # AI tattoo generation UI + machine dashboard
│   ├── layout/          # Page layout components
│   └── ui/              # Reusable UI primitives
├── hooks/               # Custom React hooks
└── lib/                 # Utilities
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run type-check
```

## Demo Mode

See `docs/DEMO_MODE.md` for how to enable demo mode and available demo routes.

## Deployment

### Render.com

This project is configured for deployment on Render.com using `render.yaml`.

**Required Environment Variables (set in Render Dashboard):**

| Variable | Service | Description |
|----------|---------|-------------|
| `DATABASE_URL` | Web | PostgreSQL connection string |
| `NEXT_PUBLIC_DEMO_MODE` | Web | Enable demo mode in portfolio deployments |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Web | Clerk publishable key |
| `CLERK_SECRET_KEY` | Web | Clerk secret key |

## License

MIT
