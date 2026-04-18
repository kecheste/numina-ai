"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";

interface ForgotPasswordScreenProps {
  onSubmit: (email: string) => void | Promise<void>;
  onBackToLogin: () => void;
  error?: string | null;
  isPending?: boolean;
  successMessage?: string | null;
}

export function ForgotPasswordScreen({
  onSubmit,
  onBackToLogin,
  error,
  isPending = false,
  successMessage,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending || !email.trim()) return;
    void Promise.resolve(onSubmit(email.trim()));
  };

  const isComplete = email.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full pt-4 pb-4 h-full justify-center">
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
            Forgot password
          </h1>

          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] font-light text-[#9ca3af] max-w-[320px]"
          >
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 mt-2 max-w-[320px]">{error}</p>
        )}

        {successMessage && (
          <p className="mt-2 max-w-[320px] text-sm text-[#F2D08C]">
            {successMessage}
          </p>
        )}

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4 w-full">
            <GoldInput
              placeholder="Your E-mail"
              value={email}
              onChange={setEmail}
              type="email"
            />

            <div className="pt-4 w-full">
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
                  type="submit"
                  disabled={!isComplete}
                  style={{
                    fontFamily: "var(--font-arp80)",
                    fontWeight: 400,
                    lineHeight: "33px",
                  }}
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
                  Send reset link
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-10 w-full">
            <Button
              type="button"
              onClick={onBackToLogin}
              style={{
                fontFamily: "var(--font-arp80)",
                fontWeight: 400,
                lineHeight: "33px",
              }}
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
            "
            >
              Back to login
            </Button>
          </div>
        )}

        <div className="pt-6 w-full text-center">
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] font-light text-[#9ca3af]"
          >
            Remember your password?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-[#F2D08C] hover:text-[#F2D08CC0 font-medium transition-colors"
            >
              Log in
            </button>
          </p>
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
