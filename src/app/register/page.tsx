'use client'

import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
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

