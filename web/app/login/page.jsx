"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ✂️ PRODUKSI (POTONG)
    if (username === "potong" && password === "123") {
      localStorage.setItem("role", "potong");
      router.push("/dashboard");
      return;
    }

    // 📦 ADMIN GUDANG
    if (username === "admin" && password === "123") {
      localStorage.setItem("role", "admin");
      router.push("/gudang");
      return;
    }

    // 🧾 RESI
    if (username === "resi" && password === "123") {
      localStorage.setItem("role", "resi");
      router.push("/resi");
      return;
    }

    // 🧵 PENJAHIT
    if (username === "jahit" && password === "123") {
      localStorage.setItem("role", "jahit");
      router.push("/penjahit");
      return;
    }

    // 🔍 QC
    if (username === "qc" && password === "123") {
      localStorage.setItem("role", "qc");
      router.push("/qc");
      return;
    }

    alert("Login gagal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Sistem Produksi
          </h1>
          <p className="text-gray-400 text-xs mt-1">Alam Jaya Tekstil</p>
        </div>

        {/* TITLE */}
        <h2 className="text-base font-semibold mb-5 text-center text-gray-700">
          Login
        </h2>

        {/* INPUT USERNAME */}
        <div className="mb-3">
          <label className="text-xs text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            className="w-full mt-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="mb-5">
          <label className="text-xs text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full mt-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition active:scale-95 shadow-sm"
        >
          Masuk
        </button>

        {/* DEMO INFO */}
        <p className="text-center text-[11px] text-gray-400 mt-4">
          Demo:
          <br />
          potong / admin / resi / jahit / qc
          <br />
          password: 123
        </p>

        {/* FOOTER */}
        <p className="text-center text-[10px] text-gray-400 mt-5">
          © 2026 Alam Jaya Tekstil
        </p>
      </div>
    </div>
  );
}
