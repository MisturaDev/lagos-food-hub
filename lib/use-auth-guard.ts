"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/lib/use-ui-session";

/**
 * Redirects to /login when no session exists.
 * Use at the top of any page component that requires authentication.
 *
 * @returns isLoggedIn — falsy while redirecting, truthy once confirmed.
 *
 * Usage:
 *   const isLoggedIn = useAuthGuard();
 *   if (!isLoggedIn) return null; // render nothing while redirecting
 */
export function useAuthGuard() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return isLoggedIn;
}
