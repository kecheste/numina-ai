import { Progress } from '@/components/ui/progress'

interface PillarCardProps {
  name: string
  percentage: number
  color: string
}

export function PillarCard({ name, percentage, color }: PillarCardProps) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs font-bold text-primary">{percentage}%</p>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
