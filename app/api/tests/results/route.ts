import { auth } from '@clerk/nextjs/server'
import { getDatabase } from '@/lib/mongodb'
import { TestResult } from '@/lib/models/user'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const testId = searchParams.get('testId')

    const db = await getDatabase()

    let query: Record<string, unknown> = { userId }
    if (testId) {
      query.testId = parseInt(testId)
    }

    const results = (await db
      .collection('testResults')
      .find(query)
      .sort({ completedAt: -1 })
      .toArray()) as TestResult[]

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error fetching test results:', error)
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
    const { testId } = body

    const db = await getDatabase()

    // Get the most recent result for this test
    const result = (await db
      .collection('testResults')
      .findOne(
        { userId, testId: parseInt(testId) },
        { sort: { completedAt: -1 } }
      )) as TestResult | null

    if (!result) {
      return NextResponse.json({ error: 'Test result not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching test result:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
