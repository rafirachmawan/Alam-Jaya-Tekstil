"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../data/orders";
import { useRouter } from "next/navigation";

export default function QCPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());

  useEffect(() => {
    if (localStorage.getItem("role") !== "qc") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <h1>🔍 QC</h1>

      {orders
        .filter((o) => o.status === "qc")
        .map((o) => (
          <div key={o.id}>
            {o.nama}

            <button
              onClick={() => {
                updateOrder(o.id, "rework");
                setOrders([...getOrders()]);
              }}
            >
              Gagal
            </button>

            <button
              onClick={() => {
                updateOrder(o.id, "gudang");
                setOrders([...getOrders()]);
              }}
            >
              Lolos
            </button>
          </div>
        ))}
    </div>
  );
}
