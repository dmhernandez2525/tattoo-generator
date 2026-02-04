'use client'

import { SignUp } from '@clerk/nextjs'
import { Layout } from '@/components/layout/Layout'
import { DemoRoleSelector } from '@/components/demo/DemoRoleSelector'

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export default function SignUpPage() {
  if (demoMode) {
    return <DemoRoleSelector />
  }

  return (
    <Layout className="flex items-center justify-center min-h-[80vh] py-12">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding"
      />
    </Layout>
  )
}
