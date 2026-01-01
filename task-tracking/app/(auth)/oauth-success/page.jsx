"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // ✅ Lưu token
    localStorage.setItem("token", token);

    // (optional) lưu user nếu backend trả về
    const user = searchParams.get("user");
    if (user) {
      localStorage.setItem("user", user);
    }

    // ✅ Vào dashboard
    router.replace("/dashboard");
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Logging in...
    </div>
  );
}
