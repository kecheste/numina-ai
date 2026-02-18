export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  birth_time: string | null;
  birth_place: string | null;
  is_premium: boolean;
  subscription_status: string;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface TestResult {
  userId: number;
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
  userId: number;
  testId: number;
  completed: boolean;
  completedAt?: Date;
}
