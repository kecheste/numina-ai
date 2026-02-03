"use client";

import { useClerk } from "@clerk/nextjs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { RefObject } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface AppDrawerProps {
  isPremium: boolean;
  onLogout: () => void;
  portalContainer: RefObject<HTMLDivElement | null>;
}

export function AppDrawer({
  isPremium,
  onLogout,
  portalContainer,
}: AppDrawerProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  const menuItems = [
    { label: "My Tests", href: "/home/tests" },
    { label: "My Synthesis", href: "/home/synthesis" },
    { label: "Manage Subscription", href: "/home/subscription" },
    { label: "Help / FAQ", href: "/home/faq" },
    { label: "Contact Support", href: "/home/contact" },
    { label: "Terms & Conditions", href: "/home/terms-and-conditions" },
    { label: "Privacy Policy", href: "/home/privacy-policy" },
  ];

  return (
    <Drawer direction="right">
      {/* Trigger */}
      <DrawerTrigger asChild>
        <button className="cursor-pointer mt-2">
          <Icon icon="material-symbols-light:menu" width={40} color="#ffffff" />
        </button>
      </DrawerTrigger>

      <DrawerPortal container={portalContainer.current}>
        <DrawerTitle></DrawerTitle>
        <DrawerContent
          className="
            fixed
            top-0
            right-0
            h-full
            w-[280px]
            max-w-[75%]
            bg-[#F2D08C]
            rounded-none
            z-50
            opacity-[0.9]
          "
        >
          <div className="flex flex-col h-full px-6 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <DrawerClose asChild>
                <button>
                  <Icon
                    icon={"material-symbols-light:close-rounded"}
                    width={40}
                    color="#000000"
                  />
                </button>
              </DrawerClose>
            </div>

            {/* Menu items */}
            <div className="flex flex-col items-end">
              {menuItems.map((item) => {
                return (
                  <DrawerClose asChild key={item.label}>
                    <button
                      className="
                        relative
                        flex items-center gap-2
                        after:content-['']
                        after:absolute
                        after:left-0
                        after:right-0
                        after:bottom-0
                        after:h-px
                        after:bg-gradient-to-r
                        after:from-[#A5A5A51A]
                        after:via-[#5E5E5E]
                        after:to-[#6868681A]
                      "
                      onClick={() => router.push(item.href)}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-gotham)",
                        }}
                        className="text-[16px] py-[8px] font-medium text-black"
                      >
                        {item.label}
                      </span>
                    </button>
                  </DrawerClose>
                );
              })}
            </div>

            {/* Logout */}
            <div className="flex flex-col items-end">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-4"
              >
                <span
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "42px",
                  }}
                  className="text-[16px] font-medium text-black"
                >
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
