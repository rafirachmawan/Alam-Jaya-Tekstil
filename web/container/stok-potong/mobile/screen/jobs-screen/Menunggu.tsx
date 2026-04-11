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
            className="bg-white border border-gray-100 rounded-xl px-3 py-3 shadow-sm"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-gray-800">
                {item.nama_produk} - {item.ukuran}
              </p>

              <p className="text-lg font-bold text-gray-900">{item.jumlah}</p>
            </div>

            {/* DETAIL */}
            <div className="text-[11px] text-gray-600 space-y-0.5">
              <p>• Kode Kain</p>
              <p>• Nama Pemotong</p>
              <p>• Tanggal Selesai Potong</p>
            </div>
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
