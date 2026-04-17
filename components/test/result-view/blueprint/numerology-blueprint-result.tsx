"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import type { NumerologyBlueprintResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
interface NumerologyBlueprintResultProps {
  onClose: () => void;
  content?: NumerologyBlueprintResponse["items"] | null;
}

export function NumerologyBlueprintResult({
  onClose,
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
      <div className="absolute inset-0 z-50 bg-black flex flex-col pt-4">
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
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-4">
      <AppBar hideBackButton handleLogout={() => router.push("/welcome")} />

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
            <div key={idx} className="grid grid-cols-6 gap-2 w-full text-left">
              <div className="col-span-1 flex items-center justify-center">
                <span
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[58px] font-[400] text-white"
                >
                  {item.number}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-[#FFFFFF] text-[48px] font-[300]">→</span>
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
    </div>
  );
}
