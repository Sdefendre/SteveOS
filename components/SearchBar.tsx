'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

interface SearchBarProps<T> {
  items: T[]
  searchKeys: (keyof T)[]
  renderItem: (item: T, index: number) => React.ReactNode
  placeholder?: string
  emptyMessage?: string
  containerClassName?: string
}

export function SearchBar<T extends Record<string, any>>({
  items,
  searchKeys,
  renderItem,
  placeholder = 'Search...',
  emptyMessage = 'No results found',
  containerClassName = 'space-y-8 sm:space-y-10 md:space-y-12',
}: SearchBarProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase().trim()
    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query)
        }
        if (Array.isArray(value)) {
          return value.some((v) => String(v).toLowerCase().includes(query))
        }
        return String(value).toLowerCase().includes(query)
      })
    })
  }, [items, searchKeys, searchQuery])

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
          aria-label="Search"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
        </div>
      )}

      {filteredItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={containerClassName}
        >
          {filteredItems.map((item, index) => renderItem(item, index))}
        </motion.div>
      ) : searchQuery ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          {emptyMessage}
        </motion.div>
      ) : null}
    </div>
  )
}
