"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrders, addOrder } from "../data/orders";
import { getStok, kurangiStok } from "../data/orders";

export default function ResiPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [kode, setKode] = useState("K001");

  useEffect(() => {
    if (localStorage.getItem("role") !== "resi") {
      router.push("/login");
    }
  }, []);

  const handleAdd = () => {
    if (!nama || jumlah <= 0) return;

    const stok = getStok(kode);

    if (stok >= jumlah) {
      addOrder({
        id: Date.now(),
        nama,
        kodeBarang: kode,
        jumlah,
        status: "selesai",
      });

      kurangiStok(kode, jumlah);

      alert(`✅ Barang tersedia (${kode}), stok berkurang`);
    } else {
      addOrder({
        id: Date.now(),
        nama,
        kodeBarang: kode,
        jumlah,
        status: "request",
      });

      alert(`❌ Stok ${kode} habis, kirim ke gudang`);
    }

    setOrders([...getOrders()]);
    setNama("");
    setJumlah(0);
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="font-bold mb-4 text-lg">🧾 Resi</h1>

      {/* INFO STOK */}
      <div className="text-xs text-gray-500 mb-3 space-y-1">
        <p>Stok K001: {getStok("K001")} (habis)</p>
        <p>Stok K002: {getStok("K002")} (tersedia)</p>
      </div>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl border mb-4">
        <input
          placeholder="Nama Barang"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        {/* PILIH KODE */}
        <select
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="K001">K001 (Stok Habis)</option>
          <option value="K002">K002 (Ada Stok)</option>
        </select>

        <input
          type="number"
          placeholder="Jumlah"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Kirim Request
        </button>
      </div>

      {/* ✅ ORDER SELESAI */}
      <div className="bg-white p-4 rounded-xl border mb-4">
        <h2 className="font-semibold mb-3">📦 Order Selesai</h2>

        {orders
          .filter((o) => o.status === "selesai")
          .map((o) => (
            <div
              key={o.id}
              className="border-b py-2 text-sm flex justify-between"
            >
              <span>
                {o.nama} ({o.kodeBarang})
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                selesai
              </span>
            </div>
          ))}

        {orders.filter((o) => o.status === "selesai").length === 0 && (
          <p className="text-xs text-gray-400">Belum ada</p>
        )}
      </div>

      {/* 🟡 REQUEST KE GUDANG */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">🟡 Request ke Gudang</h2>

        {orders
          .filter((o) => o.status === "request")
          .map((o) => (
            <div
              key={o.id}
              className="border-b py-2 text-sm flex justify-between"
            >
              <span>
                {o.nama} ({o.kodeBarang})
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                request
              </span>
            </div>
          ))}

        {orders.filter((o) => o.status === "request").length === 0 && (
          <p className="text-xs text-gray-400">Tidak ada request</p>
        )}
      </div>
    </div>
  );
}
