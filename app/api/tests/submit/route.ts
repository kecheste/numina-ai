import { auth } from '@clerk/nextjs/server'
import { getDatabase } from '@/lib/mongodb'
import { generateTestInsights } from '@/lib/ai-service'
import { TestResult, UserTestRecord } from '@/lib/models/user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { testId, testTitle, category, answers } = body

    if (!testId || !testTitle || !category || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate insights using mock AI
    const insights = await generateTestInsights({
      testId,
      testTitle,
      category,
      answers,
    })

    const db = await getDatabase()

    // Create test result
    const testResult: TestResult = {
      userId,
      testId,
      testTitle,
      category,
      completedAt: new Date(),
      answers,
      score: insights.score,
      personalityType: insights.personalityType,
      insights: insights.insights,
      recommendations: insights.recommendations,
    }

    const result = await db.collection('testResults').insertOne(testResult)

    // Record test completion
    await db.collection('userTestRecords').updateOne(
      { clerkId: userId, testId },
      {
        $set: {
          completed: true,
          completedAt: new Date(),
        },
      },
      { upsert: true }
    )

    return NextResponse.json(
      {
        success: true,
        resultId: result.insertedId,
        ...insights,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting test:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
