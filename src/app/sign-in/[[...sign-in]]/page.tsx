'use client'

import { SignIn } from '@clerk/nextjs'
import { Layout } from '@/components/layout/Layout'
import { DemoRoleSelector } from '@/components/demo/DemoRoleSelector'

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export default function SignInPage() {
  if (demoMode) {
    return <DemoRoleSelector />
  }

  return (
    <Layout className="flex items-center justify-center min-h-[80vh] py-12">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/onboarding"
      />
    </Layout>
  )
}
