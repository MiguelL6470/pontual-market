'use client'

import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        branding: {
          logo: '/logo2.png',
          logoPlaceholder: '/logo2.png',
        },
        variables: {
          colorPrimary: '#2563eb',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
        elements: {
          rootBox: 'mx-auto',
          card: 'shadow-lg',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-sm text-gray-600',
          socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

