"use client";

import { useState } from "react";
import { login } from "@/actions/admin/auth";
import { Mountain, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="bg-[#0B1E36] p-4 rounded-full">
           <Mountain className="text-[#F59E0B] w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-wider">NAVITTALO ADMIN</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md flex flex-col gap-5">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Sign In</h2>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F59E0B]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} required className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F59E0B] pr-12" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#0B1E36] hover:bg-[#112d52] text-white font-bold py-3 rounded-lg mt-2 transition-colors disabled:opacity-50">
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
}
