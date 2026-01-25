'use client'

import { useState, useEffect } from 'react'
import { Lock, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestCard } from '@/components/cards/test-card'
import { TestFlow } from '@/components/test/test-flow'
import { TestResultView } from '@/components/test/test-result-view'
import { SubscriptionModal } from '@/components/modals/subscription-modal'

interface ExplorePageProps {
  isPremium: boolean
}

interface Test {
  id: number
  title: string
  category: string
  categoryId: string
  locked: boolean
  questions: number
  completed: boolean
}

const allTests: Test[] = [
  // Cosmic Identity
  { id: 1, title: 'Birth Chart Reading', category: 'Cosmic Identity', categoryId: 'cosmic', locked: false, questions: 12, completed: false },
  { id: 2, title: 'Moon Sign Decoder', category: 'Cosmic Identity', categoryId: 'cosmic', locked: false, questions: 10, completed: false },
  { id: 3, title: 'Venus Influence', category: 'Cosmic Identity', categoryId: 'cosmic', locked: true, questions: 9, completed: false },
  { id: 4, title: 'Planetary Transits', category: 'Cosmic Identity', categoryId: 'cosmic', locked: true, questions: 15, completed: false },

  // Psychological Profile
  { id: 5, title: 'MBTI Test', category: 'Psychological Profile', categoryId: 'psychological', locked: false, questions: 16, completed: false },
  { id: 6, title: 'Big Five Personality', category: 'Psychological Profile', categoryId: 'psychological', locked: false, questions: 20, completed: false },
  { id: 7, title: 'Emotional Intelligence', category: 'Psychological Profile', categoryId: 'psychological', locked: true, questions: 18, completed: false },
  { id: 8, title: 'Attachment Style', category: 'Psychological Profile', categoryId: 'psychological', locked: true, questions: 14, completed: false },

  // Energy & Wellbeing
  { id: 9, title: 'Chakra Assessment', category: 'Energy & Wellbeing', categoryId: 'energy', locked: false, questions: 8, completed: false },
  { id: 10, title: 'Aura Energy Map', category: 'Energy & Wellbeing', categoryId: 'energy', locked: false, questions: 11, completed: false },
  { id: 11, title: 'Wellness Profile', category: 'Energy & Wellbeing', categoryId: 'energy', locked: true, questions: 13, completed: false },
  { id: 12, title: 'Life Force Vitality', category: 'Energy & Wellbeing', categoryId: 'energy', locked: true, questions: 16, completed: false },

  // Soul Path & Karma
  { id: 13, title: 'Numerology Profile', category: 'Soul Path & Karma', categoryId: 'soul', locked: false, questions: 10, completed: false },
  { id: 14, title: 'Life Path Calculator', category: 'Soul Path & Karma', categoryId: 'soul', locked: false, questions: 15, completed: false },
  { id: 15, title: 'Karmic Patterns', category: 'Soul Path & Karma', categoryId: 'soul', locked: true, questions: 17, completed: false },
  { id: 16, title: 'Soul Purpose Guide', category: 'Soul Path & Karma', categoryId: 'soul', locked: true, questions: 19, completed: false },
]

export function ExplorePage({ isPremium }: ExplorePageProps) {
  const [selectedTest, setSelectedTest] = useState<number | null>(null)
  const [activeTest, setActiveTest] = useState<{ id: number; title: string; category: string } | null>(null)
  const [viewingResult, setViewingResult] = useState<number | null>(null)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [completedTests, setCompletedTests] = useState<number[]>([])
  const [lockedTestId, setLockedTestId] = useState<number | null>(null)

  // Fetch completed tests from API
  useEffect(() => {
    const fetchCompletedTests = async () => {
      try {
        const res = await fetch('/api/tests/results')
        if (res.ok) {
          const { results } = await res.json()
          const testIds = results.map((r: any) => r.testId)
          setCompletedTests(testIds)
        }
      } catch (error) {
        console.error('Error fetching completed tests:', error)
      }
    }

    fetchCompletedTests()
  }, [])

  const categories = [
    { id: 'cosmic', label: 'Cosmic Identity', icon: '✨' },
    { id: 'psychological', label: 'Psychological Profile', icon: '🧠' },
    { id: 'energy', label: 'Energy & Wellbeing', icon: '⚡' },
    { id: 'soul', label: 'Soul Path & Karma', icon: '🌙' },
  ]

  const tests: Test[] = allTests.map(test => ({
    ...test,
    locked: test.locked && !isPremium,
    completed: completedTests.includes(test.id)
  }))

  const handleTestSelect = (test: Test) => {
    if (test.locked) {
      setLockedTestId(test.id)
      setShowSubscriptionModal(true)
      return
    }

    if (test.completed) {
      setViewingResult(test.id)
    } else {
      setActiveTest({ id: test.id, title: test.title, category: test.category })
    }
  }

  // Show test flow
  if (activeTest) {
    return (
      <TestFlow
        testId={activeTest.id}
        testTitle={activeTest.title}
        category={activeTest.category}
        onClose={() => setActiveTest(null)}
      />
    )
  }

  // Show test result
  if (viewingResult !== null) {
    const test = allTests.find((t) => t.id === viewingResult)!
    return (
      <TestResultView
        testId={test.id}
        testTitle={test.title}
        category={test.category}
        onBack={() => setViewingResult(null)}
      />
    )
  }

  return (
    <div className="p-4 pb-24 space-y-8">
      {/* Header */}
      <div className="text-center pt-4">
        <h2 className="font-heading text-2xl text-primary">Explore</h2>
        <p className="text-xs text-muted-foreground mt-1">Discover Your Inner Self</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3">
        <p className="text-xs text-gray-400">
          {isPremium ? 'All tests unlocked.' : 'Start with free tests to unlock premium features.'}
        </p>
      </div>

      {/* Tests by Category */}
      {categories.map((cat) => {
        const categoryTests = tests.filter((t) => t.categoryId === cat.id)
        return (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span>{cat.icon}</span>
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categoryTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  isSelected={selectedTest === test.id}
                  onSelect={() => {
                    setSelectedTest(test.id)
                    handleTestSelect(test)
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onUpgrade={() => setShowSubscriptionModal(false)}
        />
      )}
    </div>
  )
}
