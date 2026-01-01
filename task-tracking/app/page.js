import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 text-(--foreground) font-sans relative overflow-hidden ">
      {/* decorative linears */}
      <div className="pointer-events-none absolute -right-50 -top-56 w-196 h-196 rounded-full bg-linear-to-tr from-purple-600/30 to-sky-400/20 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute -left-40 -bottom-45 w-180 h-180 rounded-full bg-linear-to-br from-emerald-400/20 to-indigo-500/10 blur-2xl mix-blend-screen" />

      <section
        className="relative z-10 min-w-xl text-center rounded-2xl border border-white/6  shadow-2xl p-15 md:p-16"
        aria-labelledby="hero-title"
      >
        <div className="mx-auto">
          <div className="flex justify-center items-center gap-4 max-md:flex-col">
            <Image
              src="/logo.webp"
              alt="Hero image"
              width={300}
              height={300}
              priority
              className="h-15 w-15 object-cover animate-bounce"
            />
            <h1 className="inline-block text-3xl md:text-4xl font-semibold leading-tight tracking-tightrelative">
              Task Tracking
              <span
                className="block mx-auto mt-3 w-16 h-1 rounded-full bg-linear-to-r from-purple-500 to-sky-400 blur-sm opacity-95"
                aria-hidden
              />
            </h1>
          </div>

          <p className="mt-4 text-(--text) text-sm md:text-base">
            Task Management — Simple & Modern.
          </p>

          <p className="mt-2 text-(--text) text-sm">
            Fast, efficient, and designed to boost your productivity.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button
              href="/login"
              type="button"
              variant="secondary"
              aria-label="Bắt đầu"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
              </svg>
              Start Now!
            </Button>

            <Button type="button" variant="third" aria-label="Tìm hiểu thêm">
              Details
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
