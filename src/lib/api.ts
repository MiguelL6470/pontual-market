import { headers } from 'next/headers'

/**
 * Obtém a URL base absoluta para uso em Server Components
 */
export async function getBaseUrl(): Promise<string> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host') || 'localhost:3000'
  return `${protocol}://${host}`
}

