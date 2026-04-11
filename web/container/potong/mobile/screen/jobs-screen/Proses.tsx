"use client";

import { useGetProses } from "@/services/potong/useGetProses";
import { usePutProses } from "@/services/potong/usePutProses";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Validasi Skema
const prosesSchema = z.object({
  kode_potongan: z.string().min(1, "Kode potongan wajib diisi"),
  jumlah_lolos: z.coerce.number().min(1, "Jumlah lolos minimal 1"),
  pengecek: z.string().min(1, "Nama pengecek wajib diisi"),
});

type ProsesFormData = z.infer<typeof prosesSchema>;

type prosesType = {
  id_permintaan: string;
  nama_produk: string;
  kode_kain: string;
  jumlah: number;
  ukuran: "M" | "L" | "XL" | "XXL";
  user_id: string;
  is_urgent: boolean;
  pengecek: string;
  pemotong: string;
};

export default function Proses() {
  const [selectedProses, setSelectedProses] = useState<prosesType | null>(null);
  const { data: dataProses, isLoading: isLoadingProses } = useGetProses();
  const { mutate: mutateProses } = usePutProses();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProsesFormData>({
    resolver: zodResolver(prosesSchema),
    defaultValues: {
      kode_potongan: "",
      jumlah_lolos: 0,
      pengecek: "",
    },
  });

  // Sinkronisasi data saat item diklik
  const handleSelectProses = (proses: prosesType) => {
    setSelectedProses(proses);
    setValue("kode_potongan", proses.kode_kain); // Pre-fill kode_potongan dengan kode_kain
    setValue("jumlah_lolos", 0);
    setValue("pengecek", "");
  };

  const handleCloseModal = () => {
    setSelectedProses(null);
    reset();
  };

  const onSubmit = (data: ProsesFormData) => {
    if (!selectedProses) return;

    const submitData = {
      id: selectedProses.id_permintaan,
      data: data,
    };

    mutateProses(submitData, {
      onSuccess: () => {
        handleCloseModal();
        toast.success("Permintaan berhasil di proses");
      },
    });
  };

  return (
    <>
      {/* ================= LIST ================= */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {isLoadingProses ? (
          <p className="text-center py-10">Loading...</p>
        ) : dataProses && dataProses.length > 0 ? (
          dataProses.map((proses: prosesType, index: number) => (
            <div
              key={`${proses.id_permintaan}-${index}`}
              onClick={() => handleSelectProses(proses)}
              className="border border-gray-300 rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="flex-row w-full justify-between align-middle items-center">
                {proses.is_urgent && (
                  <p className="text-red-500 text-sm uppercase font-semibold">
                    Urgent
                  </p>
                )}
                <p className="text-sm font-semibold text-gray-800 my-1">
                  {proses.nama_produk} - {proses.ukuran}
                </p>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-gray-400 uppercase">
                    KODE PRODUK :{" "}
                    <span className="font-bold text-gray-600">
                      {proses.kode_kain}
                    </span>
                  </p>
                  <p className="text-xs font-medium text-gray-400 uppercase">
                    PEMOTONG :{" "}
                    <span className="font-bold text-gray-600">
                      {proses.pemotong}
                    </span>
                  </p>
                  <p className="text-xs font-medium text-gray-400 uppercase">
                    PENGECEK :{" "}
                    <span className="font-bold text-gray-600">
                      {proses.pengecek}
                    </span>
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-800">
                  {proses.jumlah}
                </p>
              </div>
            </div>
          ))
        ) : (
          /* Tampilan Data Kosong */
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-500 font-medium">Data Kosong</p>
          </div>
        )}
      </div>

      {/* ================= MODAL PROSES ================= */}
      {selectedProses && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={handleCloseModal}
        >
          <form
            className="bg-white p-5 rounded-2xl w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm font-semibold text-gray-800 leading-snug">
                {selectedProses.nama_produk} - {selectedProses.ukuran}
              </p>

              <p className="text-lg font-bold text-gray-900">
                {selectedProses.jumlah}
              </p>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gray-200 mb-4" />

            {/* INPUT */}
            <div className="space-y-3">
              {/* KODE KAIN */}
              <input
                {...register("kode_potongan")}
                placeholder="Kode Kain"
                className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.kode_potongan && (
                <p className="text-[10px] text-red-500 -mt-2">
                  {errors.kode_potongan.message}
                </p>
              )}

              {/* PEMOTONG (gunakan pengecek kalau memang sesuai backend) */}
              <input
                {...register("pengecek")}
                placeholder="Pemotong / Pengecek"
                className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.pengecek && (
                <p className="text-[10px] text-red-500 -mt-2">
                  {errors.pengecek.message}
                </p>
              )}

              {/* JUMLAH HASIL */}
              <input
                {...register("jumlah_lolos")}
                placeholder="Jumlah hasil"
                className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.jumlah_lolos && (
                <p className="text-[10px] text-red-500 -mt-2">
                  {errors.jumlah_lolos.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 active:scale-95 transition"
              >
                SELESAI
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
