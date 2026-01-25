import { auth } from '@clerk/nextjs/server'
import { getDatabase } from '@/lib/mongodb'
import { UserProfile } from '@/lib/models/user'
import { createOrGetCustomer, getSubscriptionStatus } from '@/lib/stripe-service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const user = (await db.collection('users').findOne({ clerkId: userId })) as UserProfile | null

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get subscription status from Stripe
    let isPremium = user.isPremium
    if (user.stripeCustomerId) {
      const subStatus = await getSubscriptionStatus(user.stripeCustomerId)
      isPremium = subStatus.status === 'active'

      // Update user in DB if status changed
      if (isPremium !== user.isPremium) {
        await db.collection('users').updateOne(
          { clerkId: userId },
          {
            $set: {
              isPremium,
              subscriptionStatus: isPremium ? 'active' : 'cancelled',
            },
          }
        )
      }
    }

    return NextResponse.json({ ...user, isPremium })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, name, dateOfBirth } = body

    const db = await getDatabase()

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ clerkId: userId })

    if (existingUser) {
      // Update existing user
      const result = await db.collection('users').updateOne(
        { clerkId: userId },
        {
          $set: {
            name,
            dateOfBirth,
            updatedAt: new Date(),
          },
        }
      )

      return NextResponse.json({ success: true, modified: result.modifiedCount })
    }

    // Create Stripe customer
    const stripeCustomer = await createOrGetCustomer(email, userId)

    // Create new user
    const newUser: UserProfile = {
      clerkId: userId,
      email,
      name,
      dateOfBirth,
      isPremium: false,
      subscriptionStatus: 'free',
      stripeCustomerId: stripeCustomer.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection('users').insertOne(newUser)

    return NextResponse.json({ success: true, user: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error creating/updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
