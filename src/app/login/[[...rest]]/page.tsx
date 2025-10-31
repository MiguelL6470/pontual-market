'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl={from ? `/register?from=${from}` : '/register'}
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

