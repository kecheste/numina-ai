"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  apiGetDailyMessage,
  apiGetSynthesis,
  apiListTestResults,
} from "@/lib/api-client";
import type { TestResultResponse } from "@/lib/api-client";
import { RootChakraIcon } from "../icons/mysoul/chakra";
import { InfjIcon } from "../icons/mysoul/infj";
import { ScorpioIcon } from "../icons/zodiac/scorpio";
import { PiscesIcon } from "../icons/zodiac/pisces";
import { AquariusIcon } from "../icons/zodiac/aquarius";
import { CapricornIcon } from "../icons/zodiac/capricorn";
import { LeoIcon } from "../icons/zodiac/leo";
import { VirgoIcon } from "../icons/zodiac/virgo";
import { LibraIcon } from "../icons/zodiac/libra";
import { SagittariusIcon } from "../icons/zodiac/sagittarius";
import { TaurusIcon } from "../icons/zodiac/taurus";
import { GeminiIcon } from "../icons/zodiac/gemini";
import { CancerIcon } from "../icons/zodiac/cancer";
import {
  MBTI_SUMMARY,
  MOST_SURE_DEFAULT_TAGS,
  ZODIAC_SUMMARY,
} from "@/lib/constants/keys";
import { getFirstName, getZodiacSign } from "@/lib/utils";
import { AriesIcon } from "../icons/zodiac/aries";

const ONBOARDING_TEST_IDS = [13, 7, 19] as const;

const TOTAL_TEST_COUNT = 24;

function getLatestResultByTestId(
  results: TestResultResponse[],
): Record<number, TestResultResponse> {
  const byTest: Record<number, TestResultResponse> = {};
  for (const r of results) {
    if (
      ONBOARDING_TEST_IDS.includes(r.test_id as 13 | 7 | 19) &&
      !byTest[r.test_id]
    ) {
      byTest[r.test_id] = r;
    }
  }
  return byTest;
}

function getCardLabel(
  result: TestResultResponse | undefined,
  testId: number,
): string {
  if (!result) {
    if (testId === 13) return "Chakra Scan";
    if (testId === 7) return "MBTI Type";
    if (testId === 19) return "Life Path";
    return "Take test";
  }
  const title =
    result.llm_result_json?.title ?? result.personality_type ?? null;
  const refinedTitle = title ? title.replace("The ", "") : null;
  if (refinedTitle) return refinedTitle;
  if (testId === 13) return "Chakra";
  if (testId === 7) return result.personality_type ?? "MBTI";
  if (testId === 19) return "Life Path";
  return result.test_title;
}

export function SoulRevealScreen() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [resultsByTest, setResultsByTest] = useState<
    Record<number, TestResultResponse>
  >({});
  const [dailyMessage, setDailyMessage] = useState<{
    message: string;
    quote: string;
  } | null>(null);
  const [dailyMessageError, setDailyMessageError] = useState<string | null>(
    null,
  );

  const [completedTestsCount, setCompletedTestsCount] = useState(0);
  const [sureThings, setSureThings] = useState<string[]>([]);

  const firstName = getFirstName(user?.name ?? null);
  const firstNameDisplay = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : "";
  const zodiacSign = getZodiacSign(
    user?.birth_month ?? null,
    user?.birth_day ?? null,
  );
  const titleLine =
    [firstName.toUpperCase(), zodiacSign].filter(Boolean).join(" – ") ||
    "My Soul";

  useEffect(() => {
    let cancelled = false;
    apiListTestResults()
      .then((list) => {
        if (cancelled) return;
        setResultsByTest(getLatestResultByTestId(list));
        const completedIds = new Set<number>();
        for (const r of list) {
          if (r.status === "completed") {
            completedIds.add(r.test_id);
          }
        }
        setCompletedTestsCount(completedIds.size);
      })
      .catch(() => {
        if (!cancelled) setResultsByTest({});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (user == null || user.life_path_number != null) return;
    let cancelled = false;
    const t1 = window.setTimeout(() => {
      if (cancelled) return;
      refreshUser();
    }, 1500);
    const t2 = window.setTimeout(() => {
      if (cancelled) return;
      refreshUser();
    }, 4500);
    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [user?.id, user?.life_path_number, refreshUser]);

  useEffect(() => {
    let cancelled = false;
    apiGetSynthesis()
      .then((data) => {
        if (cancelled || !data?.result) return;
        const raw = (data.result as { sureThings?: unknown }).sureThings;
        if (Array.isArray(raw)) {
          const cleaned = raw
            .map((x) =>
              typeof x === "string" ? x.trim() : String(x ?? "").trim(),
            )
            .filter((x) => x.length > 0);
          if (cleaned.length > 0) {
            setSureThings(cleaned);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setSureThings([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setDailyMessageError(null);
    apiGetDailyMessage()
      .then((data) => {
        if (!cancelled)
          setDailyMessage({ message: data.message, quote: data.quote });
      })
      .catch((e) => {
        if (!cancelled) {
          setDailyMessageError(
            e instanceof Error ? e.message : "Failed to load",
          );
          setDailyMessage(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mbtiType = user?.mbti_type as keyof typeof MBTI_SUMMARY | undefined;

  const mbtiLabel =
    mbtiType && MBTI_SUMMARY[mbtiType]
      ? `${mbtiType} - The ${MBTI_SUMMARY[mbtiType]}`
      : getCardLabel(resultsByTest[7], 7);

  return (
    <div className="bg-black text-white pr-1 pb-16 space-y-6">
      <div className="mb-4 w-full relative">
        <div className="h-[15px] w-full rounded-full bg-transparent border border-[#F2D08C]/50 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(
                100,
                TOTAL_TEST_COUNT > 0
                  ? (completedTestsCount / TOTAL_TEST_COUNT) * 100
                  : 0,
              ).toFixed(1)}%`,
              backgroundColor: "#282828",
            }}
          />
        </div>

        <p className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px] font-[400] z-10 pointer-events-none">
          {completedTestsCount}/{TOTAL_TEST_COUNT}
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="text-center space-y-2">
          <h1
            style={{
              fontFamily: "var(--font-montserrat)",
            }}
            className="text-[21px] font-[700] text-center font-montserrat"
          >
            {titleLine}
          </h1>

          <div className="flex items-center gap-[11px]">
            <div className="h-[72px] w-[72px] p-2 border border-[#FFFFFF]/50 rounded-[7px]">
              {zodiacSign === "Scorpio" ? (
                <ScorpioIcon />
              ) : zodiacSign === "Pisces" ? (
                <PiscesIcon />
              ) : zodiacSign === "Aquarius" ? (
                <AquariusIcon />
              ) : zodiacSign === "Capricorn" ? (
                <CapricornIcon />
              ) : zodiacSign === "Leo" ? (
                <LeoIcon />
              ) : zodiacSign === "Virgo" ? (
                <VirgoIcon />
              ) : zodiacSign === "Libra" ? (
                <LibraIcon />
              ) : zodiacSign === "Sagittarius" ? (
                <SagittariusIcon />
              ) : zodiacSign === "Taurus" ? (
                <TaurusIcon />
              ) : zodiacSign === "Gemini" ? (
                <GeminiIcon />
              ) : zodiacSign === "Cancer" ? (
                <CancerIcon />
              ) : zodiacSign === "Aries" ? (
                <AriesIcon />
              ) : null}
            </div>
            <div
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: 350,
                lineHeight: "20px",
              }}
              className="border border-[#FFFFFF]/50 rounded-[7px] py-3 px-1 h-[72px] text-[14px] text-[#F2D08C]"
            >
              {zodiacSign && ZODIAC_SUMMARY[zodiacSign]
                ? ZODIAC_SUMMARY[zodiacSign]
                : "A grounded intuitive with cosmic insights"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-1 py-2.5">
            <RootChakraIcon />
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: "325",
                lineHeight: "17px",
              }}
              className="text-[13px] text-white text-center line-clamp-2"
            >
              {user?.strongest_chakra
                ? `${user.strongest_chakra} Strong`
                : getCardLabel(resultsByTest[13], 13)}
            </p>
          </div>
          <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-1 py-2.5">
            <InfjIcon />
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: "325",
                lineHeight: "17px",
              }}
              className="text-[12px] text-white text-center line-clamp-2 leading-[18px]"
            >
              {mbtiLabel}
            </p>
          </div>
          <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-3 py-2.5">
            <div className="flex items-center justify-center h-[65px] w-[65px] rounded-full border-2 border-[#F2D08C]">
              <span
                style={{
                  fontFamily: "var(--font-gotham)",
                  fontWeight: 400,
                  lineHeight: "17px",
                }}
                className="text-[48px] sm:text-[56px] text-[#F2D08C]"
              >
                {user?.life_path_number ?? "—"}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: "325",
                lineHeight: "17px",
              }}
              className="text-[13px] text-[#ffffff] font-book text-center"
            >
              Life <br /> Path
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            fontWeight: "325",
            lineHeight: "33px",
          }}
          className="text-[15px] text-[#ffffff] text-center"
        >
          MOST SURE THINGS
        </p>

        <div className="flex flex-wrap gap-[5px] justify-center">
          {(sureThings.length > 0 ? sureThings : MOST_SURE_DEFAULT_TAGS)
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-gotham)",
                  fontWeight: "325",
                }}
                className="p-1 rounded-[7px] border border-[#F2D08C]/40 text-[12px] text-[#F2D08C]"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <button
        style={{
          fontFamily: "var(--font-arp80)",
          fontWeight: "400",
          lineHeight: "33px",
        }}
        onClick={() => router.push("/home/synthesis")}
        className="w-full text-[16px] rounded-[10px] bg-[#F2D08C] h-[54px] text-black"
      >
        Reveal my Full Synthesis
      </button>

      <div className="relative z-0 rounded-[14px] bg-[#F2D08C33] border border-[#F2D08C]/50 p-4 pt-6 space-y-2">
        <span className="absolute z-5 left-4 top-[-2] h-[2px] w-[130px] bg-black" />

        <p
          className="absolute z-10 left-6 -top-[15px] text-[15px] text-white"
          style={{
            fontFamily: "var(--font-gotham)",
            fontWeight: 325,
            lineHeight: "33px",
          }}
        >
          {firstNameDisplay ? `${firstNameDisplay} – Today` : "Today"}
        </p>

        <p
          style={{
            fontFamily: "var(--font-gotham)",
            fontWeight: 325,
          }}
          className="text-[13px] text-left text-white"
        >
          ✨ Cosmic Energy:
          <br />
          {dailyMessageError && (
            <span className="text-[#9ca3af]">Daily message unavailable.</span>
          )}
          {!dailyMessageError && !dailyMessage && (
            <span className="text-[#9ca3af]">Loading today’s message…</span>
          )}
          {!dailyMessageError &&
            dailyMessage &&
            dailyMessage.message.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
        </p>
      </div>
      <p className="text-xs italic text-[#F2D08C] text-center">
        {dailyMessage
          ? `"${dailyMessage.quote}"`
          : dailyMessageError
            ? ""
            : '"Your silence speaks in sacred language."'}
      </p>
    </div>
  );
}
