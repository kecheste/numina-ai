"use client";

import { TestFlow } from "@/components/test/test-flow";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  return (
    <TestFlow
      testId={1}
      testTitle="Cosmic Alignment"
      category="Astrology"
      onClose={() => router.push("home")}
    />
  );
}
