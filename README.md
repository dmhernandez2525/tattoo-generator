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

## License

MIT
