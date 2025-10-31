'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
        afterSignUpUrl={from ? `/${from}` : '/account'}
        afterSignInUrl={from ? `/${from}` : '/account'}
        appearance={{
          elements: {
            headerTitle: 'text-3xl font-bold text-gray-900',
            headerSubtitle: 'text-base text-gray-600',
            socialButtonsBlockButtonText: 'text-gray-700',
          },
        }}
      />
    </div>
  )
}

