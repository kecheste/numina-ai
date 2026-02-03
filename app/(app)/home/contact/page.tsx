"use client";

import { useState } from "react";
import PageLoader from "@/components/custom/loader";
import { ContactSupport } from "@/components/pages/contact";

export default function ContactPage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <ContactSupport />
      </div>
    </PageLoader>
  );
}
