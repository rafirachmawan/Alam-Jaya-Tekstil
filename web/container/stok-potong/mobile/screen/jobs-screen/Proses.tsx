"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useGetPermintaan } from "@/services/potong/useGetPermintaan";
import { usePutPermintaan } from "@/services/potong/usePutPermintaan";

type permintaanType = {
  id_permintaan: string;
  nama_produk: string;
  jumlah: number;
  ukuran: "M" | "L" | "XL" | "XXL";
  user_id: string;
  is_urgent: boolean;
  status?: string;
};

export default function Proses() {
  const [selectedPermintaan, setSelectedPermintaan] =
    useState<permintaanType | null>(null);

  const { data: dataPermintaan, isLoading } = useGetPermintaan();
  const { mutate: mutatePermintaan } = usePutPermintaan();

  // ✅ FILTER DATA PROSES
  const dataProses = dataPermintaan?.filter(
    (item: permintaanType) => item.status === "proses",
  );

  // ✅ HANDLE SELESAI
  const handleSelesai = () => {
    if (!selectedPermintaan) return;

    mutatePermintaan(
      {
        id: selectedPermintaan.id_permintaan,
        data: {
          status: "selesai",
        },
      },
      {
        onSuccess: () => {
          toast.success("Berhasil dipindahkan ke stock!");
          setSelectedPermintaan(null);
        },
      },
    );
  };

  return (
    <>
      {/* LIST */}
      <div className="flex flex-col flex-1 overflow-y-auto gap-3">
        {isLoading ? (
          <p className="text-center py-4">Loading...</p>
        ) : dataProses && dataProses.length > 0 ? (
          dataProses.map((item: permintaanType, index: number) => (
            <div
              key={`${item.id_permintaan}-${index}`}
              onClick={() => setSelectedPermintaan(item)}
              className="border border-gray-300 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            >
              <div>
                {item.is_urgent && (
                  <p className="text-red-500 text-xs font-bold uppercase">
                    Urgent
                  </p>
                )}
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

      {/* MODAL */}
      {selectedPermintaan && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedPermintaan(null)}
        >
          <div
            className="bg-white p-4 rounded-xl w-[85%]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPermintaan.is_urgent && (
              <p className="text-red-500 text-md font-bold uppercase mb-1">
                Urgent
              </p>
            )}

            <div className="flex justify-between mb-2">
              <p className="text-md font-semibold text-gray-800">
                {selectedPermintaan.nama_produk}
              </p>
              <p className="font-bold text-gray-800">
                {selectedPermintaan.jumlah}
              </p>
            </div>

            <hr className="mb-3 border-gray-300" />

            <button
              onClick={handleSelesai}
              className="bg-green-500 text-white text-xs px-3 py-1 rounded float-right hover:bg-green-600 active:scale-95"
            >
              Selesai → Stock
            </button>
          </div>
        </div>
      )}
    </>
  );
}
