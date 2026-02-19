"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { searchLocations } from "@/lib/constants/locations";
import type { BirthData } from "@/lib/birth-data";

interface DOBScreenProps {
  onContinue: (data: BirthData) => void;
  onBack: () => void;
  isPending?: boolean;
}

export function DOBScreen({ onContinue, isPending = false }: DOBScreenProps) {
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");

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

  const handleContinue = () => {
    if (isPending || !year || !month || !day) return;
    const monthIndex = months.indexOf(month) + 1;
    const dateOfBirth = `${year}-${String(monthIndex).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    onContinue({
      dateOfBirth,
      birthYear: year,
      birthMonth: String(monthIndex),
      birthDay: day,
      birthTime: time,
      birthPlace: place,
    });
  };

  const isComplete = year && month && day;

  return (
    <div className="flex items-center justify-center bg-white h-screen overflow-hidden">
      <div className="w-full h-screen sm:max-w-[450px] bg-black overflow-y-auto flex flex-col items-center text-center px-[32px] pb-12 sm:pb-[4px] pt-4">
        <div className="flex justify-center mb-8">
          <NuminaLogoIcon />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[400] text-white mb-3"
        >
          Let's begin your self-discovery.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[15px] font-[300] text-white mb-3"
        >
          We'll use your birth data to create your personalized Soul Map.
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
          <TextInput
            label="Time of Birth"
            placeholder="00:00 or I don't know"
            value={time}
            onChange={setTime}
          />
          <PlaceAutocomplete
            label="Place of Birth"
            placeholder="Start typing a city..."
            value={place}
            onChange={setPlace}
          />
        </div>

        <div className="mt-auto w-full">
          {isPending ? (
            <div
              className="
                w-full
                h-[60px]
                sm:h-[67px]
                rounded-[10px]
                flex items-center justify-center
                bg-[#F2D08CE0]
              "
            >
              <div
                className="h-8 w-8 rounded-full border-2 border-black/20 border-t-black animate-spin"
                aria-hidden
              />
            </div>
          ) : (
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
          )}
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

function TextInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "22px",
        }}
        className="w-full bg-black border border-[#F2D08CE0] rounded-[10px] px-4 py-4 text-[15px] font-[300] text-white text-center placeholder:text-white/50 focus:outline-none focus:border-[#F2D08C]"
      />
    </div>
  );
}

function PlaceAutocomplete({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);

    if (inputValue.length >= 2) {
      const results = searchLocations(inputValue, 8);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (location: string) => {
    onChange(location);
    setIsOpen(false);
    setSuggestions([]);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder || label}
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="w-full bg-black border border-[#F2D08CE0] rounded-[10px] px-4 py-4 pr-10 text-[15px] font-[300] text-white text-center placeholder:text-white/50 focus:outline-none focus:border-[#F2D08C]"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="absolute left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-black border border-[#F2D08CE0] rounded-[14px] z-50"
        >
          {suggestions.map((location, index) => (
            <div
              key={`${location}-${index}`}
              onClick={() => handleSelect(location)}
              className="px-4 py-3 text-white text-center hover:bg-[#F2D08C33] cursor-pointer text-[14px]"
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
