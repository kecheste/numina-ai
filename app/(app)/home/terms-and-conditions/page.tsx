"use client";

import { useState } from "react";
import PageLoader from "@/components/custom/loader";
import { TermsAndConditions } from "@/components/pages/terms-conditions";

export default function TermsPage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <TermsAndConditions />
      </div>
    </PageLoader>
  );
}
