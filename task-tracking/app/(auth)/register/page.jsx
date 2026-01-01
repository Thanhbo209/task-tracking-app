import Button from "@/components/ui/Button";
import GoogleLogin from "@/app/(auth)/login/components/GoogleLogin";
import RegisterForm from "@/app/(auth)/register/components/RegisterForm";

const page = () => {
  return (
    <section className="flex min-h-screen p-6 items-center justify-center bg-[#4d1880]">
      <div className="relative w-full max-w-sm rounded-2xl bg-linear-to-b from-[#783a8f] via-[#62368b] to-[#472f85] p-10 shadow-2xl">
        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-white">
          Create Account
        </h2>

        {/* Form */}
        <RegisterForm />

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex justify-center gap-2 text-sm text-white/80">
            <span>Already have an account?</span>
            <a
              href="/login"
              className="font-semibold text-white hover:underline"
            >
              Sign In
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
              Sign up with social networks
            </p>

            <GoogleLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
