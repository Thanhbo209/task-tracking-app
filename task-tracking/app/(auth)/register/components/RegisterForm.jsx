"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, Lock, User, Eye } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register failed");
      }

      localStorage.setItem("token", data.token);

      // 👉 chuyển dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        name="username"
        placeholder="Full name"
        iconLeft={<User size={18} />}
        value={form.username}
        onChange={handleChange}
      />

      <Input
        name="email"
        placeholder="Email"
        iconLeft={<Mail size={18} />}
        value={form.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        iconLeft={<Lock size={18} />}
        iconRight={<Eye size={18} />}
        value={form.password}
        onChange={handleChange}
      />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        iconLeft={<Lock size={18} />}
        value={form.confirmPassword}
        onChange={handleChange}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button
        type="submit"
        variant="third"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
}
