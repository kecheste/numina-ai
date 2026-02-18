"use client";

import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const shellRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showSubscription, setShowSubscription] = useState(false);

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

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 min-h-[100dvh]">
      <div
        ref={shellRef}
        className="
          relative
          w-full
          h-[100dvh]
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          flex
          flex-col
          items-center
          text-center
          overflow-hidden
        "
      >
        <div className="bg-black border-b w-full flex justify-between items-center text-xs text-gray-400 pb-2 z-40 absolute top-0 left-0 right-0 px-[24px]">
          <div />
          <NuminaLogoIcon />
          <AppDrawer
            isPremium={user?.is_premium ?? false}
            portalContainer={shellRef}
            onLogout={handleLogout}
          />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto pt-18 w-full">
          {children}
        </div>

        <BottomNavigation />
      </div>

      {showSubscription && (
        <SubscriptionModal
          onClose={() => setShowSubscription(false)}
          onUpgrade={() => setShowSubscription(false)}
        />
      )}
    </div>
  );
}
