"use client";

import { Button } from "@/components/ui/button";

interface TestIntroProps {
  isPremium: boolean;
  testTitle: string;
  testDescription?: string;
  onUpgrade: () => void;
  onClose: () => void;
  onStart?: () => void;
}

export function TestIntro({
  isPremium,
  testTitle,
  testDescription,
  onUpgrade,
  onClose,
  onStart,
}: TestIntroProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div
        className="
          w-full
          min-h-screen
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-[#F2D08CE5]
          overflow-y-auto
          flex
          flex-col
          px-[21px]
        "
      >
        <div className="bg-black rounded-[19px] mt-auto p-[19px] text-center flex flex-col items-center">
          <h1
            style={{
              fontFamily: "var(--font-fangsong)",
              lineHeight: "100%",
            }}
            className="text-[45px] text-[#F2D08C] mb-6"
          >
            {testTitle}
          </h1>

          <div
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "23px",
            }}
            className="text-[13px] text-left text-white mb-[30px]"
          >
            <p className="font-[600]">Discover Your {testTitle}</p>
            {testDescription && (
              <>
                <p className="font-[300] text-[12px]">
                  Short Description (what this test is about):
                </p>
                <p className="font-[300] text-[12px]">{testDescription}</p>
              </>
            )}
          </div>

          {isPremium ? (
            <Button
              onClick={onStart}
              style={{
                fontFamily: "var(--font-arp80)",
                lineHeight: "33px",
              }}
              className="
                w-full
                  h-[67px]
                  border
                  border-[#F2D08C]
                  cursor-pointer
                  bg-transparent
                  rounded-[10px]
                  text-[#F2D08C]
                  text-[16px]
                  sm:text-[18px]
                  hover:bg-[#F2D08C]/10
                  transition-colors
              "
            >
              Let's go
            </Button>
          ) : (
            <>
              <Button
                onClick={onUpgrade}
                style={{
                  fontFamily: "var(--font-arp80)",
                  fontWeight: 400,
                  lineHeight: "33px",
                }}
                className="
                  w-full
                  h-[67px]
                  bg-[#F2D08C]
                  text-black
                  rounded-[10px]
                  text-[16px]
                  sm:text-[18px]
                  cursor-pointer
                  hover:bg-[#F2D08CC0]
                  transition-colors
                  mb-4
                "
              >
                ✨ Unlock for $9.99 / month
              </Button>

              <Button
                onClick={onClose}
                style={{
                  fontFamily: "var(--font-arp80)",
                  lineHeight: "33px",
                }}
                className="
                  w-full
                  h-[67px]
                  border
                  border-[#F2D08C]
                  cursor-pointer
                  bg-transparent
                  rounded-[10px]
                  text-[#F2D08C]
                  text-[16px]
                  sm:text-[18px]
                  hover:bg-[#F2D08C]/10
                  transition-colors
                "
              >
                Maybe later
              </Button>
            </>
          )}
        </div>

        <div className="mt-auto pb-10" />
      </div>
    </div>
  );
}
