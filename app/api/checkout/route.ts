import { auth } from '@clerk/nextjs/server'
import { getDatabase } from '@/lib/mongodb'
import { createCheckoutSession, createOrGetCustomer } from '@/lib/stripe-service'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planType } = body

    if (!planType || !['monthly', 'annual'].includes(planType)) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const user = await db.collection('users').findOne({ clerkId: userId })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get or create Stripe customer
    const customer = await createOrGetCustomer(user.email, userId)

    // Create checkout session
    const session = await createCheckoutSession(customer.id, planType)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
