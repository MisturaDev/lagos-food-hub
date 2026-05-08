"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Role, roleOptions } from "@/lib/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("donor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      router.push(`/${role}`);
      router.refresh();
      setLoading(false);
    }, 500);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Login</span>
      </p>
      <div className="mt-4 grid items-start gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card title="Login" description="Sign in to continue to your selected dashboard.">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-800">
                  Login As
                </label>
                <select
                  id="role"
                  className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {error ? (
                <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </Card>
        </div>
        <Card title="Need an account?" description="Create a role-based profile first.">
          <Link href="/register">
            <Button variant="secondary">Go to Register</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}

