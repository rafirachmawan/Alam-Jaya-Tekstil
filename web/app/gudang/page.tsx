"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrder, getStok } from "../data/orders";
import { useRouter } from "next/navigation";

export default function GudangPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      router.push("/login");
    }
  }, []);

  // 🔥 REQUEST → POTONG
  const kirimKePotong = (id: number) => {
    updateOrder(id, "potong");
    setOrders([...getOrders()]);
  };

  // 🔥 BARANG DARI QC → MASUK STOK
  const terimaDariQC = (id: number) => {
    updateOrder(id, "selesai");
    setOrders([...getOrders()]);
  };

  const kirimKeResi = (id: number) => {
    updateOrder(id, "selesai");
    setOrders([...getOrders()]);
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-lg font-bold mb-4">📦 Gudang</h1>

      {/* INFO STOK */}
      <div className="bg-white p-4 rounded-xl border mb-4 text-sm">
        <h2 className="font-semibold mb-2">Stok Barang</h2>
        <p>K001: {getStok("K001")}</p>
        <p>K002: {getStok("K002")}</p>
      </div>

      {/* 🟡 REQUEST */}
      <div className="bg-white p-4 rounded-xl border mb-4">
        <h2 className="font-semibold mb-3">🟡 Request dari Resi</h2>

        {orders.filter((o) => o.status === "request").length === 0 && (
          <p className="text-xs text-gray-400">Tidak ada request</p>
        )}

        {orders
          .filter((o) => o.status === "request")
          .map((o) => (
            <div
              key={o.id}
              className="border-b py-2 flex justify-between items-center text-sm"
            >
              <span>
                {o.nama} ({o.kodeBarang}) - {o.jumlah}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => kirimKePotong(o.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Potong
                </button>

                <button
                  onClick={() => kirimKeResi(o.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Resi
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* 🏭 PRODUKSI (LAGI DIPROSES) */}
      <div className="bg-white p-4 rounded-xl border mb-4">
        <h2 className="font-semibold mb-3">🏭 Dalam Produksi</h2>

        {orders.filter((o) => o.status === "potong").length === 0 && (
          <p className="text-xs text-gray-400">Belum ada</p>
        )}

        {orders
          .filter((o) => o.status === "potong")
          .map((o) => (
            <div key={o.id} className="border-b py-2 text-sm">
              {o.nama} ({o.kodeBarang})
            </div>
          ))}
      </div>

      {/* 📦 DARI QC */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">📦 Barang dari QC</h2>

        {orders.filter((o) => o.status === "gudang").length === 0 && (
          <p className="text-xs text-gray-400">Belum ada barang masuk</p>
        )}

        {orders
          .filter((o) => o.status === "gudang")
          .map((o) => (
            <div
              key={o.id}
              className="border-b py-2 flex justify-between items-center text-sm"
            >
              <span>
                {o.nama} ({o.kodeBarang})
              </span>

              <button
                onClick={() => terimaDariQC(o.id)}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
              >
                Masukkan Stok
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
