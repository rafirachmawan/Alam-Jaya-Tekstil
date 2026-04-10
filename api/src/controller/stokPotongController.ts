import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
// import { UkuranProduk } from "../generated/prisma/enums";
export default class StokPotongController {
  public static async getDataMenunggu(req: Request, res: Response) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Implementation for fetching selesai data
        const selesaiData = await tx.permintaan.findMany({
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
                kodeKain: true,
                jumlahHasil: true,
              },
            },
          },
        });
        return { selesaiData };
      });

      const data = result.selesaiData.map((item: any) => ({
        idPermintaan: item.id,
        namaBarang: item.namaBarang,
        ukuran: item.ukuran,
        pemotong: item.stokPotong.pemotong.map((p: any) => p.user.nama),
        kodeKain: item.stokPotong.kodeKain,
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
