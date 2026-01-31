"use client";

import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import Image from "next/image";
import { useRef, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showSubscription, setShowSubscription] = useState(false);

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
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
          <AppDrawer
            isPremium={false}
            portalContainer={shellRef}
            onLogout={() => {}}
          />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto pt-19 w-full">
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
