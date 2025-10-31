import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pontualmarket.com.br'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/checkout/', '/account/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

