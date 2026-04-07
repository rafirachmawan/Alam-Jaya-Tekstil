import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

const use_mock = true;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetcher = async () => {
  if (use_mock) {
    await delay(1000);

    return [
      {
        id_permintaan: "stok-1",
        nama_produk: "Kaos Polos (STOCK)",
        jumlah: 80,
        ukuran: "L",
        user_id: "user-1",
        is_urgent: false,
        status: "selesai",
      },
      {
        id_permintaan: "stok-2",
        nama_produk: "Hoodie (STOCK)",
        jumlah: 40,
        ukuran: "M",
        user_id: "user-2",
        is_urgent: false,
        status: "selesai",
      },
      {
        id_permintaan: "stok-3",
        nama_produk: "Jaket Denim (STOCK)",
        jumlah: 15,
        ukuran: "XL",
        user_id: "user-3",
        is_urgent: false,
        status: "selesai",
      },
    ];
  }

  const response = await api.get("/stok-potong/permintaan");
  return response.data;
};

export const useGetPermintaanStokPotong = () => {
  return useQuery({
    queryKey: ["stok-potong-permintaan"], // 🔥 beda dari potong
    queryFn: fetcher,
  });
};
