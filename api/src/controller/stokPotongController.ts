import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { StatusPermintaan, StatusStokPotong } from "../generated/prisma/enums";
import TrackLog from "../lib/trackLog";
// import { UkuranProduk } from "../generated/prisma/enums";
export default class StokPotongController {
  public static async getDataMenunggu(req: Request, res: Response) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Implementation for fetching selesai data
        const dataMenunggu = await tx.permintaan.findMany({
          where: { status: "MENUNGGU_STOK_POTONG" },
          select: {
            id: true,
            namaBarang: true,
            ukuran: true,
            tanggalMasuk: true,
            stokPotong: {
              select: {
                pemotong: {
                  select: {
                    user: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
                id: true,
                kodeKain: true,
                jumlahHasil: true,
              },
            },
          },
        });
        return { dataMenunggu };
      });

      const data = result.dataMenunggu.map((item: any) => ({
        idPermintaan: item.id,
        idStokPotong: item.stokPotong.id,
        namaBarang: item.namaBarang,
        ukuran: item.ukuran,
        kodeKain: item.stokPotong.kodeKain,
        pemotong: item.stokPotong.pemotong.map((p: any) => p.user.nama),
        jumlahHasil: item.stokPotong.jumlahHasil,
        tanggalSelesaiPotong: item.tanggalMasuk,
      }));

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching selesai data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async updateStatusMenunggu(req: Request, res: Response) {
    try {
      const { idStokPotong } = req.params;
      if (!idStokPotong) {
        return res
          .status(400)
          .json({ message: "ID stok potong tidak ditemukan" });
      }

      if (Array.isArray(idStokPotong)) {
        // Handle the case where idStokPotong is an array
        return res
          .status(400)
          .json({ message: "ID stok potong must be a single value" });
      }

      const updatedStokPotong = await prisma.stokPotong.update({
        where: { id: String(idStokPotong) },
        data: { status: "PROSES" },
        select: {
          permintaan: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!updatedStokPotong) {
        return res.status(404).json({ message: "Stok potong tidak ditemukan" });
      }

      await TrackLog.logPermintaan(
        String(updatedStokPotong.permintaan.id),
        "Stok potong sedang diproses pengecekan oleh Divisi Stok Potong",
        StatusPermintaan.PROSES_STOK_POTONG,
      );

      await prisma.permintaan.update({
        where: { id: updatedStokPotong.permintaan.id },
        data: { status: StatusPermintaan.PROSES_STOK_POTONG },
      });

      return res.status(200).json({
        message: "Potong sedang diproses pengecekan oleh divisi Stok Potong",
        status: "PROSES_STOK_POTONG",
      });
    } catch (error) {
      console.error("Error updating stok potong:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async getDataProses(req: Request, res: Response) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Implementation for fetching selesai data
        const dataProses = await tx.permintaan.findMany({
          where: { status: "PROSES_STOK_POTONG" },
          select: {
            id: true,
            namaBarang: true,
            ukuran: true,
            tanggalMasuk: true,
            stokPotong: {
              select: {
                pemotong: {
                  select: {
                    user: {
                      select: {
                        nama: true,
                      },
                    },
                  },
                },
                id: true,
                kodeKain: true,
                jumlahHasil: true,
              },
            },
          },
        });
        return { dataProses };
      });

      const data = result.dataProses.map((item: any) => ({
        idPermintaan: item.id,
        idStokPotong: item.stokPotong.id,
        namaBarang: item.namaBarang,
        ukuran: item.ukuran,
        kodeKain: item.stokPotong.kodeKain,
        pemotong: item.stokPotong.pemotong.map((p: any) => p.user.nama),
        jumlahHasil: item.stokPotong.jumlahHasil,
        tanggalSelesaiPotong: item.tanggalMasuk,
      }));

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching selesai data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
