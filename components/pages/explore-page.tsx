"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestCard } from "@/components/cards/test-card";
import { TestFlow } from "@/components/test/test-flow";
import { TestResultView } from "@/components/test/test-result-view";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { AstrologyIcon } from "../icons/astrology";

interface ExplorePageProps {
  isPremium: boolean;
}

interface Test {
  id: number;
  title: string;
  category: string;
  categoryId: string;
  locked: boolean;
  questions: number;
  completed: boolean;
  icon: ReactNode;
}

const allTests: Test[] = [
  // Cosmic Identity
  {
    id: 1,
    title: "Astrology Chart",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    questions: 12,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 2,
    title: "Numerology",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    questions: 10,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 3,
    title: "Starseed origins",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 9,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 4,
    title: "Human Design",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 5,
    title: "Transis",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 6,
    title: "Zodiac Element & Modality",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <AstrologyIcon />,
  },

  // Psychological Profile
  {
    id: 7,
    title: "MBTI Type",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 16,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 8,
    title: "Shadow Work Lens",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 20,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 9,
    title: "Big Five",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 20,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 10,
    title: "Core Values Sort",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 18,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 11,
    title: "Cognitive Style",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 14,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 12,
    title: "Mind Mirrow",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 14,
    completed: false,
    icon: <AstrologyIcon />,
  },

  // Energy & Wellbeing
  {
    id: 13,
    title: "Chakra Assessment Scan",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    questions: 8,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 14,
    title: "Energy Archetype",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    questions: 11,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 15,
    title: "Emotional Regulation Type",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 13,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 16,
    title: "Stress Balance Index",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 17,
    title: "Somatic Connection",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 18,
    title: "Energy Synthesis",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <AstrologyIcon />,
  },

  // Soul Path & Karma
  {
    id: 19,
    title: "Life Path Number",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    questions: 10,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 20,
    title: "Soul Urge / Heart's Desire",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    questions: 15,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 21,
    title: "Past Life Vibes",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 17,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 22,
    title: "Karmic Lessons",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 23,
    title: "Inner Child Dialogue",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <AstrologyIcon />,
  },
  {
    id: 24,
    title: "Soul Compass",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <AstrologyIcon />,
  },
];

export function ExplorePage({ isPremium }: ExplorePageProps) {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [activeTest, setActiveTest] = useState<{
    id: number;
    title: string;
    category: string;
  } | null>(null);
  const [viewingResult, setViewingResult] = useState<number | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [completedTests, setCompletedTests] = useState<number[]>([]);

  useEffect(() => {
    const fetchCompletedTests = async () => {
      try {
        const res = await fetch("/api/tests/results");
        if (res.ok) {
          const { results } = await res.json();
          setCompletedTests(results.map((r: any) => r.testId));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompletedTests();
  }, []);

  const tests: Test[] = allTests.map((test) => ({
    ...test,
    locked: test.locked && !isPremium,
    completed: completedTests.includes(test.id),
  }));

  const categories = Array.from(
    new Map(
      allTests.map((test) => [
        test.categoryId,
        {
          id: test.categoryId,
          label: test.category,
        },
      ]),
    ).values(),
  );

  const handleTestSelect = (test: Test) => {
    if (test.locked) {
      setShowSubscriptionModal(true);
      return;
    }

    if (test.completed) {
      setViewingResult(test.id);
    } else {
      setActiveTest({
        id: test.id,
        title: test.title,
        category: test.category,
      });
    }
  };

  if (activeTest) {
    return (
      <TestFlow
        testId={activeTest.id}
        testTitle={activeTest.title}
        category={activeTest.category}
        onClose={() => setActiveTest(null)}
      />
    );
  }

  if (viewingResult !== null) {
    const test = allTests.find((t) => t.id === viewingResult)!;
    return (
      <TestResultView
        testId={test.id}
        testTitle={test.title}
        category={test.category}
        onBack={() => setViewingResult(null)}
      />
    );
  }

  return (
    <div className="pb-28 px-2 space-y-10 bg-black">
      {/* Header */}
      <div className="text-center pt-4">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[15px] font-bold text-[#FFFFFF]"
        >
          Feel the missing pieces
        </h1>
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[15px] font-[100] text-[#FFFFFF]"
        >
          Each card reveals a layer of your unique self
        </p>
      </div>

      {/* Categories */}
      {categories.map((cat) => {
        const categoryTests = tests.filter((t) => t.categoryId === cat.id);

        return (
          <div key={cat.id} className="space-y-4">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "22px",
              }}
              className="text-[21px] text-[#F2D08C] font-[325]"
            >
              {cat.label}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {categoryTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  isSelected={selectedTest === test.id}
                  onSelect={() => {
                    setSelectedTest(test.id);
                    handleTestSelect(test);
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onUpgrade={() => setShowSubscriptionModal(false)}
        />
      )}
    </div>
  );
}
