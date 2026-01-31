"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SparkleIcon } from "../icons/sparkle-icon";
import { ExploreIcon } from "../icons/explore-icon";
import { SynthesisIcon } from "../icons/synthesis-icon";

const ACTIVE_COLOR = "#F2D08C";
const INACTIVE_COLOR = "#D9D9D999";

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { id: "soul", label: "My Soul", Icon: SparkleIcon, href: "/home/soul" },
    {
      id: "explore",
      label: "Explore",
      Icon: ExploreIcon,
      href: "/home/explore",
    },
    {
      id: "synthesis",
      label: "Synthesis",
      Icon: SynthesisIcon,
      href: "/home/synthesis",
    },
  ] as const;

  const getActiveTab = () => {
    if (pathname === "/home" || pathname.startsWith("/home/soul")) {
      return "soul";
    }
    if (pathname.startsWith("/home/explore")) {
      return "explore";
    }
    if (pathname.startsWith("/home/synthesis")) {
      return "synthesis";
    }
    return null;
  };

  const activeTab = getActiveTab();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/95 border-t border-[#D9D9D999]/20 flex justify-around items-center z-40">
      {navItems.map(({ id, label, Icon, href }, index) => {
        const isActive = activeTab === id;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <Link
            key={id}
            href={href}
            className={`flex flex-col cursor-pointer ${
              index !== navItems.length - 1
                ? "border-r border-[#D9D9D999]/20"
                : ""
            } items-center gap-1 py-2 transition-all duration-300 w-full`}
            style={{ color }}
          >
            <Icon className="w-5 h-5" color={color} />
            <span
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-xs font-[100]"
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
