export type Role = "donor" | "beneficiary" | "volunteer" | "admin";

export const roleOptions: Array<{ value: Role; label: string; description: string }> = [
  {
    value: "donor",
    label: "Donor",
    description: "Share surplus meals and groceries with nearby communities.",
  },
  {
    value: "beneficiary",
    label: "Beneficiary",
    description: "Request support for households and community centers in need.",
  },
  {
    value: "volunteer",
    label: "Volunteer",
    description: "Help with pickup, sorting, and delivery operations.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Coordinate approvals, quality checks, and dispatch oversight.",
  },
];

export const navLinks: Array<{ href: string; label: string }> = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/donor", label: "Donor" },
  { href: "/beneficiary", label: "Beneficiary" },
  { href: "/volunteer", label: "Volunteer" },
];
