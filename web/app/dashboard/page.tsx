"use client";

import { useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState([
    { id: 1, nama: "Jersey A", status: "menunggu" },
    { id: 2, nama: "Hoodie B", status: "menunggu" },
  ]);

  const updateStatus = (id: number, status: string) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const getColor = (status: string) => {
    if (status === "menunggu") return "bg-gray-400";
    if (status === "proses") return "bg-yellow-500";
    if (status === "selesai") return "bg-green-500";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Divisi Potong</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white rounded shadow"
          >
            <h2 className="font-bold">{order.nama}</h2>

            <div
              className={`mt-2 p-2 text-white rounded ${getColor(
                order.status
              )}`}
            >
              {order.status.toUpperCase()}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() =>
                  updateStatus(order.id, "menunggu")
                }
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Menunggu
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "proses")
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Proses
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "selesai")
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Selesai
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}