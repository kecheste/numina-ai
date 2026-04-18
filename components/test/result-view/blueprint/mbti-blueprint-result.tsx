"use client";

import { Button } from "@/components/ui/button";
import { InfjIcon } from "@/components/icons/mysoul/infj";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

const DEFAULT_DESCRIPTION =
  "You are an INFJ – The Advocate, one of the rarest and most insightful personality types. You possess a unique blend of idealism, intuition, and a deep sense of purpose. Your natural inclination is to understand the underlying patterns in the world and to use that understanding to help others grow and evolve.";

const DEFAULT_TRAITS = [
  "Deeply intuitive and insightful",
  "Strong sense of purpose and values",
  "Empathetic and compassionate",
  "Creative and imaginative",
  "Value authenticity and meaning",
  "Seek personal growth and development",
  "Natural counselors and helpers",
  "Value harmony and cooperation",
];

export interface MbtiResultData {
  personalityType: string;
  insights: string[];
  recommendations: string[];
  score: number;
  narrative?: string;
  extracted_json?: {
    shortDescription?: string;
  };
}

interface MbtiTypeResultProps {
  onClose: () => void;
  resultData?: MbtiResultData | null;
}

export function MbtiBlueprintResult({
  onClose,
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
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar hideBackButton handleLogout={() => router.push("/welcome")} />

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

        <div className="flex flex-col gap-[10px] mb-6">
          {displayTraits.slice(0, 4).map((trait, idx) => (
            <p
              key={idx}
              style={{
                lineHeight: "15px",
                fontFamily: "var(--font-gotham)",
              }}
              className="text-left text-[13px] border border-[#F2D08C] border-[#F2D08C] rounded-[5px] py-0.5 pl-[8px] text-[#F2D08C] font-[350]"
            >
              {trait}
            </p>
          ))}
        </div>

        <Button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mt-[70px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
