"use client";

import { useState, useEffect, useMemo } from "react";
import { TestCard } from "@/components/cards/test-card";
import { TestFlow } from "@/components/test/test-flow";
import { TestResultView } from "@/components/test/test-result-view";
import { TestResultStarseedView } from "@/components/test/test-result-starseed-view";
import { TestResultChakraView } from "@/components/test/test-result-chakra-view";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { TestIntro } from "../modals/test-intro";
import { apiFetchTests, type TestFromApi } from "@/lib/api-client";
import { getTestUi } from "@/lib/constants/testUiMap";

interface ExplorePageProps {
  isPremium: boolean;
}

/** Test from API merged with UI (icon, description). locked/completed from backend. */
interface TestWithUi extends TestFromApi {
  categoryId: string;
  icon: React.ReactNode;
  description: string;
  locked: boolean;
  completed: boolean;
  alreadyTaken: boolean;
}

export function ExplorePage({ isPremium }: ExplorePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [testsResponse, setTestsResponse] = useState<{
    user_is_premium: boolean;
    tests: TestFromApi[];
  } | null>(null);
  const [testsError, setTestsError] = useState<string | null>(null);
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
    description: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setTestsError(null);
    apiFetchTests()
      .then((data) => {
        if (!cancelled) setTestsResponse({ user_is_premium: data.user_is_premium, tests: data.tests });
      })
      .catch((e) => {
        if (!cancelled)
          setTestsError(
            e instanceof Error ? e.message : "Failed to load tests",
          );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const userIsPremium = testsResponse?.user_is_premium ?? isPremium;

  const tests: TestWithUi[] = useMemo(() => {
    if (!testsResponse?.tests) return [];
    return testsResponse.tests.map((t) => {
      const ui = getTestUi(t.id);
      return {
        ...t,
        categoryId: t.category_id,
        icon: ui.icon,
        description: ui.description,
        locked: t.premium && !userIsPremium,
        completed: t.already_taken,
        alreadyTaken: t.already_taken,
      };
    });
  }, [testsResponse, userIsPremium]);

  const categories = useMemo(() => {
    return Array.from(
      new Map(
        tests.map((t) => [
          t.categoryId,
          { id: t.categoryId, label: t.category },
        ]),
      ).values(),
    );
  }, [tests]);

  const handleTestSelect = (test: TestWithUi) => {
    if (test.auto_generated) {
      setViewingResult(test.id);
      return;
    }
    if (test.alreadyTaken || test.completed) {
      setViewingResult(test.id);
      return;
    }
    if (test.locked) {
      setLockedTestForIntro({
        title: test.title,
        description: test.description,
      });
      return;
    }
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
    const test = tests.find((t) => t.id === viewingResult);
    const onBackResult = () => setViewingResult(null);
    if (!test) {
      setViewingResult(null);
    } else {
      if (test.id === 3) {
        return (
          <TestResultStarseedView
            testTitle={test.title}
            onBack={onBackResult}
          />
        );
      }
      if (test.id === 13) {
        return (
          <TestResultChakraView testTitle={test.title} onBack={onBackResult} />
        );
      }
      return (
        <TestResultView
          testId={test.id}
          testTitle={test.title}
          category={test.category}
          onBack={onBackResult}
        />
      );
    }
  }

  if (testsError) {
    return (
      <div className="pb-24 px-4 text-center">
        <p className="text-[#F2D08C] font-[325] mb-2">{testsError}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-white underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!testsResponse) {
    return (
      <div className="pb-24 flex items-center justify-center min-h-[200px]">
        <p className="text-[#F2D08C] font-[325]">Loading tests…</p>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-6">
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
                  test={{
                    id: test.id,
                    title: test.title,
                    category: test.category,
                    locked: test.locked,
                    alreadyTaken: test.alreadyTaken,
                    questions: test.questions,
                    completed: test.completed,
                    icon: test.icon,
                    autoGenerated: test.auto_generated,
                  }}
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
          isPremium={userIsPremium}
          testTitle={lockedTestForIntro.title}
          testDescription={lockedTestForIntro.description}
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
