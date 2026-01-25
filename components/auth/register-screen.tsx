'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'

interface RegisterScreenProps {
  onContinue: (data: { name: string; email: string; password: string }) => void
  onBack: () => void
}

export function RegisterScreen({ onContinue, onBack }: RegisterScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password) {
      onContinue({ name, email, password })
    }
  }

  const isComplete = name && email && password

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 flex flex-col p-6">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Title */}
          <div className="mb-6">
            <h2 className="font-heading text-2xl text-primary mb-2">Create Your Account</h2>
            <p className="text-sm text-muted-foreground">
              Set up your profile to begin your journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-900 border-gray-700 text-foreground placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border-gray-700 text-foreground placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-gray-700 text-foreground placeholder:text-gray-500"
              />
            </div>
          </form>
        </div>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          disabled={!isComplete}
          className="w-full bg-primary text-primary-foreground font-semibold py-6 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
