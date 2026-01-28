"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestCard } from "@/components/cards/test-card";
import { TestFlow } from "@/components/test/test-flow";
import { TestResultView } from "@/components/test/test-result-view";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { AstrologyIcon } from "../icons/astrology";
import { AstrologyChartIcon } from "../icons/explore/astrologyCharIcon";
import { NumerologyIcon } from "../icons/explore/numerologyIcon";
import { StarseedIcon } from "../icons/explore/starseedIcon";
import { HumanDesignIcon } from "../icons/explore/humanDesignIcon";
import { TransitsIcon } from "../icons/explore/transitsIcon";
import { ZodiacElementIcon } from "../icons/explore/zodiacElement";
import { MBTITypeIcon } from "../icons/explore/mbtiTypeIcon";
import { ShadowWorkIcon } from "../icons/explore/shadowWorkIcon";
import { BigFiveIcon } from "../icons/explore/bigFiveIcon";
import { CoreValuesIcon } from "../icons/explore/coreValuesIcon";
import { CognitiveStyleIcon } from "../icons/explore/cognitiveStyle";
import { MindMirrorIcon } from "../icons/explore/mindMirrorIcon";
import { ChakraAlignmentIcon } from "../icons/explore/chakraAlignmentIcon";
import { EnergyArchetypeIcon } from "../icons/explore/energyArchetypeIcon";
import { EmotionalRegulationIcon } from "../icons/explore/emotionalRegulationIcon";
import { StressBalanceIcon } from "../icons/explore/stressBalanceIcon";
import { SomaticConnectionIcon } from "../icons/explore/somaticConnection";
import { EnergySynthesisIcon } from "../icons/explore/energySynthesisIcon";
import { LifePathIcon } from "../icons/explore/lifePathIcon";
import { SoulUrgeIcon } from "../icons/explore/soulUrgeIcon";
import { PastLifeIcon } from "../icons/explore/pastLifeIcon";
import { KarmicLessonsIcon } from "../icons/explore/karmicLessonsIcon";
import { SoulCompassIcon } from "../icons/explore/soulCompassIcon";
import { InnerChildIcon } from "../icons/explore/InnerChildIcon";

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
    icon: <AstrologyChartIcon />,
  },
  {
    id: 2,
    title: "Numerology",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    questions: 10,
    completed: false,
    icon: <NumerologyIcon />,
  },
  {
    id: 3,
    title: "Starseed origins",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 9,
    completed: false,
    icon: <StarseedIcon />,
  },
  {
    id: 4,
    title: "Human Design",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <HumanDesignIcon />,
  },
  {
    id: 5,
    title: "Transits",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <TransitsIcon />,
  },
  {
    id: 6,
    title: "Zodiac Element & Modality",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    questions: 15,
    completed: false,
    icon: <ZodiacElementIcon />,
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
    icon: <MBTITypeIcon />,
  },
  {
    id: 8,
    title: "Shadow Work Lens",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 20,
    completed: false,
    icon: <ShadowWorkIcon />,
  },
  {
    id: 9,
    title: "Big Five",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 20,
    completed: false,
    icon: <BigFiveIcon />,
  },
  {
    id: 10,
    title: "Core Values Sort",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 18,
    completed: false,
    icon: <CoreValuesIcon />,
  },
  {
    id: 11,
    title: "Cognitive Style",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 14,
    completed: false,
    icon: <CognitiveStyleIcon />,
  },
  {
    id: 12,
    title: "Mind Mirror",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    questions: 14,
    completed: false,
    icon: <MindMirrorIcon />,
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
    icon: <ChakraAlignmentIcon />,
  },
  {
    id: 14,
    title: "Energy Archetype",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    questions: 11,
    completed: false,
    icon: <EnergyArchetypeIcon />,
  },
  {
    id: 15,
    title: "Emotional Regulation Type",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 13,
    completed: false,
    icon: <EmotionalRegulationIcon />,
  },
  {
    id: 16,
    title: "Stress Balance Index",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <StressBalanceIcon />,
  },
  {
    id: 17,
    title: "Somatic Connection",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <SomaticConnectionIcon />,
  },
  {
    id: 18,
    title: "Energy Synthesis",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    questions: 16,
    completed: false,
    icon: <EnergySynthesisIcon />,
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
    icon: <LifePathIcon />,
  },
  {
    id: 20,
    title: "Soul Urge / Heart's Desire",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    questions: 15,
    completed: false,
    icon: <SoulUrgeIcon />,
  },
  {
    id: 21,
    title: "Past Life Vibes",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 17,
    completed: false,
    icon: <PastLifeIcon />,
  },
  {
    id: 22,
    title: "Karmic Lessons",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <KarmicLessonsIcon />,
  },
  {
    id: 23,
    title: "Inner Child Dialogue",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <InnerChildIcon />,
  },
  {
    id: 24,
    title: "Soul Compass",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    questions: 19,
    completed: false,
    icon: <SoulCompassIcon />,
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
    <div className="pb-24 pr-1 space-y-6 bg-black">
      {/* Header */}
      <div className="text-center">
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
              className="text-[21px] text-left text-[#F2D08C] font-[325]"
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
