"use client";

import { useState } from "react";
import PageLoader from "@/components/custom/loader";
import { PrivacyPolicy } from "@/components/pages/privacy-policy";

export default function PrivacyPage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <PrivacyPolicy />
      </div>
    </PageLoader>
  );
}
