'use client'

import { Progress } from '@/components/ui/progress'
import { Lock } from 'lucide-react'
import { PillarCard } from '@/components/cards/pillar-card'
import { InsightCard } from '@/components/cards/insight-card'

interface MySoulPageProps {
  isPremium: boolean
}

export function MySoulPage({ isPremium }: MySoulPageProps) {
  const pillars = [
    { name: 'Mind', percentage: 78, color: 'from-blue-500 to-cyan-400' },
    { name: 'Body', percentage: 65, color: 'from-green-500 to-emerald-400' },
    { name: 'Heart', percentage: 82, color: 'from-rose-500 to-pink-400' },
    { name: 'Soul', percentage: 71, color: 'from-purple-500 to-violet-400' },
    { name: 'Spirit', percentage: 88, color: 'from-yellow-500 to-orange-400' },
  ]

  const completedCards = [
    { id: 1, title: 'MBTI Results', category: 'Psychology', status: 'completed' },
    { id: 2, title: 'Birth Chart', category: 'Astrology', status: 'completed' },
    { id: 3, title: 'Numerology Profile', category: 'Numerology', status: 'completed' },
  ]

  const lockedCards = [
    { id: 4, title: 'Chakra Balance', category: 'Wellness', status: 'locked' },
    { id: 5, title: 'Big Five Analysis', category: 'Psychology', status: 'locked' },
    { id: 6, title: 'Relationship Forecast', category: 'Astrology', status: 'locked' },
  ]

  const dailyMessage =
    'Today, your spiritual energy aligns with growth and introspection. Trust your intuition in matters of the heart.'

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h2 className="font-heading text-2xl text-primary">Your Soul</h2>
        <p className="text-xs text-muted-foreground mt-1">Personal Energy Dashboard</p>
      </div>

      {/* Daily Message */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase">Daily Message</p>
        <p className="text-sm text-secondary leading-relaxed italic">{dailyMessage}</p>
      </div>

      {/* Five Pillars */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Energy Pillars</h3>
        <div className="grid grid-cols-1 gap-3">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.name} {...pillar} />
          ))}
        </div>
      </div>

      {/* Completed Tests */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Completed</h3>
        <div className="space-y-2">
          {completedCards.map((card) => (
            <InsightCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Locked Tests */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Locked</h3>
        <div className="space-y-2">
          {lockedCards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex items-center justify-between backdrop-blur-sm opacity-60"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-xs text-gray-600">{card.category}</p>
              </div>
              <Lock size={16} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 text-center space-y-2">
          <p className="text-xs font-semibold text-primary">Unlock Full Access</p>
          <p className="text-xs text-secondary">Explore all tests and comprehensive insights</p>
        </div>
      )}
    </div>
  )
}
