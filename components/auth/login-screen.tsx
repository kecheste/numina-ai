'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

interface LoginScreenProps {
  onLoginSuccess: () => void
  onSwitchToRegister: () => void
}

export function LoginScreen({ onLoginSuccess, onSwitchToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    if (email && password) {
      onLoginSuccess()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={32} />
            <h1 className="font-heading text-3xl text-primary">Numina</h1>
          </div>
          <p className="text-muted-foreground text-sm text-center">Your journey to self-discovery begins here</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold mt-2 hover:bg-primary/90 transition-colors"
          >
            Enter
          </Button>
        </form>

        {/* Register link */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            New to Numina?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
