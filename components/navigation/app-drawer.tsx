"use client";

import {
  X,
  History,
  Sparkles,
  Crown,
  HelpCircle,
  Mail,
  FileText,
  Shield,
  LogOut,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
} from "@/components/ui/drawer";
import { RefObject } from "react";
import { Icon } from "@iconify/react";

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

  const menuItems = [
    { icon: History, label: "My Tests" },
    { icon: Sparkles, label: "My Synthesis" },
    { icon: Crown, label: "Manage Subscription" },
    { icon: HelpCircle, label: "Help / FAQ" },
    { icon: Mail, label: "Contact Support" },
    { icon: FileText, label: "Terms & Conditions" },
    { icon: Shield, label: "Privacy Policy" },
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
        <DrawerContent
          className="
            fixed
            top-0
            right-0
            h-full
            w-[320px]
            max-w-[85%]
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
                        flex items-center gap-4
                        pb-3
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
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-gotham)",
                          lineHeight: "47px",
                        }}
                        className="text-[16px]  font-medium text-black"
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
                    lineHeight: "47px",
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
