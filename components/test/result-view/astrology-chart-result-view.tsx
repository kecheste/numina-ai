"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";
import {
  apiFetchAstrologyChartNarrative,
  type AstrologyChartResponse,
  type AstrologyChartNarrativeResponse,
} from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

function formatSign(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AstrologyChartResultView({
  chart,
  onClose,
  shellRef,
  onLogout,
}: {
  chart: AstrologyChartResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [narrative, setNarrative] = useState<
    AstrologyChartNarrativeResponse | null | undefined
  >(undefined);

  useEffect(() => {
    let cancelled = false;

    const fetchWithPolling = async (delayMs: number) => {
      if (cancelled) return;
      try {
        const data = await apiFetchAstrologyChartNarrative();
        if (cancelled) return;
        setNarrative(data);
        setIsLoading(false);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : String(err ?? "Unknown error");
        // When the worker has not finished refining the astrology chart result yet,
        // apiFetchAstrologyChartNarrative throws this specific message. In that case
        // we keep showing the loading screen and poll again after a short delay.
        if (
          message.includes(
            "Astrology chart narrative has not been generated yet",
          )
        ) {
          setIsLoading(true);
          setTimeout(() => fetchWithPolling(Math.min(delayMs * 2, 8000)), delayMs);
        } else {
          // Hard failure: stop loading and show empty narrative state.
          setIsLoading(false);
          setNarrative(null);
        }
      }
    };

    // Start with a short delay so the worker has time to compute after
    // /tests/astrology-chart has created/enqueued the test result.
    fetchWithPolling(1000);

    return () => {
      cancelled = true;
    };
  }, []);

  const el = chart.element_distribution;
  const elements = [
    el.fire > 0 && { name: "Fire", count: el.fire },
    el.earth > 0 && { name: "Earth", count: el.earth },
    el.air > 0 && { name: "Air", count: el.air },
    el.water > 0 && { name: "Water", count: el.water },
  ].filter(Boolean) as { name: string; count: number }[];

  const sunDesc = narrative?.sun_description ?? null;
  const moonDesc = narrative?.moon_description ?? null;
  const risingDesc = narrative?.rising_description ?? null;
  const cosmicSummary = null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col flex-1 items-center justify-center text-center py-12">
              <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[14px] font-[350] text-[#F2D08C]"
              >
                Preparing your astrology chart…
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-2">
                Your Astrology Chart
              </h1>
              <h1 className="text-[18px] font-[300] text-[#F2D08C] mb-2">
                {narrative?.title?.replace("Astrology Chart – ", "")?.trim() ??
                  "Your Astrology Chart"}
              </h1>
              <p className="text-[13px] font-[300] text-white/90 mb-4">
                Based on your birth date, time, and place
              </p>

              {narrative?.core_traits && narrative.core_traits.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {narrative.core_traits.map((trait) => (
                    <span
                      key={trait}
                      className="border border-[#F2D08C]/50 rounded-[20px] px-2 text-[12px] font-[350] text-[#F2D08C]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
                <div className="col-span-1">
                  <SunIcon />
                </div>
                <div className="col-span-4">
                  <h3 className="text-[15px] font-[350] text-white mb-0.5">
                    Sun Sign
                  </h3>
                  <p className="text-[13px] font-[400] text-[#F2D08C]">
                    {formatSign(chart.sun_sign)}
                  </p>
                  {sunDesc && (
                    <p
                      className="text-[13px] font-[350] text-white/90 mt-1.5"
                      style={{ lineHeight: "20px" }}
                    >
                      {sunDesc}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
                <div className="col-span-1">
                  <MoonIcon />
                </div>
                <div className="col-span-4">
                  <h3 className="text-[15px] font-[350] text-white mb-0.5">
                    Moon Sign
                  </h3>
                  <p className="text-[13px] font-[400] text-[#F2D08C]">
                    {formatSign(chart.moon_sign)}
                  </p>
                  {moonDesc && (
                    <p
                      className="text-[13px] font-[350] text-white/90 mt-1.5"
                      style={{ lineHeight: "20px" }}
                    >
                      {moonDesc}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
                <div className="col-span-1">
                  <RisingIcon />
                </div>
                <div className="col-span-4">
                  <h3 className="text-[15px] font-[350] text-white mb-0.5">
                    Rising Sign
                  </h3>
                  <p className="text-[13px] font-[400] text-[#F2D08C]">
                    {formatSign(chart.rising_sign)}
                  </p>
                  {risingDesc && (
                    <p
                      className="text-[13px] font-[350] text-white/90 mt-1.5"
                      style={{ lineHeight: "20px" }}
                    >
                      {risingDesc}
                    </p>
                  )}
                </div>
              </div>

              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Element distribution
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {elements.length > 0 ? (
                  elements.map(({ name, count }) => (
                    <span
                      key={name}
                      className="border border-[#F2D08C]/50 rounded-[20px] px-2 text-[12px] font-[350] text-[#F2D08C]"
                    >
                      {name} {count}
                    </span>
                  ))
                ) : (
                  <span className="text-[13px] text-white/70">—</span>
                )}
              </div>

              {cosmicSummary && (
                <>
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Cosmic traits summary
                  </h3>
                  <p
                    className="text-[13px] font-[350] text-left text-white/90 mb-6 whitespace-pre-line"
                    style={{ lineHeight: "20px" }}
                  >
                    {cosmicSummary}
                  </p>
                </>
              )}

              {narrative?.narrative && (
                <>
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Your blueprint
                  </h3>
                  <div
                    className="text-[12px] font-[300] text-white/90 mb-6 whitespace-pre-line"
                    style={{ lineHeight: "20px" }}
                  >
                    {narrative.narrative}
                  </div>
                </>
              )}

              {((narrative?.strengths?.length ?? 0) > 0 ||
                (narrative?.challenges?.length ?? 0) > 0) && (
                <div className="text-left">
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Strengths & Challenges
                  </h3>
                  <div className="mb-6 space-y-2">
                    {narrative?.strengths?.length ? (
                      <div>
                        <p className="text-[13px] font-[400] text-[#F2D08C] mb-1">
                          Strengths
                        </p>
                        <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 space-y-0.5">
                          {narrative.strengths.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {narrative?.challenges?.length ? (
                      <div>
                        <p className="text-[13px] font-[400] text-[#F2D08C] mb-1">
                          Challenges
                        </p>
                        <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 space-y-0.5">
                          {narrative.challenges.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              {narrative?.avoid_this && narrative.avoid_this.length > 0 && (
                <div className="text-left">
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Avoid This
                  </h3>
                  <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 mb-6 space-y-0.5">
                    {narrative.avoid_this.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {narrative?.overlaps && narrative.overlaps.length > 0 && (
                <div className="text-left">
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Overlaps
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {narrative.overlaps.map((o) => (
                      <li key={o.label}>
                        <span className="text-[13px] font-[400] text-[#F2D08C]">
                          {o.label}:
                        </span>{" "}
                        <span
                          className="text-[13px] font-[350] text-white/90"
                          style={{ lineHeight: "20px" }}
                        >
                          {o.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {narrative?.try_this && narrative.try_this.length > 0 && (
                <div className="text-left">
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Try This
                  </h3>
                  <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 mb-6 space-y-0.5">
                    {narrative.try_this.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {narrative?.spiritual_insight && (
                <>
                  <h3
                    className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                    style={{ lineHeight: "33px" }}
                  >
                    Spiritual Insight
                  </h3>
                  <p
                    className="text-[13px] font-[350] text-white/90"
                    style={{ lineHeight: "20px" }}
                  >
                    {narrative.spiritual_insight}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
