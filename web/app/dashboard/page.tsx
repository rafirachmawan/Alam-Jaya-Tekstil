"use client";

import { useEffect, useState } from "react";
import { useGetPermintaan } from "@/services/useGetPermintaan";
import { useRouter } from "next/navigation";

import PotongWeb from "@/container/potong/web/potong-web";
import PotongMobile from "@/container/potong/mobile/potong-mobile";
import { api } from "@/lib/axios";

export default function Page() {
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("menunggu");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { data, isLoading } = useGetPermintaan();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      const logout = await api.post("/auth/logout");
      if (!logout.data) {
        throw new Error("Failed to logout");
      }
      console.log("sukses logout server");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
      console.log("sukses logout dummy");
      console.error("Error logging out:", error);
    }
  };

  const filteredOrders = orders.filter((item) => item.status === activeTab);

  const sharedProps = {
    orders,
    activeTab,
    setActiveTab,
    filteredOrders,
    selectedOrder,
    setSelectedOrder,
    modalType,
    setModalType,
    handleLogout,
  };

  return isMobile ? (
    <PotongMobile {...sharedProps} />
  ) : (
    <PotongWeb {...sharedProps} />
  );
}
