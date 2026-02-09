"use client";

import { useState, useEffect, ReactNode } from "react";
import { TestCard } from "@/components/cards/test-card";
import { TestFlow } from "@/components/test/test-flow";
import { TestResultView } from "@/components/test/test-result-view";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { allTests } from "@/lib/constants/allTests";
import { TestIntro } from "../modals/test-intro";

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
  alreadyTaken: boolean;
}

export function ExplorePage({ isPremium }: ExplorePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [activeTest, setActiveTest] = useState<{
    id: number;
    title: string;
    category: string;
  } | null>(null);
  const [viewingResult, setViewingResult] = useState<number | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [lockedTestForIntro, setLockedTestForIntro] = useState<{
    title: string;
  } | null>(null);
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
    alreadyTaken: test.alreadyTaken,
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
    // First check if test was already taken (either from API or static data)
    if (test.alreadyTaken || test.completed) {
      setViewingResult(test.id);
      return;
    }

    // If not taken, check if it's locked
    if (test.locked) {
      setLockedTestForIntro({ title: test.title });
      return;
    }

    // If not taken and not locked, start the test
    setActiveTest({
      id: test.id,
      title: test.title,
      category: test.category,
    });
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
    <div className="pb-24 space-y-6">
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

            <div className="grid grid-cols-3 gap-[9px]">
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

      {lockedTestForIntro && (
        <TestIntro
          isPremium={isPremium}
          testTitle={lockedTestForIntro.title}
          testDescription="
            “Are you a soul seeded from the stars? This test helps uncover your cosmic ancestry — whether you resonate with the Pleiadians, Arcturians, or other galactic lineages. Explore your soul’s multidimensional heritage and how it shapes your intuition, mission, and energy.”
          "
          onClose={() => setLockedTestForIntro(null)}
          onUpgrade={() => {
            setLockedTestForIntro(null);
            setShowSubscriptionModal(true);
          }}
          onStart={() => setLockedTestForIntro(null)}
        />
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onUpgrade={() => setShowSubscriptionModal(false)}
        />
      )}
    </div>
  );
}
