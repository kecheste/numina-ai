interface TestInsightRequest {
  testId: number;
  testTitle: string;
  category: string;
  answers: Record<string, number | string>;
}

interface TestInsightResponse {
  personalityType: string;
  insights: string[];
  recommendations: string[];
  score: number;
}

const mockResponses: Record<number, TestInsightResponse> = {
  1: {
    personalityType: "The Cosmic Dreamer",
    insights: [
      "You have a natural connection to the mystical realm",
      "Your birth chart reveals a balanced water-earth influence",
      "Mercury's position suggests strong intuitive communication",
      "Venus alignment indicates harmony in relationships",
    ],
    recommendations: [
      "Practice meditation during moon transitions",
      "Journal during Mercury retrograde for clarity",
      "Explore numerology for deeper self-understanding",
      "Connect with others who share your cosmic frequency",
    ],
    score: 8.5,
  },
  2: {
    personalityType: "The Lunar Intuitive",
    insights: [
      "Your moon sign reveals emotional depth and sensitivity",
      "Natural empathy is your superpower",
      "Subconscious patterns guide your decision-making",
      "Strong connection to cycles and rhythms",
    ],
    recommendations: [
      "Honor your emotional needs regularly",
      "Create a safe space for self-reflection",
      "Trust your gut instincts",
      "Explore shadow work for personal growth",
    ],
    score: 8.2,
  },
  5: {
    personalityType: "The Analytical Visionary",
    insights: [
      "You balance logic with creative thinking",
      "Strong problem-solving abilities",
      "Natural tendency to question and explore",
      "Strategic mind with innovative ideas",
    ],
    recommendations: [
      "Channel analytical strength into creative projects",
      "Document your innovative ideas",
      "Seek mentorship in areas of interest",
      "Balance thinking with action",
    ],
    score: 8.8,
  },
  9: {
    personalityType: "The Harmonious Heart",
    insights: [
      "Your chakras show strong balance potential",
      "Heart chakra is naturally open",
      "Energy flows smoothly through your system",
      "Sensitive to environmental vibrations",
    ],
    recommendations: [
      "Practice daily energy cleansing",
      "Engage in heart-opening activities",
      "Use crystals aligned with your energy",
      "Spend time in nature regularly",
    ],
    score: 8.3,
  },
  13: {
    personalityType: "The Life Path 7 - The Seeker",
    insights: [
      "You are naturally drawn to wisdom and truth",
      "Spiritual exploration is part of your purpose",
      "Intuition is your guide",
      "Analysis and reflection are your tools",
    ],
    recommendations: [
      "Invest in spiritual development",
      "Read deeply and widely",
      "Create quiet space for contemplation",
      "Trust the journey of self-discovery",
    ],
    score: 8.6,
  },
};

export async function generateTestInsights(
  request: TestInsightRequest,
): Promise<TestInsightResponse> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return mock response based on testId, or generate a random one
  const response = mockResponses[request.testId] || {
    personalityType: `The ${request.testTitle} Expert`,
    insights: [
      "You demonstrate strong alignment with this assessment dimension",
      "Your responses reveal unique patterns and preferences",
      "Natural aptitude in this area is evident",
      "Deep engagement with these concepts is characteristic of you",
    ],
    recommendations: [
      "Explore this aspect of yourself further through reflection",
      "Seek community with like-minded individuals",
      "Document your insights and progress",
      "Integrate these learnings into your daily life",
    ],
    score: 7.5 + Math.random() * 2,
  };

  return response;
}
