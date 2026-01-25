'use client'

import { useState } from 'react'
import { X, Check, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubscriptionModalProps {
  onClose: () => void
  onUpgrade?: () => void
}

export function SubscriptionModal({ onClose, onUpgrade }: SubscriptionModalProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType: billingPeriod }),
      })

      if (res.ok) {
        const { url } = await res.json()
        if (url) {
          window.location.href = url
        }
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const plans = [
    {
      name: 'Monthly',
      price: '$19.99',
      period: '/month',
      description: 'Flexible monthly subscription',
      billing: 'monthly' as const,
    },
    {
      name: 'Annual',
      price: '$119',
      period: '/year',
      description: 'Save 50% with annual plan',
      billing: 'annual' as const,
      badge: 'Best Value',
    },
  ]

  const features = [
    'Full test library (16+ assessments)',
    'Synthesis page with deep analysis',
    'Unlimited insight cards',
    'Poetic + practical guidance',
    'Personalized recommendations',
    'Weekly energy reports',
    'Priority support',
  ]

  const selectedPlan = plans.find((p) => p.billing === billingPeriod)!

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-950 border border-gray-800 rounded-xl w-full max-w-[420px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="text-primary" size={24} />
            <h2 className="font-heading text-xl text-primary">Unlock Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Billing toggle */}
          <div className="bg-gray-900 rounded-lg p-2 flex gap-2">
            {plans.map((plan) => (
              <button
                key={plan.billing}
                onClick={() => setBillingPeriod(plan.billing)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  billingPeriod === plan.billing
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-4 text-center space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              {selectedPlan.description}
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-heading text-3xl text-primary">{selectedPlan.price}</span>
              <span className="text-sm text-muted-foreground">{selectedPlan.period}</span>
            </div>
            {selectedPlan.badge && (
              <p className="text-xs font-semibold text-accent pt-2">{selectedPlan.badge}</p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Premium Features</p>
            <div className="space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Upgrade to Premium'}
          </Button>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500">
            Cancel anytime. No questions asked.
          </p>
        </div>
      </div>
    </div>
  )
}
