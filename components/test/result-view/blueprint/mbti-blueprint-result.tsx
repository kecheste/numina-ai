"use client";

import { Button } from "@/components/ui/button";
import { InfjIcon } from "@/components/icons/mysoul/infj";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

export interface MbtiResultData {
  personalityType: string;
  insights: string[];
  recommendations: string[];
  score: number;
  narrative?: string | null;
  extracted_json?: {
    confidence?: Record<string, number>;
    [key: string]: any;
  } | null;
}

const DEFAULT_DESCRIPTION =
  "Thoughtful, visionary, and driven by deeper meaning — INFJs are introspective idealists who combine empathy with structure. You likely seek purpose, harmony, and impact in both work and relationships.";

const DEFAULT_TRAITS = [
  "You recharge alone, but care deeply about others",
  "You think ahead, looking for connections and meaning",
  "You're a mix of logic and emotional intelligence",
  "You prefer plans, but value integrity over control",
];

interface MbtiTypeResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  resultData?: MbtiResultData | null;
}

export function MbtiBlueprintResult({
  onClose,
  shellRef,
  resultData,
}: MbtiTypeResultProps) {
  const router = useRouter();
  const typeLabel = resultData?.personalityType ?? "INFJ – The Advocate";
  const description =
    (resultData?.narrative && resultData.narrative.trim()) ||
    DEFAULT_DESCRIPTION;
  const displayTraits = resultData?.insights?.length
    ? resultData.insights
    : DEFAULT_TRAITS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative pt-2 w-full h-dvh sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-hidden flex flex-col items-center text-center"
      >
        <AppBar
          hideBackButton
          handleLogout={() => router.push("/welcome")}
          shellRef={shellRef}
        />

        <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-6 pb-4 overflow-y-auto">
          <h1
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "33px",
            }}
            className="text-[21px] font-[400] text-white mb-3"
          >
            Your Personality Type
          </h1>

          <div
            className="border border-[#F2D08C] rounded-[16px] px-4 mb-5 h-[32px]"
            style={{ fontFamily: "var(--font-gotham)" }}
          >
            <span className="text-[#F2D08C] text-[21px] font-[300]">
              {typeLabel}
            </span>
          </div>

          <div className="mb-5">
            <InfjIcon />
          </div>

          <p
            className="text-[13px] font-[300] text-[#FFFFFF] mb-8 px-2"
            style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
          >
            {resultData?.extracted_json?.shortDescription ||
              resultData?.narrative?.split("\n").filter(Boolean)[0] ||
              description}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "33px",
            }}
            className="text-[21px] font-[400] text-[#F2D08C] mb-4"
          >
            What this says about you
          </h2>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {displayTraits.slice(0, 4).map((trait, idx) => (
              <div
                key={idx}
                className="border border-[#F2D08C]/50 rounded-[8px] px-3"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                <span className="text-[12px] font-[300] text-[#F2D08C]">
                  {trait}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={onClose}
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="cursor-pointer mt-[70px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
