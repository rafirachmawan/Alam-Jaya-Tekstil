"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../data/orders";
import { useRouter } from "next/navigation";

export default function PenjahitPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());

  useEffect(() => {
    if (localStorage.getItem("role") !== "jahit") {
      router.push("/login");
    }
  }, []);

  const selesai = (id: number) => {
    updateOrder(id, "qc");
    setOrders([...getOrders()]);
  };

  return (
    <div className="p-6">
      <h1>🧵 Penjahit</h1>

      {orders
        .filter((o) => o.status === "jahit" || o.status === "rework")
        .map((o) => (
          <div key={o.id}>
            {o.nama}
            <button onClick={() => selesai(o.id)}>Kirim ke QC</button>
          </div>
        ))}
    </div>
  );
}
