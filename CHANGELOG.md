# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
### Added
- Next.js 15 App Router scaffold with root layout and page.
- Tailwind CSS v4 PostCSS configuration and shadcn/ui config.
- Prisma schema baseline and environment template.
- Prisma schema now includes core models (User, Design, StylePreset, Collection, Commission).
- Demo mode environment flag in Render config.
- Archived Vite-era entry points under `legacy/` for reference.
- Clerk authentication scaffolding with demo-aware sign-in/up and onboarding.
- Demo experience routes under `/demo` (home, generator, machine, gallery, design detail).
- Theme system with dark/light toggle and persisted preference.
- Profile API route for saving basic user metadata (Clerk public metadata).

### Changed
- Migration from Vite app entry to Next.js App Router.
- Render deployment updated for Next.js runtime.
- Docker dev workflow updated for Next.js.
- Coverage thresholds aligned to 80% minimums.

### Deprecated
### Removed
### Fixed
### Security

## [0.1.0] - 2026-02-03
### Added
- Initial project scaffolding and UI prototype.
