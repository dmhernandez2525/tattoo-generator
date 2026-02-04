# Demo Mode

INK SYNTHESIS includes a demo mode for portfolio showcases that avoids real authentication and backend dependencies.

## Enable Demo Mode

Set the environment variable:

```
NEXT_PUBLIC_DEMO_MODE=true
```

When enabled:
- Auth pages (`/sign-in`, `/sign-up`) render a demo role selector.
- Clerk middleware is bypassed for all routes.
- Demo experience lives under `/demo`.

## Demo Routes

- `/demo` - Demo landing page
- `/demo/generator` - Demo generator flow (placeholder images)
- `/demo/machine` - Demo machine dashboard
- `/demo/gallery` - Demo gallery
- `/demo/design/[id]` - Demo design detail

## Notes

- Demo mode is intended for portfolio deployments only.
- For production, disable demo mode and configure Clerk keys.
