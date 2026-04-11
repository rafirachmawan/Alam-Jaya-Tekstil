"use client";

import { useState, useEffect } from "react";

export default function Jobs({ setScreen }: any) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState("menunggu");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [form, setForm] = useState({
    kode: "",
    penjahit: "",
    kurir: "",
    tanggalKirim: "",
  });

  // 🔥 DUMMY DATA
  useEffect(() => {
    setJobs([
      {
        id: 1,
        nama: "Hoodie hitam XL",
        qty: 40,
        status: "menunggu",
        kode: "",
        penjahit: "",
        kurir: "",
        tanggalKirim: "",
      },
      {
        id: 2,
        nama: "Kaos merah M",
        qty: 25,
        status: "menunggu",
        kode: "",
        penjahit: "",
        kurir: "",
        tanggalKirim: "",
      },
    ]);
  }, []);

  const filteredJobs = jobs.filter(
    (j: any) =>
      j.status === filterStatus &&
      j.nama.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-sm h-[90vh] bg-white rounded-[40px] shadow-xl p-4 flex flex-col relative">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-2xl py-2 text-center text-sm font-medium mb-4 shadow">
          View Jobs
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search........"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm mb-2"
        />

        {/* FILTER */}
        <div className="flex justify-between text-xs mb-3">
          {["menunggu", "proses", "selesai"].map((item) => (
            <button
              key={item}
              onClick={() => setFilterStatus(item)}
              className={`flex-1 text-center py-1 ${
                filterStatus === item
                  ? "font-semibold text-black"
                  : "text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {filteredJobs.map((job: any) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white border border-gray-100 rounded-xl px-3 py-3 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-semibold text-gray-800">
                  {job.nama}
                </p>

                <p className="text-lg font-bold text-gray-900">{job.qty}</p>
              </div>

              {/* DETAIL KHUSUS MENUNGGU */}
              {job.status === "menunggu" && (
                <div className="text-[11px] text-gray-600 space-y-0.5">
                  <p>• Kode stok potongan</p>
                  <p>• Nama penjahit tujuan</p>
                </div>
              )}

              {/* DETAIL DATA (kalau sudah diisi) */}
              {job.status !== "menunggu" && (
                <div className="text-[11px] text-gray-600 space-y-0.5">
                  <p>• KODE: {job.kode || "-"}</p>
                  <p>• PENJAHIT: {job.penjahit || "-"}</p>
                  <p>• KURIR: {job.kurir || "-"}</p>
                  <p>• TGL: {job.tanggalKirim || "-"}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ACTION */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => setScreen("home")}
            className="w-full bg-gray-100 text-gray-700 text-xs py-2 rounded-xl font-medium hover:bg-gray-200 active:scale-95 transition"
          >
            Kembali
          </button>
        </div>

        {/* MODAL */}
        {selectedJob && (
          <div
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            onClick={() => setSelectedJob(null)}
          >
            <div
              className="bg-white p-4 rounded-xl w-[85%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-2">
                <p>{selectedJob.nama}</p>
                <p className="font-bold">{selectedJob.qty}</p>
              </div>

              <hr className="mb-3" />

              {/* MENUNGGU */}
              {selectedJob.status === "menunggu" && (
                <>
                  {/* DETAIL */}
                  <div className="text-[11px] text-gray-600 space-y-1 mb-3">
                    <p>• Kode stok potongan</p>
                    <p>• Nama penjahit tujuan</p>
                  </div>

                  {/* INPUT KURIR */}
                  <input
                    placeholder="Nama Kurir"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 text-xs mb-3 outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={(e) =>
                      setForm({ ...form, kurir: e.target.value })
                    }
                  />

                  {/* ACTION BUTTON */}
                  <div className="flex gap-2">
                    {/* AMBIL JOB */}
                    <button
                      onClick={() => {
                        setJobs((prev) =>
                          prev.map((j) =>
                            j.id === selectedJob.id
                              ? {
                                  ...j,
                                  status: "proses",
                                  kurir: form.kurir,
                                }
                              : j,
                          ),
                        );
                        setSelectedJob(null);
                      }}
                      className="flex-1 bg-gray-800 text-white text-xs py-2 rounded-lg font-medium active:scale-95 transition"
                    >
                      AMBIL JOB
                    </button>

                    {/* TIDAK */}
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 bg-gray-200 text-gray-700 text-xs py-2 rounded-lg font-medium active:scale-95 transition"
                    >
                      TIDAK
                    </button>
                  </div>
                </>
              )}

              {/* PROSES */}
              {selectedJob.status === "proses" && (
                <>
                  <input
                    type="date"
                    className="w-full border mb-3 px-2 py-1 rounded"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tanggalKirim: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => {
                      setJobs((prev) =>
                        prev.map((j) =>
                          j.id === selectedJob.id
                            ? {
                                ...j,
                                status: "selesai",
                                tanggalKirim: form.tanggalKirim,
                              }
                            : j,
                        ),
                      );
                      setSelectedJob(null);
                    }}
                    className="bg-purple-500 text-white text-xs px-3 py-1 rounded float-right"
                  >
                    selesai
                  </button>
                </>
              )}

              {/* SELESAI */}
              {selectedJob.status === "selesai" && (
                <div className="text-xs space-y-1">
                  <p>KODE: {selectedJob.kode}</p>
                  <p>PENJAHIT: {selectedJob.penjahit}</p>
                  <p>KURIR: {selectedJob.kurir}</p>
                  <p>TGL KIRIM: {selectedJob.tanggalKirim}</p>

                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-3 w-full bg-gray-300 text-[10px] py-1 rounded"
                  >
                    close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
