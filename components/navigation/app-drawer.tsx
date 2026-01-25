"use client";

import {
  Menu,
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
    { icon: HelpCircle, label: "Help & FAQ" },
    { icon: Mail, label: "Contact Support" },
    { icon: FileText, label: "Terms & Conditions" },
    { icon: Shield, label: "Privacy Policy" },
  ];

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button className="cursor-pointer mt-2">
          <Menu size={34} className="text-white" />
        </button>
      </DrawerTrigger>

      <DrawerPortal container={portalContainer.current}>
        <DrawerContent
          className="
          fixed
          left-0
          top-0
          h-full
          w-[320px]
          max-w-[80%]
          bg-black
          border-r
          border-gray-800
          rounded-none
          z-50
        "
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-primary">Menu</h2>
              <DrawerClose asChild>
                <button className="p-2 rounded-lg hover:bg-gray-900">
                  <X size={20} className="text-white" />
                </button>
              </DrawerClose>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DrawerClose asChild key={item.label}>
                    <button className="w-full px-6 py-3 flex items-center gap-4 text-left hover:bg-gray-900/60">
                      <Icon size={20} className="text-primary" />
                      <span className="text-sm text-white">{item.label}</span>
                    </button>
                  </DrawerClose>
                );
              })}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-800 p-4">
              <button
                onClick={() => signOut()}
                className="w-full px-4 py-3 flex items-center gap-3 rounded-lg bg-gray-900/60 hover:bg-gray-900"
              >
                <LogOut size={18} className="text-red-400" />
                <span className="text-sm text-red-400 font-medium">
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
