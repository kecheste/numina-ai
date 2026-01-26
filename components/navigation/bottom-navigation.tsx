"use client";

import { SparkleIcon } from "../icons/sparkle-icon";
import { ExploreIcon } from "../icons/explore-icon";
import { SynthesisIcon } from "../icons/synthesis-icon";

interface BottomNavigationProps {
  activeTab: "soul" | "explore" | "synthesis";
  onTabChange: (tab: "soul" | "explore" | "synthesis") => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

const ACTIVE_COLOR = "#F2D08C";
const INACTIVE_COLOR = "#D9D9D999";

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const navItems = [
    { id: "soul", label: "My Soul", Icon: SparkleIcon },
    { id: "explore", label: "Explore", Icon: ExploreIcon },
    { id: "synthesis", label: "Synthesis", Icon: SynthesisIcon },
  ] as const;

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/95 border-t border-[#D9D9D999]/20 flex justify-around items-center z-40">
      {navItems.map(({ id, label, Icon }, index) => {
        const isActive = activeTab === id;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col cursor-pointer ${index !== navItems.length - 1 && " border-r border-[#D9D9D999]/20 "} items-center gap-1 py-2 transition-all duration-300 w-full`}
            style={{ color }}
          >
            <Icon className="w-5 h-5" color={color} />
            <span
              style={{
                fontFamily: "var(--font-gotham)",
              }}
              className="text-xs font-[100] pb-3"
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
