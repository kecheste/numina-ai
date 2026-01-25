'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Share2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TestResultViewProps {
  testId: number
  testTitle: string
  category: string
  onBack: () => void
}

interface TestResult {
  personalityType: string
  insights: string[]
  recommendations: string[]
  score: number
}

export function TestResultView({ testId, testTitle, category, onBack }: TestResultViewProps) {
  const [testResult, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch test result from API
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch('/api/tests/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testId }),
        })

        if (res.ok) {
          const data = await res.json()
          setResult({
            personalityType: data.personalityType,
            insights: data.insights,
            recommendations: data.recommendations,
            score: data.score,
          })
        }
      } catch (error) {
        console.error('Error fetching result:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [testId])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-primary text-3xl mb-4">✨</div>
          <p className="text-foreground">Loading your results...</p>
        </div>
      </div>
    )
  }

  // Fallback mock test results
  const mockResults: Record<number, { personality: string; traits: string[]; insights: string[]; suggestions: string[] }> = {
    1: {
      personality: 'The Cosmic Dreamer',
      traits: ['Imaginative', 'Intuitive', 'Empathetic', 'Free-spirited'],
      insights: [
        'You are deeply connected to the spiritual realm with strong intuitive abilities.',
        'Your celestial alignment suggests a natural inclination toward creativity and emotional intelligence.',
        'Venus in your chart emphasizes harmony and aesthetic appreciation.',
      ],
      suggestions: [
        'Practice meditation to deepen your intuitive connection',
        'Explore creative outlets to channel your imaginative energy',
        'Trust your instincts when making important decisions',
        'Seek balance between material and spiritual pursuits',
      ],
    },
    2: {
      personality: 'The Analytical Mind',
      traits: ['Logical', 'Detail-oriented', 'Systematic', 'Pragmatic'],
      insights: [
        'Your cognitive pattern shows exceptional analytical abilities.',
        'You excel at problem-solving and strategic thinking.',
        'Your mind naturally seeks patterns and connections.',
      ],
      suggestions: [
        'Channel your analytical skills into leadership roles',
        'Practice mindfulness to balance logic with intuition',
        'Share your insights with others to amplify impact',
        'Allow yourself time for creative exploration',
      ],
    },
    3: {
      personality: 'The Harmonious Soul',
      traits: ['Balanced', 'Diplomatic', 'Patient', 'Compassionate'],
      insights: [
        'You naturally seek balance in all areas of life.',
        'Your numerological profile indicates healing and nurturing energy.',
        'People are drawn to your calm and grounded presence.',
      ],
      suggestions: [
        'Share your peaceful energy with others',
        'Explore mentoring or counseling roles',
        'Set boundaries to protect your energy',
        'Engage in activities that nourish your soul',
      ],
    },
  }

  // Use API result or fallback to mock
  const displayResult = testResult || (mockResults[testId] || mockResults[1])
  const finalResult = {
    personality: displayResult.personalityType || displayResult.personality,
    insights: displayResult.insights,
    suggestions: displayResult.recommendations || displayResult.suggestions,
    score: Math.round((displayResult.score || 7.5) * 10),
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="font-heading text-xl text-primary">{testTitle}</h2>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
      </div>

      {/* Main Personality Result */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 rounded-2xl p-6 space-y-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">Your Profile</p>
        <h3 className="font-heading text-2xl text-primary">{finalResult.personality}</h3>
        <p className="text-sm text-secondary">Score: {finalResult.score}/100</p>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Insights</h3>
        <div className="space-y-3">
          {finalResult.insights.map((insight, idx) => (
            <div key={idx} className="bg-gray-900/60 border border-gray-800 rounded-lg p-4">
              <p className="text-sm text-secondary leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Recommendations</h3>
        <div className="space-y-2">
          {finalResult.suggestions.map((suggestion, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-gray-900/40 border border-gray-800 rounded-lg">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
          <Share2 size={16} />
          Share
        </Button>
        <Button variant="outline" className="flex-1 border-gray-800 flex items-center justify-center gap-2 bg-transparent">
          <Download size={16} />
          Export
        </Button>
      </div>
    </div>
  )
}
