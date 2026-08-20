"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ACCOUNT_NAME_KEY, PROFILE_KEY, ProfileState, getDisplayFirstName, getActiveRole } from "@/lib/ui-session";
import { Role } from "@/lib/ui";

const EMPTY_PROFILE: ProfileState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
};

// Dispatch a custom storage event so same-tab listeners are notified.
// Call this wherever you write to localStorage (setActiveRole, setAccountName, setProfile).
export function notifySessionChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("lfh-session-change"));
  }
}

function subscribe(callback: () => void) {
  // Listen for cross-tab storage events and same-tab custom events.
  window.addEventListener("storage", callback);
  window.addEventListener("lfh-session-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lfh-session-change", callback);
  };
}

function getSessionFlag() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ACCOUNT_NAME_KEY) ?? "";
}

export function useAccountName() {
  return useSyncExternalStore(subscribe, getDisplayFirstName, () => "User");
}

export function useActiveRole() {
  return useSyncExternalStore(subscribe, getActiveRole, () => null as Role | null);
}

export function useProfile() {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return "";
      return localStorage.getItem(PROFILE_KEY) ?? "";
    },
    () => "",
  );

  return useMemo(() => {
    if (!raw) return EMPTY_PROFILE;
    try {
      const parsed = JSON.parse(raw) as Partial<ProfileState>;
      return {
        fullName: parsed.fullName ?? "",
        email: parsed.email ?? "",
        phone: parsed.phone ?? "",
        location: parsed.location ?? "",
        bio: parsed.bio ?? "",
      };
    } catch {
      return EMPTY_PROFILE;
    }
  }, [raw]);
}

// Session exists when an account key is stored — independent of display greeting.
export function useIsLoggedIn() {
  const session = useSyncExternalStore(subscribe, getSessionFlag, () => "");
  return session !== "";
}
