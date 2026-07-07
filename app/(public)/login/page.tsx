"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { setAccountName } from "@/lib/ui-session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setAccountName(email.split("@")[0] || "User");
      router.push("/dashboard");
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
          <Card title="Login" description="Sign in to continue to your workspace.">
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
