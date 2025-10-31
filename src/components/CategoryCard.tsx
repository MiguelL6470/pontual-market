import Link from 'next/link'

type Props = {
  category: {
    id: string
    name: string
    slug: string
  }
}

export function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">🏷️</div>
      <h3 className="font-semibold text-gray-900">{category.name}</h3>
    </Link>
  )
}

