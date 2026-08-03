"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getHubStore,
  getHubStoreSnapshot,
  HUB_STORE_EVENT,
  type HubStore,
} from "@/lib/mock-store";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(HUB_STORE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(HUB_STORE_EVENT, callback);
  };
}

export function useHubStore(): HubStore {
  const snapshot = useSyncExternalStore(subscribe, getHubStoreSnapshot, () => getHubStoreSnapshot());

  return useMemo(() => {
    try {
      return JSON.parse(snapshot) as HubStore;
    } catch {
      return getHubStore();
    }
  }, [snapshot]);
}
