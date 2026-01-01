import GoogleLogin from "@/app/(auth)/login/components/GoogleLogin";
import LoginForm from "@/app/(auth)/login/components/LoginForm";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#4d1880] px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-linear-to-b from-[#783a8f] via-[#62368b] to-[#472f85] p-10 shadow-2xl">
        {/* Back */}
        <a
          className="absolute left-4 top-4 text-white hover:text-gray-300"
          href="/"
        >
          <ArrowLeftIcon size={22} />
        </a>

        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-white">
          Sign In
        </h2>

        {/* Form */}
        <LoginForm />

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-4">
          <button className="text-center text-sm text-white/80 hover:underline">
            Forgot password?
          </button>

          {/* Signup */}
          <div className="mt-2 flex justify-center items-center gap-2 text-sm text-white/80">
            <span>Don't have an account?</span>
            <a
              href="/register"
              className="font-semibold bg-transparent text-white hover:underline"
            >
              Sign Up
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2 text-white/70 text-sm">
            <div className="h-px flex-1 bg-white/30" />
            OR
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {/* Social */}
          <div className="text-center">
            <p className="text-sm text-white/80">
              Sign in with social networks
            </p>

            <GoogleLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
