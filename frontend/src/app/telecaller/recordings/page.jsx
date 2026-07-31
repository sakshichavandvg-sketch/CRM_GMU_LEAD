"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The /telecaller/recordings route has been removed from the navigation.
 * Any user who reaches this URL (e.g. via bookmark) is transparently
 * redirected to the Calls page.
 */
export default function RecordingsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/telecaller/calls");
  }, [router]);

  return null;
}
