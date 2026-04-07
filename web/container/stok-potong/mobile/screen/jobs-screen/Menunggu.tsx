"use client";

import { useGetPermintaanStokPotong } from "@/services/stok-potong/useGetPermintaan";

type stockType = {
  id: string;
  nama_produk: string;
  jumlah: number;
  ukuran: "M" | "L" | "XL" | "XXL";
};

export default function MenungguStock() {
  const { data, isLoading } = useGetPermintaanStokPotong();

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : data && data.length > 0 ? (
        data.map((item: stockType, index: number) => (
          <div
            key={`${item.id}-${index}`}
            className="border border-gray-300 rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.nama_produk} - {item.ukuran}
              </p>
            </div>

            <p className="text-2xl font-bold text-gray-800">{item.jumlah}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500 font-medium">Data Kosong</p>
        </div>
      )}
    </div>
  );
}
