"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";

interface SubscriptionModalProps {
  onUpgrade: () => void;
  onClose: () => void;
}

export function SubscriptionModal({
  onUpgrade,
  onClose,
}: SubscriptionModalProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleUnlockClick = () => {
    setShowPayment(true);
  };

  const handleSubscribe = () => {
    // Handle subscription logic here
    onUpgrade();
  };

  const handleBack = () => {
    setShowPayment(false);
  };

  // Payment Screen
  if (showPayment) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center bg-white">
        <div
          className="
            w-full
            min-h-screen
            sm:max-w-[450px]
            sm:aspect-[9/20]
            bg-black
            overflow-y-auto
            flex
            flex-col
            px-[21px]
          "
        >
          {/* Back Button */}
          {/* <button
            onClick={handleBack}
            className="absolute top-4 left-4 p-2 cursor-pointer"
          >
            <Icon icon="icons8:left-arrow" color="#D9D9D9" width={24} />
          </button> */}

          {/* Header */}
          <div className="text-center pt-4">
            <div className="flex justify-center mb-4">
              <NuminaLogoIcon />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[41px] font-[400] mb-3 text-white"
            >
              Monthly Plan
            </h1>
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[31px] font-[350] text-white mb-2"
            >
              $9.99/mnth
            </p>
            <p
              style={{
                fontFamily: "var(--font-gotham)",
              }}
              className="text-[18px] font-[300] text-[#FFFFFF] mt-1"
            >
              Auto-renews, cancel anytime
            </p>
          </div>

          {/* Payment Method Section */}
          <div className="mt-8 text-left">
            <h2
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[18px] font-[350] text-white mb-2"
            >
              Payment Method
            </h2>

            {/* Name on Card */}
            <input
              type="text"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              style={{ fontFamily: "var(--font-gotham)" }}
              className="w-full bg-transparent border border-[#9E9E9E] rounded-[10px] px-4 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 mb-3"
            />

            {/* Card Number, MM/YY, CVV Row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ fontFamily: "var(--font-gotham)" }}
                className="flex-1 bg-transparent border border-[#9E9E9E] rounded-[10px] px-4 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/60"
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                style={{ fontFamily: "var(--font-gotham)" }}
                className="w-[70px] bg-transparent border border-[#9E9E9E] rounded-[10px] px-3 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 text-center"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{ fontFamily: "var(--font-gotham)" }}
                className="w-[55px] bg-transparent border border-[#9E9E9E] rounded-[10px] px-3 py-3 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 text-center"
              />
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-white/30" />
            <span
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] text-white/60"
            >
              OR
            </span>
            <div className="flex-1 h-[1px] bg-white/30" />
          </div>

          {/* Payment Options Image */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4">
              <Image
                src="/payment-options.png"
                alt="Payment Options"
                width={280}
                height={120}
                className="object-contain w-full"
              />
            </div>
          </div>

          {/* Secure Payment Text */}
          <p
            style={{ fontFamily: "var(--font-gotham)" }}
            className="text-[12px] font-[300] text-[#FFFFFF] mt-4 text-left mb-2"
          >
            Secure encrypted payment
          </p>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            style={{
              fontFamily: "var(--font-arp80)",
              lineHeight: "33px",
            }}
            className="
              w-full
              h-[67px]
              border
              cursor-pointer
              bg-[#F2D08C]
              rounded-[10px]
              text-black
              text-[18px]
              sm:text-[18px]
              hover:bg-[#F2D08CC0]
              transition-colors
            "
          >
            Subscribe now
          </Button>

          <div className="mt-auto pb-6" />
        </div>
      </div>
    );
  }

  // Initial Unlock Screen
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

          <Button
            onClick={handleUnlockClick}
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
