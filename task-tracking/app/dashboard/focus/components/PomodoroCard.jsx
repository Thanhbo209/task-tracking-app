"use client";
import { useEffect, useState, useRef } from "react";
import PomodoroStatus from "./PomodoroStatus";
import { Ban, Pause, Play } from "lucide-react";

export default function PomodoroCard({ pomodoro, onEnd }) {
  const startTime = useRef(new Date(pomodoro.startTime));
  const duration = pomodoro.duration;
  const [remaining, setRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - startTime.current.getTime()) / 1000
        );
        const newRemaining = Math.max(duration - elapsed, 0);
        setRemaining(newRemaining);
        if (newRemaining <= 0) {
          clearInterval(interval);
          onEnd(pomodoro._id);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, pomodoro, onEnd, duration]);

  const handlePauseResume = () => {
    if (!isPaused) {
      setIsPaused(true);
    } else {
      startTime.current = new Date(Date.now() - (duration - remaining) * 1000);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (remaining / duration) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-row bg-(--component) shadow-lg rounded-2xl p-6 gap-6 w-full">
      {/* Left: Timer Circle */}
      <div className="relative w-42 h-42 shrink-0">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full transform -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f4c35b" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-2xl font-bold text-(--text)">
          {formatTime(remaining)}
          <span className="text-sm text-(--des) mt-1">
            {isPaused ? "Paused" : "Remaining"}
          </span>
        </div>
      </div>

      {/* Right: Pomodoro Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-(--text)">
            {pomodoro.taskId?.title || "Unknown Task"}
          </h3>
          <PomodoroStatus completed={pomodoro.completed} />
          <p className="text-(--text) mt-2 text-sm">
            Duration: {Math.floor(pomodoro.duration / 60)} min
          </p>
          <p className="text-(--text) text-sm">
            Started at: {new Date(pomodoro.startTime).toLocaleTimeString()}
          </p>
        </div>

        <div className="flex justify-end items-center gap-3 mt-4">
          <button
            onClick={handlePauseResume}
            className="bg-(--primary) hover:bg-(--primary)/75 text-white px-3 py-1.5 rounded-full shadow-md text-sm transition"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button
            onClick={() => onEnd(pomodoro._id)}
            className="bg-(--danger) hover:bg-r(--danger)/75 text-white px-3 py-1.5 rounded-full shadow-md text-sm transition"
          >
            <Ban size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
