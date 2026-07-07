"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Role, roleOptions } from "@/lib/ui";
import {
  ACCOUNT_NAME_KEY,
  ACTIVE_ROLE_KEY,
  PROFILE_KEY,
  getProfile,
  setAccountName,
  setActiveRole,
  setProfile,
} from "@/lib/ui-session";
import { useActiveRole } from "@/lib/use-ui-session";
import { useAuthGuard } from "@/lib/use-auth-guard";

type NotificationPrefs = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  updates: boolean;
};

const roles = roleOptions.filter((role) => role.value !== "admin");

export default function ProfilePage() {
  const isLoggedIn = useAuthGuard();
  const router = useRouter();
  const activeRole = useActiveRole();
  const [form, setForm] = useState(() => getProfile());
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>(activeRole ?? "volunteer");
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    emailNotifications: true,
    pushNotifications: false,
    updates: true,
  });
  const [prefsStatus, setPrefsStatus] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accessRequestRole, setAccessRequestRole] = useState<Role>("donor");
  const [accessRequestStatus, setAccessRequestStatus] = useState("");
  const [permissionViewRole, setPermissionViewRole] = useState<Role>(activeRole ?? "volunteer");
  const accountId = "LFH-2026-0042";
  const memberSince = "March 7, 2026";
  const verificationStatus = "Verified";

  const rolePermissions: Record<Role, string[]> = {
    donor: ["Create donation offers", "View donation status", "Edit profile details"],
    beneficiary: ["Create support requests", "Track request status", "Edit profile details"],
    volunteer: ["View assignments", "Update task progress", "Edit profile details"],
    admin: ["Manage approvals", "Assign teams", "View system reports"],
  };
  const activitySummaryByRole: Record<Role, Array<{ label: string; value: string }>> = {
    donor: [
      { label: "Total Donations", value: "18" },
      { label: "Meals Shared", value: "740" },
      { label: "Active Donations", value: "3" },
    ],
    volunteer: [
      { label: "Deliveries Completed", value: "27" },
      { label: "Communities Helped", value: "9" },
    ],
    beneficiary: [
      { label: "Requests Made", value: "11" },
      { label: "Support Received", value: "8" },
    ],
    admin: [
      { label: "Approvals Processed", value: "56" },
      { label: "Active Assignments", value: "14" },
    ],
  };
  const summaryRole = activeRole ?? selectedRole;

  if (!isLoggedIn) return null;

  function onPhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function onSaveProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!form.fullName.trim() || !form.email.trim()) {
      setError("Full name and email are required.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setProfile(form);
      setAccountName(form.fullName.trim().split(/\s+/)[0] || "User");
      setActiveRole(selectedRole);
      setStatus("Profile updated successfully.");
      setLoading(false);
    }, 500);
  }

  function onSavePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordError("");
    setPasswordStatus("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordStatus("Password updated (UI demo only).");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  function onLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCOUNT_NAME_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
      localStorage.removeItem(PROFILE_KEY);
    }
    router.push("/login");
  }

  function togglePref(key: keyof NotificationPrefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function onSavePrefs(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPrefsStatus("Notification preferences saved.");
  }

  function onRequestRoleAccess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAccessRequestStatus(`Request submitted for ${accessRequestRole} access (UI demo).`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Profile</span>
      </p>

      <section className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="max-w-3xl">
            <Card title="Account Profile" description="Manage your profile details and role session.">
              <form onSubmit={onSaveProfile} className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-green-200 bg-green-50">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Profile preview"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#166534]">No Photo</span>
                  )}
                </div>
                <div>
                  <label htmlFor="photo" className="text-sm font-semibold text-[#166534]">
                    Profile Photo
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={onPhotoChange}
                    className="mt-1 block text-xs text-slate-600"
                  />
                </div>
                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                  <p className="text-xs font-semibold text-slate-600">Active Role</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="text-sm font-bold text-[#166534]">
                      {activeRole
                        ? activeRole[0].toUpperCase() + activeRole.slice(1)
                        : "Not selected"}
                    </p>
                    {activeRole ? (
                      <Badge tone="success">
                        Verified {activeRole[0].toUpperCase() + activeRole.slice(1)}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>

              <Input
                id="fullName"
                label="Full Name"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  id="phone"
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <Input
                id="location"
                label="Location (Lagos area)"
                placeholder="e.g. Yaba, Surulere, Ikeja"
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              />
              <div>
                <label htmlFor="bio" className="mb-1 block text-sm font-medium text-slate-800">
                  Bio / About
                </label>
                <textarea
                  id="bio"
                  className="h-24 w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                  placeholder="Tell people a little about you and your role in the food hub."
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              {error ? (
                <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              {status ? (
                <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {status}
                </p>
              ) : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
              </form>
            </Card>
          </div>

          <div className="max-w-2xl">
            <Card title="Security Settings" description="Protect your account and manage session access.">
              <form onSubmit={onSavePassword} className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Change Password</h3>
                <Input
                  id="currentPassword"
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    id="newPassword"
                    label="New Password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Input
                    id="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                  />
                </div>
                {passwordError ? (
                  <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {passwordError}
                  </p>
                ) : null}
                {passwordStatus ? (
                  <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {passwordStatus}
                  </p>
                ) : null}
                <Button type="submit">Update Password</Button>
              </form>
              <div className="mt-4 space-y-3 border-t border-green-100 pt-4">
                <Button
                  type="button"
                  onClick={onLogout}
                  className="border border-red-300 bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400"
                >
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <Card title="Account Information" description="Platform-level account details">
            <div className="space-y-2 text-sm text-slate-700">
              <p className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                Member Since: <span className="font-semibold">{memberSince}</span>
              </p>
              <p className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                Account ID: <span className="font-semibold">{accountId}</span>
              </p>
              <p className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                Verification Status:{" "}
                <span className="font-semibold text-green-700">{verificationStatus}</span>
              </p>
              <p className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                Active Role:{" "}
                <span className="font-semibold">
                  {activeRole
                    ? activeRole[0].toUpperCase() + activeRole.slice(1)
                    : "Not selected"}
                </span>
              </p>
            </div>
          </Card>

          <Card title="Role Management" description="Switch roles, request access, and view permissions">
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-800">Switch Role</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.value);
                        setActiveRole(role.value);
                      }}
                      className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition ${
                        selectedRole === role.value
                          ? "border-green-500 bg-green-100 text-[#166534]"
                          : "border-green-200 bg-white text-[#16A34A] hover:bg-green-50"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={onRequestRoleAccess} className="space-y-2">
                <label htmlFor="requestRole" className="block text-sm font-semibold text-slate-800">
                  Request New Role Access
                </label>
                <div className="flex flex-wrap gap-2">
                  <select
                    id="requestRole"
                    className="w-full rounded-md border border-green-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                    value={accessRequestRole}
                    onChange={(e) => setAccessRequestRole(e.target.value as Role)}
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" variant="secondary">
                    Request Access
                  </Button>
                </div>
                {accessRequestStatus ? (
                  <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {accessRequestStatus}
                  </p>
                ) : null}
              </form>

              <div className="space-y-2">
                <label htmlFor="permissionRole" className="block text-sm font-semibold text-slate-800">
                  See Permissions
                </label>
                <select
                  id="permissionRole"
                  className="w-full rounded-md border border-green-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                  value={permissionViewRole}
                  onChange={(e) => setPermissionViewRole(e.target.value as Role)}
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <ul className="space-y-1 rounded-md border border-green-100 bg-green-50 px-3 py-2 text-sm text-slate-700">
                  {rolePermissions[permissionViewRole].map((permission) => (
                    <li key={permission}>- {permission}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card
            title="Activity Summary"
            description={`Quick view of your ${summaryRole[0].toUpperCase() + summaryRole.slice(1)} activity.`}
          >
            <div className="space-y-2 text-sm text-slate-700">
              {activitySummaryByRole[summaryRole].map((item) => (
                <p key={item.label} className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                  {item.label}: <span className="font-semibold">{item.value}</span>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Notification Preferences" description="Choose how you want to be notified.">
            <form onSubmit={onSavePrefs} className="space-y-3 text-sm text-slate-700">
              <label className="flex items-center justify-between rounded-md border border-green-100 px-3 py-2">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={prefs.emailNotifications}
                  onChange={() => togglePref("emailNotifications")}
                  className="h-4 w-4 accent-[#16A34A]"
                />
              </label>
              <label className="flex items-center justify-between rounded-md border border-green-100 px-3 py-2">
                <span>Push Notifications</span>
                <input
                  type="checkbox"
                  checked={prefs.pushNotifications}
                  onChange={() => togglePref("pushNotifications")}
                  className="h-4 w-4 accent-[#16A34A]"
                />
              </label>
              <label className="flex items-center justify-between rounded-md border border-green-100 px-3 py-2">
                <span>Updates</span>
                <input
                  type="checkbox"
                  checked={prefs.updates}
                  onChange={() => togglePref("updates")}
                  className="h-4 w-4 accent-[#16A34A]"
                />
              </label>
              {prefsStatus ? (
                <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {prefsStatus}
                </p>
              ) : null}
              <Button type="submit" variant="secondary">
                Save Preferences
              </Button>
            </form>
          </Card>

        </div>
      </section>
    </main>
  );
}
