"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHeader({ darkMode, onToggleTheme }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  if (loading) return null;

  return (
    <header className="h-25 bg-(--component) flex items-center rounded-2xl justify-between px-6 transition-color duration-300">
      <div className="flex justify-between items-center gap-3">
        {/* AVATAR */}
        <img
          src={user?.avatar || "/avatar-default.png"}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-md flex justify-center items-center gap-1">
            Hello,
            <p className="text-(--accent) font-bold">{user.username}</p>
          </span>
          <span className="text-sm text-(--des)">{user.email}</span>
        </div>
      </div>
      {/* TOGGLE THEME */}
      <button
        onClick={onToggleTheme}
        className="rounded-full border border-(--border) bg-card p-2 hover:bg-muted transition"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
