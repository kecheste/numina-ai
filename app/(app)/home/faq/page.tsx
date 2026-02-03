"use client";

import { useState } from "react";
import PageLoader from "@/components/custom/loader";
import { FrequentlyAskedQuestions } from "@/components/pages/faqs";

export default function FAQPage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <FrequentlyAskedQuestions />
      </div>
    </PageLoader>
  );
}
