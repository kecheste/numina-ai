"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home/soul");
  }, [router]);

  return null;
}
