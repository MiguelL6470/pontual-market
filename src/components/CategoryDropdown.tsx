'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

type Category = {
  id: string
  name: string
  slug: string
}

type Props = {
  selectedCategory?: string
  onCategoryChange?: (slug: string) => void
}

export function CategoryDropdown({ selectedCategory, onCategoryChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedName, setSelectedName] = useState('Todos os departamentos')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || [])
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c.slug === selectedCategory)
      setSelectedName(category ? category.name : 'Todos os departamentos')
    } else {
      setSelectedName('Todos os departamentos')
    }
  }, [selectedCategory, categories])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (slug: string, name: string) => {
    setSelectedName(name)
    setIsOpen(false)
    if (onCategoryChange) {
      onCategoryChange(slug)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-11 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm border-r border-gray-300 transition-colors min-w-[180px]"
      >
        <span className="truncate">{selectedName}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto min-w-[240px]">
          <button
            type="button"
            onClick={() => handleSelect('', 'Todos os departamentos')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors first:rounded-t-md"
          >
            Todos os departamentos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category.slug, category.name)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

