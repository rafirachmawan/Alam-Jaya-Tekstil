import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios"; // Axios instance kamu

const use_mock = true;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetcher = async (newOrder: any) => {
  if (use_mock) {
    await delay(1000);
    console.log("Data yang dikirim (Mock):", newOrder);
    return { success: true, message: "Berhasil simpan data mock!" };
  }

  // Panggil endpoint POST di sini
  const response = await api.post("/api/orders", newOrder);
  return response.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    // Kaidah Penting: Setelah sukses, beri tahu React Query agar ambil data terbaru (Refetch)
    onSuccess: () => {
      // Ini akan membuat hook useGetOrders otomatis ambil data baru
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      alert("Pesanan berhasil dibuat!");
    },
    onError: (error: any) => {
      alert("Gagal menyimpan: " + error.message);
    },
  });
};
