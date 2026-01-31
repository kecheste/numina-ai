"use client";

import { useRouter } from "next/navigation";
import { RootChakraIcon } from "../icons/mysoul/chakra";
import { InfjIcon } from "../icons/mysoul/infj";
import { LifePathIcon } from "../icons/mysoul/lifepath";
import { ScorpioIcon } from "../icons/zodiac/scorpio";

export function SoulRevealScreen() {
  const router = useRouter();

  return (
    <div className="bg-black text-white pr-1 pb-24 space-y-6">
      {/* Progress */}
      <div className="mb-4 w-full relative">
        <div className="h-[15px] w-full rounded-full bg-transparent border border-[#F2D08C]/50 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "20.5%", backgroundColor: "#282828" }}
          />
        </div>

        <p className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px] font-[400] z-10 pointer-events-none">
          2/16
        </p>
      </div>

      {/* Identity */}
      <div className="text-center space-y-2">
        <h1 className="text-[21px] font-[700] text-center">
          NIKOLOZ – SCORPIO
        </h1>

        <div className="flex items-center gap-[11px]">
          <div className="h-[72px] w-[72px] p-2 border border-[#FFFFFF]/50 rounded-[7px]">
            <ScorpioIcon />
          </div>
          <div
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: 350,
            }}
            className="border border-[#FFFFFF]/50 rounded-[7px] p-3 h-[72px] text-[15px] text-[#F2D08C]"
          >
            A grounded intuitive with cosmic insights
          </div>
        </div>
      </div>

      {/* Trinity Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-3 py-2.5">
          <RootChakraIcon />
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: "325",
              lineHeight: "17px",
            }}
            className="text-[13px] text-[#ffffff] font-book"
          >
            Root Chakra Srtong
          </p>
        </div>
        <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-3 py-2.5">
          <InfjIcon />
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: "325",
              lineHeight: "17px",
            }}
            className="text-[13px] text-[#ffffff] font-book"
          >
            INFJ The advocate
          </p>
        </div>
        <div className="max-w-[115px] h-[135px] border border-[#ffffff]/50 rounded-[10px] flex flex-col items-center justify-between px-3 py-2.5">
          <LifePathIcon />
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: "325",
              lineHeight: "17px",
            }}
            className="text-[13px] text-[#ffffff] font-book"
          >
            Life <br /> Path
          </p>
        </div>
      </div>

      {/* Most Sure Things */}
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

        <div className="flex flex-wrap gap-[6px] justify-center">
          {[
            "Goals-oriented and disciplined",
            "Connected to the earth",
            "Deeply empathetic",
            "You are a Visionary Empath",
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: "325",
              }}
              className="p-1 rounded-[7px] border border-[#F2D08C]/40 text-[13px] text-[#F2D08C]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
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

      {/* Daily Message */}
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
          Nikoloz – Today
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
          Today is touched by the Solstice’s lingering energy — a turning point
          of light and inner clarity. Scorpio's deep waters flow steadily under
          this brightness, inviting reflection without isolation. You might feel
          a quiet pull to observe more than act.
        </p>
      </div>
      <p className="text-xs italic text-[#F2D08C] text-center">
        “Your silence speaks in sacred language.”
      </p>
    </div>
  );
}
