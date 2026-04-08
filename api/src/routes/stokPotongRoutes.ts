import { Router } from "express";
import StokPotong from "../controller/stokPotongController";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: StokPotong
 *   description: Divisi Stok Potong (Menunggu, Proses, Data Stok , Selesai)
 */

// router.get("/kategori", StokPotong.getKategori);

/**
 * @swagger
 * /stokpotong/menunggu:
 *   get:
 *     summary: Mendapatkan List Potong (Tab Menunggu)
 *     tags: [StokPotong]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id_permintaan: "dfc3712e-fe64-4343-a275-5b2de4ad8615"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 kode_kain: "AD-0123"
 *                 pemotong: "Budi"
 *                 jumlah_hasil: 20
 *                 tanggal_selesai_potong: "2023-01-01T00:00:00.000Z"
 *               - id_permintaan: "dfc3712e-fe64-4343-a275-5b2de4kjnnas"
 *                 namaBarang: "Hoodie Black gray"
 *                 ukuran: "L"
 *                 kode_kain: "AD-0125"
 *                 pemotong: "Budi"
 *                 jumlah_hasil: 20
 *                 tanggal_selesai_potong: "2023-01-01T00:00:00.000Z"
 */

router.get("/stok/menunggu", () => {});

/**
 * @swagger
 * /stokpotong/menunggu:
 *   put:
 *     summary: Mendapatkan List Riwayat (Tab Selesai)
 *     tags: [StokPotong]
 *     responses:
 *       200:
 *         description: Daftar riwayat pekerjaan yang sudah selesai
 *         content:
 *           application/json:
 *             example:
 *               - id_permintaan: "dfc3712e-fe64-4343-a275-5b2de4ad8615"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 kode_kain: "AD-0123"
 *                 pemotong: "Budi"
 *                 jumlah_hasil: 20
 *                 tanggal_selesai_potong: "2023-01-01T00:00:00.000Z"
 *               - id_permintaan: "dfc3712e-fe64-4343-a275-5b2de4kjnnas"
 *                 namaBarang: "Hoodie Black gray"
 *                 ukuran: "L"
 *                 kode_kain: "AD-0125"
 *                 pemotong: "Budi"
 *                 jumlah_hasil: 20
 *                 tanggal_selesai_potong: "2023-01-01T00:00:00.000Z"
 */

router.put("/pengecekan/:id_stok_potong", StokPotong.putStokPotong);
router.get("/stok/:slug", StokPotong.getStokPotong);
router.get("/pengecekan", StokPotong.getStokProsesPengecekan);

export default router;
