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
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 21; // must be 21+

  const years = Array.from({ length: 100 }, (_, i) => `${minYear - i}`);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const times = ["I don’t know", "00:00", "06:00", "12:00", "18:00"];
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
  ];

  const handleContinue = () => {
    if (year && month && day) {
      const monthIndex = months.indexOf(month) + 1;
      const dob = `${year}-${String(monthIndex).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      onContinue(dob);
    }
  };

  const isComplete = year && month && day;

  return (
    <div className="flex items-center justify-center bg-white h-screen overflow-hidden">
      <div className="w-full h-screen sm:max-w-[450px] bg-black overflow-y-auto flex flex-col items-center text-center px-[32px] pb-12 sm:pb-[4px] pt-4">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[400] text-white mb-3"
        >
          Lets begin your self-discovery.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[15px] font-[300] text-white mb-3"
        >
          We’ll use your birth data to create your personalized Soul Map.
        </p>

        <h2
          style={{
            fontFamily: "var(--font-arp80)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[400] text-[#F2D08C] mb-4"
        >
          Date of Birth
        </h2>

        <div className="space-y-4 w-full mb-4">
          <Dropdown
            label="Year"
            value={year}
            onChange={setYear}
            options={years}
          />
          <Dropdown
            label="Month"
            value={month}
            onChange={setMonth}
            options={months}
          />
          <Dropdown label="Day" value={day} onChange={setDay} options={days} />
          <Dropdown
            label="Time"
            value={time}
            onChange={setTime}
            options={times}
          />
          <Dropdown
            label="Place of Birth"
            value={place}
            onChange={setPlace}
            options={countries}
          />
        </div>

        <div className="mt-auto w-full">
          <Button
            disabled={!isComplete}
            onClick={handleContinue}
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="
              cursor-pointer
              hover:bg-[#F2D08CC0]
              w-full
              h-[60px]
              sm:h-[67px]
              bg-[#F2D08CE0]
              text-black
              rounded-[10px]
              text-[18px]
              sm:text-[21px]
              transition-colors
            "
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "22px",
        }}
        onClick={() => setOpen(!open)}
        className="w-full bg-black border border-[#F2D08CE0] rounded-[10px] px-4 py-4 text-[15px] font-[300] text-white text-center flex justify-center items-center relative"
      >
        {value ?? label}
        <span className="absolute right-4">
          <Icon
            icon="teenyicons:down-outline"
            color="#F2D08C66"
            width={17}
            height={17}
          />
        </span>
      </button>

      {open && (
        <div
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="absolute left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-black border border-[#F2D08CE0] rounded-[14px] z-50"
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-3 text-white text-center hover:bg-[#F2D08C33] cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
