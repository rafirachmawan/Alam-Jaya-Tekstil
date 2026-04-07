"use client";

import Menunggu from "./jobs-screen/Menunggu";
import Proses from "./jobs-screen/Proses";
import Stok from "./jobs-screen/Stok";
import Kirim from "./jobs-screen/Kirim";
import { useState } from "react";

type statusType = "menunggu" | "proses" | "stok" | "kirim";

export default function Jobs({ setScreen }: any) {
  const [filterStatus, setFilterStatus] = useState<statusType>("menunggu");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-sm h-[90vh] bg-white rounded-[40px] shadow-xl p-4 flex flex-col relative">
        {/* HEADER */}
        <div className="border border-gray-300 rounded-2xl py-2 text-center text-sm font-medium mb-3 text-gray-700">
          View Jobs
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search........"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm mb-2 text-gray-700"
        />

        {/* FILTER */}
        <div className="flex justify-between text-xs mb-3">
          {["menunggu", "proses", "stok", "kirim"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setFilterStatus(item as statusType);
              }}
              className={`flex-1 text-center py-1 ${
                filterStatus === item
                  ? "font-semibold text-black"
                  : "text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        {filterStatus === "menunggu" && <Menunggu />}
        {filterStatus === "proses" && <Proses />}
        {filterStatus === "stok" && <Stok />}
        {filterStatus === "kirim" && <Kirim />}

        {/* BACK */}
        <div className="mt-auto flex flex-col gap-2">
          {/* BACK */}
          <button
            onClick={() => setScreen("home")}
            className="text-xs text-gray-500"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
