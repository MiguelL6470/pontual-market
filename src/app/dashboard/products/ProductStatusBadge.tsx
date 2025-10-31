type ProductStatusBadgeProps = {
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const config = {
    DRAFT: { text: 'Rascunho', color: 'bg-yellow-100 text-yellow-700' },
    ACTIVE: { text: 'Ativo', color: 'bg-green-100 text-green-700' },
    ARCHIVED: { text: 'Arquivado', color: 'bg-gray-100 text-gray-700' },
  }[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  )
}

