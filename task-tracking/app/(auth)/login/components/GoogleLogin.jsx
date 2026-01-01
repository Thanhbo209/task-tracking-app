"use client";

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    // Redirect thẳng tới backend
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="rounded-xl bg-white/10 px-4 py-2 mt-4 text-sm text-white hover:bg-white/20 transition w-full"
    >
      Continue with Google
    </button>
  );
}
