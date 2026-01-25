'use client'

import { Lock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestCardProps {
  test: {
    id: number
    title: string
    category: string
    locked: boolean
    questions: number
    completed?: boolean
  }
  isSelected: boolean
  onSelect: () => void
}

export function TestCard({ test, isSelected, onSelect }: TestCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={test.locked}
      className={cn(
        'relative rounded-lg p-3 text-left transition-all duration-300 border',
        isSelected
          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
          : test.locked
            ? 'bg-gray-900/40 border-gray-800 opacity-60 cursor-not-allowed'
            : test.completed
              ? 'bg-green-900/20 border-green-800/50 hover:border-green-700/50'
              : 'bg-gray-900 border-gray-800 hover:border-primary/40 hover:bg-gray-850'
      )}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold text-secondary leading-tight">{test.title}</h3>
          {test.locked && <Lock size={14} className="text-gray-600 flex-shrink-0 ml-1 mt-0.5" />}
          {test.completed && <Check size={14} className="text-green-400 flex-shrink-0 ml-1 mt-0.5" />}
        </div>
        <p className="text-xs text-muted-foreground">{test.category}</p>
      </div>
    </button>
  )
}
