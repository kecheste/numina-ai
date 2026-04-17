import React from "react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "./app-drawer";
import { Icon } from "@iconify/react";
import { useShell } from "@/contexts/ShellContext";

interface AppBarProps {
  user?: any;
  handleLogout?: () => void;
  hideBackButton?: boolean;
  handleBack?: () => void;
}

function AppBar({
  user,
  handleLogout,
  hideBackButton,
  handleBack,
}: AppBarProps) {
  const { shellRef } = useShell();

  return (
    <div className="bg-black border-b w-full flex justify-between items-center text-xs text-gray-400 pb-4 z-40 relative px-[24px] shrink-0">
      {hideBackButton ? (
        <div className="w-[32px] h-[32px]"></div>
      ) : (
        <button onClick={handleBack} className="cursor-pointer w-[32px] h-[32px]">
          <Icon
            icon="icons8:left-arrow"
            color="#D9D9D9"
            width={30}
            className="mt-1.5"
          />
        </button>
      )}
      <NuminaLogoIcon />
      <AppDrawer
        isPremium={user?.is_premium ?? false}
        portalContainer={shellRef}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default AppBar;
