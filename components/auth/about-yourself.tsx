"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import {
  validateFullName,
  validateEmail,
  validatePassword,
} from "@/lib/validation";

interface AboutYourselfProps {
  onContinue: (data: {
    name: string;
    email?: string;
    password?: string;
  }) => void;
  registrationMode?: boolean;
  error?: string | null;
  isPending?: boolean;
}

export default function AboutYourself({
  onContinue,
  registrationMode = false,
  error,
  isPending = false,
}: AboutYourselfProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nameValidation = validateFullName(fullName);
  const emailValidation = registrationMode
    ? validateEmail(email)
    : { valid: true };
  const passwordValidation = registrationMode
    ? validatePassword(password)
    : { valid: true };

  const isFormValid =
    nameValidation.valid && emailValidation.valid && passwordValidation.valid;

  const showNameError =
    (touched.name || submitAttempted) && !nameValidation.valid;
  const showEmailError =
    (touched.email || submitAttempted) &&
    registrationMode &&
    !emailValidation.valid;
  const showPasswordError =
    (touched.password || submitAttempted) &&
    registrationMode &&
    !passwordValidation.valid;

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (
      !nameValidation.valid ||
      (registrationMode &&
        (!emailValidation.valid || !passwordValidation.valid))
    ) {
      return;
    }
    onContinue({
      name: fullName.trim(),
      ...(registrationMode ? { email: email.trim(), password } : {}),
    });
  };

  return (
    <div className="flex flex-col items-center w-full pt-4 pb-4 h-full">
      <div className="flex justify-center mb-8">
        <NuminaLogoIcon />
      </div>

      <div className="flex-1 flex flex-col justify-center w-full">
        <div className="flex flex-col items-center text-center">
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
              ? "Enter your full name (first and last), email, and password to create your account."
              : "Enter your full name to personalize your experience. Email is optional but enter it if you want to save your results or revisit them later."}
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 mt-2 max-w-[320px]">{error}</p>
        )}

        <div className="mt-10 space-y-4">
          <div>
            <GoldInput
              placeholder="Your Full Name (e.g. John Alex Doe)"
              value={fullName}
              onChange={(v) => {
                setFullName(v);
                setTouched((t) => ({ ...t, name: true }));
              }}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              ariaInvalid={showNameError}
            />
            {showNameError && (
              <p
                className="text-[13px] text-red-400 mt-1 text-center"
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
              >
                {nameValidation.message}
              </p>
            )}
          </div>
          {registrationMode && (
            <>
              <div>
                <GoldInput
                  placeholder="Your E-mail"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    setTouched((t) => ({ ...t, email: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  type="email"
                  ariaInvalid={showEmailError}
                />
                {showEmailError && (
                  <p
                    className="text-[13px] text-red-400 mt-1 text-center"
                    style={{
                      fontFamily: "var(--font-gotham)",
                    }}
                  >
                    {emailValidation.message}
                  </p>
                )}
              </div>
              <div>
                <GoldInput
                  placeholder="Set Password (min 8 characters)"
                  value={password}
                  onChange={(v) => {
                    setPassword(v);
                    setTouched((t) => ({ ...t, password: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  type="password"
                  ariaInvalid={showPasswordError}
                />
                {showPasswordError && (
                  <p
                    className="text-[13px] text-red-400 mt-1 text-center"
                    style={{
                      fontFamily: "var(--font-gotham)",
                    }}
                  >
                    {passwordValidation.message}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="pt-10 w-full text-center">
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
              disabled={
                !fullName.trim() ||
                (registrationMode && (!email.trim() || password.length < 8))
              }
              style={{
                fontFamily: "var(--font-arp80)",
                fontWeight: 400,
                lineHeight: "33px",
              }}
              onClick={handleSubmit}
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
          )}
        </div>
      </div>
    </div>
  );
}

function GoldInput({
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  ariaInvalid,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  ariaInvalid?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
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
