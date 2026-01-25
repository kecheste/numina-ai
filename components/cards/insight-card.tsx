import { Check } from 'lucide-react'

interface InsightCardProps {
  id: number
  title: string
  category: string
  status: 'completed' | 'locked'
}

export function InsightCard({ title, category, status }: InsightCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-850 transition-colors">
      <div>
        <p className="text-sm font-medium text-secondary">{title}</p>
        <p className="text-xs text-muted-foreground">{category}</p>
      </div>
      {status === 'completed' && (
        <div className="flex-shrink-0 ml-2">
          <Check size={18} className="text-accent" />
        </div>
      )}
    </div>
  )
}
