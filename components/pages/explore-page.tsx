"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { TestCard } from "@/components/cards/test-card";
import { ExploreTestOrchestrator } from "@/features/tests/ExploreTestOrchestrator";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { TestIntro } from "../modals/test-intro";
import {
  apiFetchTests,
  apiListTestResults,
  type TestFromApi,
  type TestResultResponse,
} from "@/lib/api-client";
import { getTestUi } from "@/lib/constants/testUiMap";
import { useRouter } from "next/navigation";

interface ExplorePageProps {
  isPremium: boolean;
}

interface TestWithUi extends TestFromApi {
  categoryId: string;
  icon: React.ReactNode;
  description: string;
  locked: boolean;
  completed: boolean;
  alreadyTaken: boolean;
}

export function ExplorePage({ isPremium }: ExplorePageProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [testsResponse, setTestsResponse] = useState<{
    user_is_premium: boolean;
    tests: TestFromApi[];
  } | null>(null);
  const [testsError, setTestsError] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [activeTest, setActiveTest] = useState<TestWithUi | null>(null);
  const [viewingResult, setViewingResult] = useState<number | null>(null);
  const [viewingResultData, setViewingResultData] = useState<
    TestResultResponse | null | undefined
  >(undefined);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [introTest, setIntroTest] = useState<TestWithUi | null>(null);

  const refetchTests = useCallback(() => {
    setTestsError(null);
    apiFetchTests()
      .then((data) =>
        setTestsResponse({
          user_is_premium: data.user_is_premium,
          tests: data.tests,
        }),
      )
      .catch((e) =>
        setTestsError(e instanceof Error ? e.message : "Failed to load tests"),
      );
  }, []);

  useEffect(() => {
    let cancelled = false;
    setTestsError(null);
    apiFetchTests()
      .then((data) => {
        if (!cancelled)
          setTestsResponse({
            user_is_premium: data.user_is_premium,
            tests: data.tests,
          });
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

  const testsTakenCount = useMemo(() => {
    return tests.filter((t) => t.alreadyTaken).length;
  }, [tests]);

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
    if (test.alreadyTaken) {
      setActiveTest(test);
      return;
    }

    setIntroTest(test);
  };

  if (activeTest) {
    return (
      <ExploreTestOrchestrator
        test={activeTest}
        isPremium={userIsPremium}
        onClose={() => {
          setActiveTest(null);
          refetchTests();
        }}
      />
    );
  }

  if (viewingResult !== null) {
    return null;
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

  return (
    <div className="pb-16 space-y-6">
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

      {introTest && (
        <TestIntro
          isPremium={userIsPremium}
          testsTaken={testsTakenCount}
          testTitle={introTest.title}
          testDescription={introTest.description}
          onClose={() => setIntroTest(null)}
          onUpgrade={() => {
            setIntroTest(null);
            setShowSubscriptionModal(true);
          }}
          onStart={() => {
            setActiveTest(introTest);
            setIntroTest(null);
          }}
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
