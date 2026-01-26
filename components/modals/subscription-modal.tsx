"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface SubscriptionModalProps {
  onUpgrade: () => void;
  onClose: () => void;
}

export function SubscriptionModal({
  onUpgrade: onUnlock,
  onClose,
}: SubscriptionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div
        className="
          w-full
          min-h-screen
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black/90
          overflow-y-auto
          flex
          flex-col
          px-[21px]
        "
      >
        <div className="mt-auto text-center flex flex-col items-center">
          <Icon icon={"mdi:star"} color="#F2D08C" width={50} height={46} />
          <h1
            style={{
              fontFamily: "var(--font-fangsong)",
              lineHeight: "100%",
            }}
            className="text-[43px] text-[#F2D08C] mb-6 mt-[30px]"
          >
            Unlock the full
            <br />
            map of your soul.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] text-white opacity-80 mb-10"
          >
            Access all personality tests,
            <br />
            spiritual insights & life guidance —
            <br />
            continuously evolving with you.
          </p>

          <Button
            onClick={onUnlock}
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
        </div>

        <div className="mt-auto pb-10" />
      </div>
    </div>
  );
}
