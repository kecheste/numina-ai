"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

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
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black border border-[#1f1f1f] px-[54px] py-10 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Headline */}
        <h1 className="text-[21px] h-[57px] font-[600] text-white text-center mb-2">
          Lets begin your self-discovery.
        </h1>

        <p className="text-[15px] text-[#9ca3af] text-center leading-[1.6] mb-10">
          We’ll use your birth data and responses to create your personalized
          Soul Map — powered by AI, astrology, psychology, and numerology.
        </p>

        {/* Section title */}
        <h2 className="text-[21px] text-[#F2D08C] text-center font-[400] mb-2">
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
        <Button
          disabled={!isComplete}
          onClick={handleContinue}
          className="cursor-pointer mt-[39px] hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
        >
          Next Step
        </Button>

        {/* Footer text */}
        <p className="mt-[55px] text-[10px] font-[100] text-[#FFFFFF] text-center leading-[1.6]">
          This information helps us calculate your astrological and energetic
          profile. If you’re unsure of your exact birth time, choose “I don’t
          know” — we’ll still give you accurate insights based on date and
          place.
        </p>
      </div>
    </div>
  );
}

/* ---------- Helper Input ---------- */

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
          px-4
          py-4
          text-[14px]
          text-white
          placeholder:text-[#9ca3af]
          focus:outline-none
        "
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F2D08CE0]">
        ▾
      </span>
    </div>
  );
}
