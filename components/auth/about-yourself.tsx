"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";

interface AboutYourselfProps {
  onContinue: (data: {
    name: string;
    email?: string;
    password?: string;
  }) => void;
  registrationMode?: boolean;
  error?: string | null;
}

export default function AboutYourself({
  onContinue,
  registrationMode = false,
  error,
}: AboutYourselfProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isComplete = registrationMode
    ? name.trim().length > 0 && email.trim().length > 0 && password.length >= 8
    : name.trim().length > 0;

  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 h-screen overflow-hidden">
      <div
        className="
          w-full
          h-screen
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-y-auto
          sm:overflow-hidden
          flex
          flex-col
          items-center
          text-center
          px-[37px]
          pb-12
          pt-4
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <NuminaLogoIcon />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center mt-auto">
          <h1
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "33px",
            }}
            className="text-[18px] font-bold text-white mb-3"
          >
            About yourself
          </h1>

          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] font-light text-[#9ca3af] max-w-[320px]"
          >
            {registrationMode
              ? "Enter your name, email, and password to create your account."
              : "Enter your name to personalize your experience. Email is optional but enter it if you want to save your results or revisit them later."}
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 mt-2 max-w-[320px]">{error}</p>
        )}

        {/* Inputs */}
        <div className="mt-10 space-y-4">
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

        {/* CTA */}
        <div className="mb-auto pt-10 w-full">
          <Button
            disabled={!isComplete}
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            onClick={() => onContinue({ name, email, password })}
            className="
              w-full
              h-[60px]
              sm:h-[67px]
              bg-[#F2D08CE0]
              hover:bg-[#F2D08CC0]
              cursor-pointer
              text-black
              rounded-[10px]
              text-[18px]
              sm:text-[21px]
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Reveal My Path
          </Button>
        </div>
      </div>
    </div>
  );
}

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
        rounded-[10px]
        px-4
        py-4
        text-[15px]
        text-white
        placeholder:text-[#9ca3af]
        focus:outline-none
        text-center
        font-light
      "
      style={{
        fontFamily: "var(--font-gotham)",
        fontWeight: 300,
        lineHeight: "22px",
      }}
    />
  );
}
