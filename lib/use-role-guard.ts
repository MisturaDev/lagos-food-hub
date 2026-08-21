"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/ui";
import { useActiveRole, useIsLoggedIn } from "@/lib/use-ui-session";

/**
 * Requires login and an allowed active role.
 * Admins can access every workspace.
 */
export function useRoleGuard(allowed: Role | Role[]) {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const activeRole = useActiveRole();
  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];
  const isAllowed = Boolean(activeRole && (activeRole === "admin" || allowedRoles.includes(activeRole)));

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (!isAllowed) {
      router.replace("/dashboard");
    }
  }, [isAllowed, isLoggedIn, router]);

  return isLoggedIn && isAllowed;
}
