"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold mb-4">
          Sistem Produksi
        </h1>

        <p className="text-gray-600 mb-6">
          Alam Jaya Tekstil
        </p>

        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Masuk ke Sistem
        </button>
      </div>
    </div>
  );
}