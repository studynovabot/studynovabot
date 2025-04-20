"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleLogin = () => router.push("/dashboard");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in (mock)
      </button>
    </div>
  );
}
