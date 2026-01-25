import { ObjectId } from "mongodb";

export interface UserProfile {
  _id?: ObjectId;
  clerkId: string;
  email: string;
  name: string;
  dateOfBirth: string;
  isPremium: boolean;
  subscriptionStatus: "free" | "active" | "cancelled";
  subscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  _id?: ObjectId;
  userId: string;
  testId: number;
  testTitle: string;
  category: string;
  completedAt: Date;
  answers: Record<string, number | string>;
  score: number;
  personalityType: string;
  insights: string[];
  recommendations: string[];
}

export interface UserTestRecord {
  _id?: ObjectId;
  clerkId: string;
  testId: number;
  completed: boolean;
  completedAt?: Date;
}
