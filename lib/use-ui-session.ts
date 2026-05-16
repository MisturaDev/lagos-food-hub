"use client";

import { useMemo, useSyncExternalStore } from "react";
import { PROFILE_KEY, getAccountName, getActiveRole, ProfileState } from "@/lib/ui-session";
import { Role } from "@/lib/ui";

const EMPTY_PROFILE: ProfileState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
};

function subscribe() {
  return () => {};
}

export function useAccountName() {
  return useSyncExternalStore(subscribe, getAccountName, () => "User");
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
