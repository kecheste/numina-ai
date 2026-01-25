"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface AboutYourselfProps {
  onContinue: (data: {
    name: string;
    email?: string;
    password?: string;
  }) => void;
}

export default function AboutYourself({ onContinue }: AboutYourselfProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isComplete = name.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black border border-[#1f1f1f] px-[54px] py-10 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Title */}
        <h1 className="text-[18px] font-[600] text-white text-center mt-[110px] mb-3">
          About yourself
        </h1>

        {/* Description */}
        <p className="text-[15px] font-[300] text-[#9ca3af] text-center mb-10">
          Enter your name to personalize your experience. Email is optional —
          but enter it if you want to save your results or revisit them later.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <GoldInput placeholder="Your Name" value={name} onChange={setName} />
          <GoldInput
            placeholder="Your E-mail"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <GoldInput
            placeholder="Set Password"
            value={password}
            onChange={setPassword}
            type="password"
          />
        </div>

        {/* Button */}
        <Button
          disabled={!isComplete}
          onClick={() => onContinue({ name, email, password })}
          className="cursor-pointer mt-[39px] hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
        >
          Reveal My Path
        </Button>
      </div>
    </div>
  );
}

/* ---------- Gold Input ---------- */

function GoldInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
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
  );
}
