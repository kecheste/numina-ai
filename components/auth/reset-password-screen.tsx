"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";

interface ResetPasswordScreenProps {
  onSubmit: (newPassword: string) => void | Promise<void>;
  onBackToLogin: () => void;
  onRequestNewLink?: () => void;
  error?: string | null;
  isPending?: boolean;
  successMessage?: string | null;
  hasValidToken?: boolean;
}

export function ResetPasswordScreen({
  onSubmit,
  onBackToLogin,
  onRequestNewLink,
  error,
  isPending = false,
  successMessage,
  hasValidToken = true,
}: ResetPasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;
    void Promise.resolve(onSubmit(password));
  };

  const passwordsMatch = password === confirmPassword;
  const isComplete =
    password.length >= 8 && confirmPassword.length >= 8 && passwordsMatch;

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
        <div className="flex justify-center mb-8">
          <NuminaLogoIcon />
        </div>

        <div className="flex flex-col items-center text-center mt-auto">
          <h1
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "33px",
            }}
            className="text-[18px] font-bold text-white mb-3"
          >
            Set new password
          </h1>

          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] font-light text-[#9ca3af] max-w-[320px]"
          >
            Enter your new password below. Use at least 8 characters.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 mt-2 max-w-[320px]">{error}</p>
        )}

        {!hasValidToken ? (
          <div className="mt-10 w-full space-y-4">
            {error && (
              <p className="text-sm text-red-400 max-w-[320px]">{error}</p>
            )}
            <Button
              type="button"
              onClick={onRequestNewLink ?? onBackToLogin}
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
              Request new link
            </Button>
          </div>
        ) : successMessage ? (
          <div className="mt-10 w-full space-y-4">
            <p className="text-sm text-[#F2D08C]">{successMessage}</p>
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
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4 w-full">
            <GoldInput
              placeholder="New password"
              value={password}
              onChange={setPassword}
              type="password"
            />
            <GoldInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-sm text-red-400">Passwords do not match</p>
            )}

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
                  Reset password
                </Button>
              )}
            </div>
          </form>
        )}

        <div className="mb-auto pt-6 w-full text-center">
          <p
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "22px",
            }}
            className="text-[15px] font-light text-[#9ca3af]"
          >
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-[#F2D08C] hover:text-[#F2D08CC0 font-medium transition-colors"
            >
              Back to login
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
