export const DONATION_DRAFT_KEY = "lfh_donation_draft";
export const REQUEST_DRAFT_KEY = "lfh_request_draft";

export type DonationDraft = {
  foodType: string;
  quantity: string;
  pickupWindow: string;
  location: string;
  contact: string;
};

export type RequestDraft = {
  householdSize: string;
  urgency: string;
  dietaryNotes: string;
  pickupArea: string;
};

function readDraft<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getDonationDraft() {
  return readDraft<DonationDraft>(DONATION_DRAFT_KEY);
}

export function saveDonationDraft(draft: DonationDraft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DONATION_DRAFT_KEY, JSON.stringify(draft));
}

export function clearDonationDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DONATION_DRAFT_KEY);
}

export function getRequestDraft() {
  return readDraft<RequestDraft>(REQUEST_DRAFT_KEY);
}

export function saveRequestDraft(draft: RequestDraft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REQUEST_DRAFT_KEY, JSON.stringify(draft));
}

export function clearRequestDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REQUEST_DRAFT_KEY);
}
