"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import type { NumerologyBlueprintResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/layout/mobile-frame";

const DEFAULT_NUMEROLOGY_DATA: NumerologyBlueprintResponse["items"] = [
  {
    number: "4",
    title: "Life Path",
    description: "Your life path reflects your core purpose and lessons.",
  },
  {
    number: "7",
    title: "Soul Urge",
    description: "Your soul urge reveals what your heart truly desires.",
  },
  {
    number: "6",
    title: "Birthday Number",
    description:
      "Your birthday number adds a personal layer to your cosmic profile.",
  },
  {
    number: "3",
    title: "Expression",
    description:
      "Your expression number reflects how you show up in the world.",
  },
];

const MAX_DESCRIPTION_LENGTH = 70;

function oneSentenceMaxChars(
  text: string,
  maxLen: number = MAX_DESCRIPTION_LENGTH,
): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]*[.!?]/);
  const one = match ? match[0].trim() : trimmed;
  if (one.length <= maxLen) return one;
  const cut = one.slice(0, maxLen + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const out =
    lastSpace > maxLen >> 1 ? cut.slice(0, lastSpace) : cut.slice(0, maxLen);
  return (
    out.endsWith(".") || out.endsWith("!") || out.endsWith("?")
      ? out
      : out + "."
  ).trim();
}

interface NumerologyBlueprintResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: NumerologyBlueprintResponse["items"] | null;
}

export function NumerologyBlueprintResult({
  onClose,
  shellRef,
  content = undefined,
}: NumerologyBlueprintResultProps) {
  const router = useRouter();
  const items =
    content && Array.isArray(content) && content.length > 0
      ? content
      : DEFAULT_NUMEROLOGY_DATA || [];
  const isLoading = content === null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50">
        <MobileFrame
          ref={shellRef}
          scrollable={false}
          className="relative pt-4"
        >
          <div className="flex items-center border-b justify-between w-full bg-black pb-4 px-[24px] z-40 shrink-0">
            <div />
            <NuminaLogoIcon />
            <div />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="flex flex-col items-center justify-center h-full -mt-20 w-full text-white">
              <div className="relative">
                <div className="relative w-12 h-12 rounded-full border border-[#F2D08C]/40 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#F2D08C] animate-[scalePulse_1.4s_ease-in-out_infinite]" />
                </div>
              </div>

              <span
                className="mt-6 text-xs tracking-[0.3em] text-[#F2D08C]/70 uppercase"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                Preparing
              </span>

              <style jsx>{`
                @keyframes scalePulse {
                  0% {
                    transform: scale(0.6);
                    opacity: 0.6;
                  }
                  50% {
                    transform: scale(1);
                    opacity: 1;
                  }
                  100% {
                    transform: scale(0.6);
                    opacity: 0.6;
                  }
                }
              `}</style>
            </div>
          </div>
        </MobileFrame>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <MobileFrame
        ref={shellRef}
        scrollable={true}
        className="relative pt-4"
      >
        <AppBar
          hideBackButton
          handleLogout={() => router.push("/welcome")}
          shellRef={shellRef}
        />

        <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-8 overflow-y-auto pb-4">
          <h1
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "33px",
            }}
            className="text-[21px] font-[300] text-[#FFFFFF] mb-8"
          >
            Your Numerology Blueprint
          </h1>

          <div className="w-full space-y-6 mb-6">
            {items?.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-6 gap-2 w-full text-left"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <span
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[58px] font-[400] text-white"
                  >
                    {item.number}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-[#FFFFFF] text-[48px] font-[300]">
                    →
                  </span>
                </div>
                <div className="col-span-4">
                  <h3
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[15px] font-[400] text-[#FFFFFF] mb-0.5"
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[13px] font-[350] text-[#F2D08C]"
                  >
                    {oneSentenceMaxChars(item.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={onClose}
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="cursor-pointer mt-auto hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
          >
            Next Step
          </Button>
        </div>
      </MobileFrame>
    </div>
  );
}
