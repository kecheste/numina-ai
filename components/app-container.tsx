"use client";

import { useRef, useState } from "react";
import { BottomNavigation } from "./navigation/bottom-navigation";
import { AppDrawer } from "./navigation/app-drawer";
import { MySoulPage } from "./pages/my-soul-page";
import { ExplorePage } from "./pages/explore-page";
import { SynthesisPage } from "./pages/synthesis-page";
import { SubscriptionModal } from "./modals/subscription-modal";
import Image from "next/image";

type TabType = "soul" | "explore" | "synthesis";

interface AppContainerProps {
  userProfile?: {
    isPremium: boolean;
    email: string;
    name: string;
    dateOfBirth: string;
  } | null;
}

export function AppContainer({ userProfile }: AppContainerProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("soul");
  const [isPremium, setIsPremium] = useState(userProfile?.isPremium || false);
  const [showSubscription, setShowSubscription] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 h-screen overflow-hidden">
      {/* Mobile device frame */}
      <div
        ref={shellRef}
        className="
          relative
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
          px-[28px]
        "
      >
        {/* Status bar */}
        <div className="bg-black w-full flex justify-between items-center text-xs text-gray-400 py-[12px] z-40 absolute top-0 left-0 right-0 px-[28px] sm:px-[34px]">
          <div></div>
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
          <AppDrawer
            isPremium={isPremium}
            portalContainer={shellRef}
            onLogout={() => {}}
          />
        </div>

        {/* Page content */}
        <div className="flex-1 relative overflow-y-auto custom-scroll">
          {activeTab === "soul" && <MySoulPage isPremium={isPremium} />}
          {activeTab === "explore" && <ExplorePage isPremium={isPremium} />}
          {activeTab === "synthesis" && <SynthesisPage isPremium={isPremium} />}
        </div>

        {/* Bottom navigation INSIDE container */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isPremium={isPremium}
          onUpgrade={() => setShowSubscription(true)}
        />
      </div>

      {/* Subscription Modal */}
      {showSubscription && (
        <SubscriptionModal
          onClose={() => setShowSubscription(false)}
          onUpgrade={() => {
            setIsPremium(true);
            setShowSubscription(false);
          }}
        />
      )}
    </div>
  );
}
