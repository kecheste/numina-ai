"use client";

import { useEffect, useRef, useState } from "react";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import AppBar from "@/components/navigation/appBar";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useShell } from "@/contexts/ShellContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth();
  const { setScrollable, showSubscription, setShowSubscription } = useShell();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollable(false);
    return () => setScrollable(true);
  }, [setScrollable]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/welcome");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.replace("/welcome");
  };

  const handleSynthesisClick = () => {
    if (user?.is_premium) {
      router.push("/home/synthesis");
    } else {
      setShowSubscription(true);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div style={{ fontFamily: "var(--font-gotham)" }} className="flex flex-col h-full w-full relative pt-2 pb-4">
        <AppBar user={user} handleLogout={handleLogout} hideBackButton />

        <div ref={scrollRef} className="flex-1 overflow-y-auto w-full">
          <div className="py-4">{children}</div>
        </div>

        <div className="w-full shrink-0">
          <BottomNavigation
            isPremium={!!user?.is_premium}
            onSynthesisClick={handleSynthesisClick}
          />
        </div>
      </div>

      {showSubscription && (
        <SubscriptionModal
          onClose={() => setShowSubscription(false)}
          onUpgrade={() => {
            setShowSubscription(false);
            refreshUser().then(() => {
              router.refresh();
            });
          }}
        />
      )}
    </>
  );
}
