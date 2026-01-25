"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

interface DOBScreenProps {
  onContinue: (dob: string) => void;
  onBack: () => void;
}

export function DOBScreen({ onContinue }: DOBScreenProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const handleContinue = () => {
    if (month && day && year) {
      const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      onContinue(dob);
    }
  };

  const isComplete = month && day && year;

  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 min-h-screen">
      <div
        className="
          w-full
          h-screen
          sm:h-auto
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          border
          border-[#1f1f1f]
          px-[32px]
          sm:px-[54px]
          py-10
          flex
          flex-col
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-bold text-white text-center mb-2"
        >
          Lets begin your self-discovery.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[15px] font-light text-white text-center opacity-[0.9] mb-10"
        >
          We’ll use your birth data and responses to create your personalized
          Soul Map powered by AI, astrology, psychology, and numerology.
        </p>

        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="text-[21px] text-[#F2D08C] text-center mb-4"
        >
          Date of Birth
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <SelectLikeInput label="Year" value={year} onChange={setYear} />
          <SelectLikeInput label="Month" value={month} onChange={setMonth} />
          <SelectLikeInput label="Day" value={day} onChange={setDay} />
          <SelectLikeInput label="Time" />
          <SelectLikeInput label="Place of Birth" />
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            disabled={!isComplete}
            onClick={handleContinue}
            className="
              cursor-pointer
              mt-8
              hover:bg-[#F2D08CC0]
              w-full
              h-[67px]
              bg-[#F2D08CE0]
              text-black
              rounded-[10px]
              text-[21px]
              transition-colors
            "
          >
            Next Step
          </Button>

          {/* Footer text */}
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: 325,
              lineHeight: "14px",
            }}
            className="mt-6 text-[10px] text-white text-center opacity-[0.9]"
          >
            This information helps us calculate your astrological and energetic
            profile. If you’re unsure of your exact birth time, choose “I don’t
            know”. We’ll still give you accurate insights based on date and
            place.
          </p>
        </div>
      </div>
    </div>
  );
}

function SelectLikeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={label}
        className="
          w-full
          bg-black
          border
          border-[#F2D08CE0]
          rounded-[14px]
          text-center
          px-4
          py-4
          text-[15px]
          text-white
          placeholder:text-[#9ca3af]
          focus:outline-none
          font-light
        "
        style={{
          fontFamily: "var(--font-gotham)",
          fontWeight: 300,
          lineHeight: "22px",
        }}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        <Icon
          icon="teenyicons:down-outline"
          color="#F2D08C66"
          width={17}
          height={17}
        />
      </span>
    </div>
  );
}
