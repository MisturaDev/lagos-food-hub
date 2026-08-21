export type DonationStatus = "pending" | "approved" | "matched" | "rejected" | "completed" | "cancelled";
export type RequestStatus = "pending" | "approved" | "matched" | "rejected" | "fulfilled" | "cancelled";
export type TaskStatus = "available" | "in_progress" | "completed";
export type MatchStatus = "Ready" | "Needs volunteer" | "Scheduled" | "Completed";
export type Urgency = "High" | "Medium" | "Low";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type NotificationTone = "neutral" | "success" | "warning";

export type Donation = {
  id: string;
  foodType: string;
  quantity: string;
  pickupWindow: string;
  location: string;
  contact: string;
  status: DonationStatus;
  donorName: string;
  createdAt: string;
};

export type SupportRequest = {
  id: string;
  householdSize: string;
  urgency: Urgency;
  dietaryNotes: string;
  pickupArea: string;
  status: RequestStatus;
  beneficiaryName: string;
  createdAt: string;
};

export type VolunteerTask = {
  id: string;
  title: string;
  area: string;
  quantity: string;
  status: TaskStatus;
  matchId?: string;
  createdAt: string;
};

export type FoodMatch = {
  id: string;
  donor: string;
  food: string;
  quantity: string;
  area: string;
  pickupWindow: string;
  beneficiary: string;
  urgency: Urgency;
  status: MatchStatus;
  route: string;
  donationId?: string;
  requestId?: string;
};

export type ApprovalItem = {
  id: string;
  kind: "donation" | "request";
  title: string;
  detail: string;
  relatedId: string;
  status: ApprovalStatus;
  createdAt: string;
};

export type HubNotification = {
  id: string;
  title: string;
  time: string;
  tone: NotificationTone;
  read: boolean;
};

export type HubStore = {
  donations: Donation[];
  requests: SupportRequest[];
  tasks: VolunteerTask[];
  matches: FoodMatch[];
  approvals: ApprovalItem[];
  notifications: HubNotification[];
};

export const HUB_STORE_KEY = "lfh_hub_store";
export const HUB_STORE_EVENT = "lfh-hub-store-change";

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function relativeTimeLabel() {
  return "Just now";
}

const seedStore: HubStore = {
  donations: [
    {
      id: "DON-1001",
      foodType: "Cooked jollof rice packs",
      quantity: "120 meals",
      pickupWindow: "Today, 4:00 PM - 6:00 PM",
      location: "Surulere, near National Stadium",
      contact: "+234 801 000 1001",
      status: "approved",
      donorName: "Mainland Kitchen",
      createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
      id: "DON-1002",
      foodType: "Fresh produce baskets",
      quantity: "35 baskets",
      pickupWindow: "Tomorrow, 9:00 AM - 11:00 AM",
      location: "Yaba Market Gate",
      contact: "+234 802 000 1002",
      status: "pending",
      donorName: "Yaba Grocers",
      createdAt: "2026-08-02T08:30:00.000Z",
    },
  ],
  requests: [
    {
      id: "REQ-2001",
      householdSize: "12 people",
      urgency: "High",
      dietaryNotes: "No peanuts",
      pickupArea: "Aguda, Surulere",
      status: "approved",
      beneficiaryName: "Aguda Community Pantry",
      createdAt: "2026-08-01T11:00:00.000Z",
    },
    {
      id: "REQ-2002",
      householdSize: "8 people",
      urgency: "Medium",
      dietaryNotes: "",
      pickupArea: "Makoko",
      status: "pending",
      beneficiaryName: "Makoko Women Collective",
      createdAt: "2026-08-02T09:15:00.000Z",
    },
  ],
  tasks: [
    {
      id: "TSK-3001",
      title: "Surulere pickup - 80 meal packs",
      area: "Surulere",
      quantity: "80 meal packs",
      status: "available",
      matchId: "LFH-1024",
      createdAt: "2026-08-01T12:00:00.000Z",
    },
    {
      id: "TSK-3002",
      title: "Yaba dispatch - produce basket collection",
      area: "Yaba",
      quantity: "35 baskets",
      status: "available",
      matchId: "LFH-1025",
      createdAt: "2026-08-02T10:00:00.000Z",
    },
    {
      id: "TSK-3003",
      title: "Ikeja route - beans and stew bowls",
      area: "Ikeja",
      quantity: "95 meals",
      status: "in_progress",
      matchId: "LFH-1027",
      createdAt: "2026-08-02T14:00:00.000Z",
    },
  ],
  matches: [
    {
      id: "LFH-1024",
      donor: "Mainland Kitchen",
      food: "Cooked jollof rice packs",
      quantity: "120 meals",
      area: "Surulere",
      pickupWindow: "Today, 4:00 PM - 6:00 PM",
      beneficiary: "Aguda Community Pantry",
      urgency: "High",
      status: "Needs volunteer",
      route: "Surulere -> Aguda",
    },
    {
      id: "LFH-1025",
      donor: "Yaba Grocers",
      food: "Fresh produce baskets",
      quantity: "35 baskets",
      area: "Yaba",
      pickupWindow: "Tomorrow, 9:00 AM - 11:00 AM",
      beneficiary: "Makoko Women Collective",
      urgency: "Medium",
      status: "Ready",
      route: "Yaba -> Makoko",
    },
    {
      id: "LFH-1026",
      donor: "Lekki Events",
      food: "Packaged pastries and drinks",
      quantity: "80 packs",
      area: "Lekki",
      pickupWindow: "Friday, 2:00 PM - 3:30 PM",
      beneficiary: "Ajah Youth Centre",
      urgency: "Low",
      status: "Scheduled",
      route: "Lekki -> Ajah",
    },
    {
      id: "LFH-1027",
      donor: "Ikeja Canteen",
      food: "Beans, rice, and stew bowls",
      quantity: "95 meals",
      area: "Ikeja",
      pickupWindow: "Today, 5:30 PM - 7:00 PM",
      beneficiary: "Agege Relief Desk",
      urgency: "High",
      status: "Ready",
      route: "Ikeja -> Agege",
    },
  ],
  approvals: [
    {
      id: "APR-4001",
      kind: "donation",
      title: "Donation pending: Fresh produce baskets",
      detail: "Yaba Grocers · 35 baskets",
      relatedId: "DON-1002",
      status: "pending",
      createdAt: "2026-08-02T08:30:00.000Z",
    },
    {
      id: "APR-4002",
      kind: "request",
      title: "Request pending: Makoko Women Collective",
      detail: "8 people · Medium urgency · Makoko",
      relatedId: "REQ-2002",
      status: "pending",
      createdAt: "2026-08-02T09:15:00.000Z",
    },
  ],
  notifications: [
    {
      id: "NTF-1",
      title: "Donation match found",
      time: "5 mins ago",
      tone: "success",
      read: false,
    },
    {
      id: "NTF-2",
      title: "Volunteer task updated",
      time: "21 mins ago",
      tone: "neutral",
      read: false,
    },
    {
      id: "NTF-3",
      title: "Reminder: Complete profile",
      time: "1 hour ago",
      tone: "warning",
      read: true,
    },
  ],
};

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(HUB_STORE_EVENT));
  }
}

function readStore(): HubStore {
  if (typeof window === "undefined") return seedStore;

  const raw = localStorage.getItem(HUB_STORE_KEY);
  if (!raw) {
    localStorage.setItem(HUB_STORE_KEY, JSON.stringify(seedStore));
    return structuredClone(seedStore);
  }

  try {
    const parsed = JSON.parse(raw) as Partial<HubStore>;
    return {
      donations: parsed.donations ?? seedStore.donations,
      requests: parsed.requests ?? seedStore.requests,
      tasks: parsed.tasks ?? seedStore.tasks,
      matches: parsed.matches ?? seedStore.matches,
      approvals: parsed.approvals ?? seedStore.approvals,
      notifications: parsed.notifications ?? seedStore.notifications,
    };
  } catch {
    localStorage.setItem(HUB_STORE_KEY, JSON.stringify(seedStore));
    return structuredClone(seedStore);
  }
}

function writeStore(store: HubStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HUB_STORE_KEY, JSON.stringify(store));
  notify();
}

function pushNotification(store: HubStore, title: string, tone: NotificationTone = "neutral") {
  store.notifications = [
    {
      id: makeId("NTF"),
      title,
      time: relativeTimeLabel(),
      tone,
      read: false,
    },
    ...store.notifications,
  ].slice(0, 20);
}

export function getHubStore(): HubStore {
  return readStore();
}

export function getHubStoreSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(seedStore);
  const existing = localStorage.getItem(HUB_STORE_KEY);
  if (!existing) {
    localStorage.setItem(HUB_STORE_KEY, JSON.stringify(seedStore));
    return JSON.stringify(seedStore);
  }
  return existing;
}

export function createDonation(input: {
  foodType: string;
  quantity: string;
  pickupWindow: string;
  location: string;
  contact: string;
  donorName: string;
}) {
  const store = readStore();
  const donation: Donation = {
    id: makeId("DON"),
    ...input,
    status: "pending",
    createdAt: nowIso(),
  };

  store.donations = [donation, ...store.donations];
  store.approvals = [
    {
      id: makeId("APR"),
      kind: "donation",
      title: `Donation pending: ${donation.foodType}`,
      detail: `${donation.donorName} · ${donation.quantity}`,
      relatedId: donation.id,
      status: "pending",
      createdAt: donation.createdAt,
    },
    ...store.approvals,
  ];
  pushNotification(store, `Donation submitted: ${donation.foodType}`, "success");
  writeStore(store);
  return donation;
}

export function createSupportRequest(input: {
  householdSize: string;
  urgency: Urgency;
  dietaryNotes: string;
  pickupArea: string;
  beneficiaryName: string;
}) {
  const store = readStore();
  const request: SupportRequest = {
    id: makeId("REQ"),
    ...input,
    status: "pending",
    createdAt: nowIso(),
  };

  store.requests = [request, ...store.requests];
  store.approvals = [
    {
      id: makeId("APR"),
      kind: "request",
      title: `Request pending: ${request.beneficiaryName}`,
      detail: `${request.householdSize} · ${request.urgency} urgency · ${request.pickupArea}`,
      relatedId: request.id,
      status: "pending",
      createdAt: request.createdAt,
    },
    ...store.approvals,
  ];
  pushNotification(store, `Support request submitted for ${request.pickupArea}`, "success");
  writeStore(store);
  return request;
}

export function claimTask(taskId: string) {
  const store = readStore();
  store.tasks = store.tasks.map((task) =>
    task.id === taskId && task.status === "available" ? { ...task, status: "in_progress" } : task,
  );

  const task = store.tasks.find((item) => item.id === taskId);
  if (task?.matchId) {
    store.matches = store.matches.map((match) =>
      match.id === task.matchId ? { ...match, status: "Scheduled" } : match,
    );
  }

  pushNotification(store, `Task claimed: ${task?.title ?? taskId}`, "neutral");
  writeStore(store);
}

export function completeTask(taskId: string) {
  const store = readStore();
  store.tasks = store.tasks.map((task) =>
    task.id === taskId && task.status === "in_progress" ? { ...task, status: "completed" } : task,
  );

  const task = store.tasks.find((item) => item.id === taskId);
  if (task?.matchId) {
    store.matches = store.matches.map((match) =>
      match.id === task.matchId ? { ...match, status: "Completed" } : match,
    );
  }

  pushNotification(store, `Task completed: ${task?.title ?? taskId}`, "success");
  writeStore(store);
}

export function updateMatchStatus(matchId: string, status: MatchStatus) {
  const store = readStore();
  const match = store.matches.find((item) => item.id === matchId);
  store.matches = store.matches.map((item) => (item.id === matchId ? { ...item, status } : item));

  if (status === "Needs volunteer" && match) {
    const exists = store.tasks.some((task) => task.matchId === matchId && task.status !== "completed");
    if (!exists) {
      store.tasks = [
        {
          id: makeId("TSK"),
          title: `${match.area} pickup - ${match.quantity}`,
          area: match.area,
          quantity: match.quantity,
          status: "available",
          matchId,
          createdAt: nowIso(),
        },
        ...store.tasks,
      ];
    }
  }

  if (status === "Scheduled" && match) {
    store.tasks = store.tasks.map((task) =>
      task.matchId === matchId && task.status === "available" ? { ...task, status: "in_progress" } : task,
    );
  }

  pushNotification(store, `Match ${matchId} marked ${status}`, "neutral");
  writeStore(store);
}

export function decideApproval(approvalId: string, decision: "approved" | "rejected") {
  const store = readStore();
  const approval = store.approvals.find((item) => item.id === approvalId);
  if (!approval || approval.status !== "pending") return;

  store.approvals = store.approvals.map((item) =>
    item.id === approvalId ? { ...item, status: decision } : item,
  );

  if (approval.kind === "donation") {
    store.donations = store.donations.map((item) =>
      item.id === approval.relatedId ? { ...item, status: decision } : item,
    );
  } else {
    store.requests = store.requests.map((item) =>
      item.id === approval.relatedId ? { ...item, status: decision } : item,
    );
  }

  pushNotification(
    store,
    `${approval.kind === "donation" ? "Donation" : "Request"} ${decision}: ${approval.title}`,
    decision === "approved" ? "success" : "warning",
  );
  writeStore(store);
}

export function markNotificationRead(notificationId: string) {
  const store = readStore();
  store.notifications = store.notifications.map((item) =>
    item.id === notificationId ? { ...item, read: true } : item,
  );
  writeStore(store);
}

export function markAllNotificationsRead() {
  const store = readStore();
  store.notifications = store.notifications.map((item) => ({ ...item, read: true }));
  writeStore(store);
}

export function updateDonation(
  id: string,
  patch: Partial<Pick<Donation, "foodType" | "quantity" | "pickupWindow" | "location" | "contact">>,
) {
  const store = readStore();
  const current = store.donations.find((item) => item.id === id);
  if (!current || current.status === "cancelled" || current.status === "completed") return null;

  store.donations = store.donations.map((item) => (item.id === id ? { ...item, ...patch } : item));
  pushNotification(store, `Donation updated: ${patch.foodType ?? current.foodType}`, "neutral");
  writeStore(store);
  return store.donations.find((item) => item.id === id) ?? null;
}

export function cancelDonation(id: string) {
  const store = readStore();
  const current = store.donations.find((item) => item.id === id);
  if (!current) return;

  store.donations = store.donations.map((item) =>
    item.id === id ? { ...item, status: "cancelled" } : item,
  );
  store.approvals = store.approvals.map((item) =>
    item.relatedId === id && item.status === "pending" ? { ...item, status: "rejected" } : item,
  );
  pushNotification(store, `Donation cancelled: ${current.foodType}`, "warning");
  writeStore(store);
}

export function updateSupportRequest(
  id: string,
  patch: Partial<Pick<SupportRequest, "householdSize" | "urgency" | "dietaryNotes" | "pickupArea">>,
) {
  const store = readStore();
  const current = store.requests.find((item) => item.id === id);
  if (!current || current.status === "cancelled" || current.status === "fulfilled") return null;

  store.requests = store.requests.map((item) => (item.id === id ? { ...item, ...patch } : item));
  pushNotification(store, `Request updated: ${patch.pickupArea ?? current.pickupArea}`, "neutral");
  writeStore(store);
  return store.requests.find((item) => item.id === id) ?? null;
}

export function cancelSupportRequest(id: string) {
  const store = readStore();
  const current = store.requests.find((item) => item.id === id);
  if (!current) return;

  store.requests = store.requests.map((item) =>
    item.id === id ? { ...item, status: "cancelled" } : item,
  );
  store.approvals = store.approvals.map((item) =>
    item.relatedId === id && item.status === "pending" ? { ...item, status: "rejected" } : item,
  );
  pushNotification(store, `Request cancelled for ${current.pickupArea}`, "warning");
  writeStore(store);
}

export function linkDonationToRequest(donationId: string, requestId: string) {
  const store = readStore();
  const donation = store.donations.find((item) => item.id === donationId);
  const request = store.requests.find((item) => item.id === requestId);
  if (!donation || !request) return null;
  if (donation.status === "cancelled" || donation.status === "rejected") return null;
  if (request.status === "cancelled" || request.status === "rejected") return null;

  const area = request.pickupArea.split(",")[0]?.trim() || request.pickupArea;
  const match: FoodMatch = {
    id: makeId("LFH"),
    donor: donation.donorName,
    food: donation.foodType,
    quantity: donation.quantity,
    area,
    pickupWindow: donation.pickupWindow,
    beneficiary: request.beneficiaryName,
    urgency: request.urgency,
    status: "Needs volunteer",
    route: `${area} -> ${request.pickupArea}`,
    donationId: donation.id,
    requestId: request.id,
  };

  store.matches = [match, ...store.matches];
  store.donations = store.donations.map((item) =>
    item.id === donationId ? { ...item, status: "matched" } : item,
  );
  store.requests = store.requests.map((item) =>
    item.id === requestId ? { ...item, status: "matched" } : item,
  );
  store.tasks = [
    {
      id: makeId("TSK"),
      title: `${area} pickup - ${donation.quantity}`,
      area,
      quantity: donation.quantity,
      status: "available",
      matchId: match.id,
      createdAt: nowIso(),
    },
    ...store.tasks,
  ];
  pushNotification(store, `Linked match created: ${donation.foodType}`, "success");
  writeStore(store);
  return match;
}

export function getImpactStats(store: HubStore = readStore()) {
  const completedMatches = store.matches.filter((item) => item.status === "Completed").length;
  const completedTasks = store.tasks.filter((item) => item.status === "completed").length;
  const activeRoutes = store.matches.filter(
    (item) => item.status === "Scheduled" || item.status === "Needs volunteer" || item.status === "Ready",
  ).length;
  const openDonations = store.donations.filter(
    (item) => item.status === "pending" || item.status === "approved" || item.status === "matched",
  ).length;
  const openRequests = store.requests.filter(
    (item) => item.status === "pending" || item.status === "approved" || item.status === "matched",
  ).length;
  const areas = Array.from(
    new Set([
      ...store.matches.map((item) => item.area),
      ...store.tasks.map((item) => item.area),
    ]),
  );

  return {
    completedMatches,
    completedTasks,
    activeRoutes,
    openDonations,
    openRequests,
    areasServed: areas.length,
    totalMatches: store.matches.length,
    totalDonations: store.donations.length,
    totalRequests: store.requests.length,
  };
}

export function capitalizeStatus(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
