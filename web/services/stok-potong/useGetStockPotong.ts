import { useQuery } from "@tanstack/react-query";

const use_mock = true;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// 🔥 DUMMY DATA
const dummyStock = [
  {
    id: "stok-1",
    nama_produk: "Kaos Polos",
    jumlah: 80,
    ukuran: "L",
  },
  {
    id: "stok-2",
    nama_produk: "Hoodie Jumper",
    jumlah: 40,
    ukuran: "M",
  },
  {
    id: "stok-3",
    nama_produk: "Jaket Denim",
    jumlah: 25,
    ukuran: "XL",
  },
  {
    id: "stok-4",
    nama_produk: "Kemeja Flanel",
    jumlah: 60,
    ukuran: "L",
  },
];

const fetcher = async () => {
  if (use_mock) {
    await delay(800); // simulasi loading
    return dummyStock;
  }

  // nanti kalau sudah pakai API
  const res = await fetch("/api/stock-potong");
  return res.json();
};

export const useGetStockPotong = () => {
  return useQuery({
    queryKey: ["stock-potong"],
    queryFn: fetcher,
  });
};
