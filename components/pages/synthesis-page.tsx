'use client'

import { Lock, Zap, AlertCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubscriptionModal } from '@/components/modals/subscription-modal'
import { useState } from 'react'

interface SynthesisPageProps {
  isPremium: boolean
}

export function SynthesisPage({ isPremium }: SynthesisPageProps) {
  const [showSubscription, setShowSubscription] = useState(false)

  if (!isPremium) {
    return (
      <div className="p-4 pb-24 space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <h2 className="font-heading text-2xl text-primary">Synthesis</h2>
          <p className="text-xs text-muted-foreground mt-1">Unified Insights</p>
        </div>

        {/* Locked state */}
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-primary/30 rounded-full p-6">
            <Lock className="text-primary" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-secondary">Premium Feature</h3>
          <p className="text-sm text-muted-foreground text-center">
            Unlock your complete spiritual profile with comprehensive analysis across all energy pillars.
          </p>
          <Button
            onClick={() => setShowSubscription(true)}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            View Plans
          </Button>
        </div>

        {showSubscription && (
          <SubscriptionModal onClose={() => setShowSubscription(false)} />
        )}
      </div>
    )
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h2 className="font-heading text-2xl text-primary">Synthesis</h2>
        <p className="text-xs text-muted-foreground mt-1">Your Complete Profile</p>
      </div>

      {/* Opening statement */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 space-y-3">
        <p className="text-sm text-secondary leading-relaxed italic">
          Your spiritual essence flows through five interconnected pillars. Your synthesis reveals a harmonious balance between introspection and action, grounded in emotional intelligence and authentic self-awareness.
        </p>
      </div>

      {/* Strengths */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Zap size={14} className="text-accent" /> Core Strengths
        </h3>
        <div className="space-y-2">
          {[
            'Deep emotional intelligence and empathy',
            'Strong intuitive decision-making abilities',
            'Authentic self-expression and presence',
            'Natural capacity for growth and transformation',
          ].map((strength, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-sm text-secondary">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          <AlertCircle size={14} className="text-orange-500" /> Areas of Growth
        </h3>
        <div className="space-y-2">
          {[
            'Perfectionism can limit spontaneous joy',
            'Tendency to overthink emotional matters',
            'Setting healthy boundaries with others',
            'Embracing uncertainty as part of growth',
          ].map((challenge, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-sm text-secondary">{challenge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar alignment */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          <TrendingUp size={14} className="text-primary" /> Pillar Alignment
        </h3>
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-primary mb-2">Spirit (88%) - Your Highest Pillar</p>
            <p className="text-xs text-secondary leading-relaxed">
              You possess a rare spiritual awareness and connection to higher purpose.
            </p>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <p className="text-xs font-semibold text-accent mb-2">Heart (82%) - Your Emotional Center</p>
            <p className="text-xs text-secondary leading-relaxed">
              Deep capacity for compassion and authentic relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Spiritual Practices</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-xs font-semibold text-primary mb-2">Daily Ritual</p>
            <p className="text-xs text-secondary">
              Morning meditation focusing on intention-setting aligns with your spiritual nature.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-xs font-semibold text-primary mb-2">Avoid This Period</p>
            <p className="text-xs text-secondary">
              Major decisions during Mercury retrograde may amplify overthinking tendencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
