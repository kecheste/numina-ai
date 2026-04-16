"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { apiCreateCheckoutSession } from "@/lib/api-client";
import { BlackSparkleIcon } from "../icons/sparclesIcon";

interface SubscriptionModalProps {
  onUpgrade: () => void;
  onClose: () => void;
}

export function SubscriptionModal({
  onUpgrade,
  onClose,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlockClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const { url } = await apiCreateCheckoutSession();
      if (url) {
        onUpgrade();
        window.location.href = url;
        return;
      }
      setError("Could not start checkout. Please try again.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
              lineHeight: "28px",
            }}
            className="text-[18px] text-white font-light mb-10"
          >
            Access all personality tests,
            <br />
            spiritual insights & life guidance —
            <br />
            continuously evolving with you.
          </p>

          {error && (
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-sm text-red-400 mb-3 max-w-[320px]"
            >
              {error}
            </p>
          )}

          <Button
            onClick={handleUnlockClick}
            disabled={loading}
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
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                Redirecting to secure payment…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <BlackSparkleIcon /> Unlock for $9.99 / month
              </span>
            )}
          </Button>

          <Button
            onClick={onClose}
            disabled={loading}
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
              disabled:opacity-50
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
