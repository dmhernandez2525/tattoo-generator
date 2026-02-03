# Contributing

Thanks for contributing to INK SYNTHESIS.

## Workflow

1. **Create a feature branch from the previous feature branch** (chained strategy):
   - Branches must be prefixed with `codex/`.
   - Example: `codex/feature-f1-1-project-setup`.
2. **Never push directly to `main`.**
3. **Use conventional commits** (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
4. **Open a PR** and complete review before merging.

## Quality Standards

- **TypeScript strict mode is required.**
- **No `any`, `@ts-ignore`, or ESLint disables.**
- **No `console.*` statements.** Use the project logger instead.
- **No TODO/FIXME/HACK comments** without a tracked issue reference.
- **Error handling is required** for async operations.
- **80% test coverage minimum** across line/branch/function metrics.

## Testing

Run the full suite before opening a PR:

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

## Documentation

- Update `CHANGELOG.md` for user-facing changes.
- Update relevant SDDs for architecture or data model changes.
- Keep README instructions current.
