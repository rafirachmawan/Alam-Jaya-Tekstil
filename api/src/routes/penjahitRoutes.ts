import { Router } from "express";
import StokPotong from "../controller/stokPotongController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Penjahit
 *   description: Divisi Penjahit (Menunggu, Proses, Selesai)
 */

/**
 * @swagger
 * /penjahit/menunggu:
 *   get:
 *     summary: Mendapatkan List Pekerjaan (Tab Menunggu)
 *     tags: [Penjahit]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id_proses_stok_potong: "pnh-001"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 jumlah: 31
 *                 kodeStokPotongan: "AD-0123-A1"
 *                 tanggalKirim: "2023-10-27"
 */
router.get("/menunggu", () => {});

/**
 * @swagger
 * /penjahit/menunggu/{id_proses_stok_potong}:
 *   put:
 *     summary: Konfirmasi Ambil Pekerjaan (Tombol Proses)
 *     tags: [Penjahit]
 *     parameters:
 *       - in: path
 *         name: id_proses_stok_potong
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pekerjaan berhasil diambil
 *         content:
 *           application/json:
 *             example:
 *               message: "Pekerjaan dimulai"
 *               status: "PROSES_JAHIT"
 */
router.put("/menunggu/:id_proses_stok_potong", () => {});

/**
 * @swagger
 * /penjahit/proses:
 *   get:
 *     summary: Mendapatkan List Pekerjaan Sedang Dijahit (Tab Proses)
 *     tags: [Penjahit]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id_proses_stok_potong: "40ea5347-a01f-46e1-a843-194effa93c1f"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 jumlahLolos: 31
 *                 kodeStokPotongan: "AD-0123-A1"
 *                 tanggalMulaiJahit: "2023-10-27T08:00:00Z"
 *                 status: "DIKERJAKAN"
 *               - id_proses_stok_potong: "3d52b6ff-d86a-45b2-a0e7-b1cd659027c6"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 jumlahLolos: 31
 *                 kodeStokPotongan: "AD-0123-A3"
 *                 tanggalMulaiJahit: "2023-10-27T08:00:00Z"
 *                 status: "JEDA"
 */

router.get("/proses", () => {});

/**
 * @swagger
 * /penjahit/proses/dikerjakan/{id_proses_stok_potong}:
 *   put:
 *     summary: Konfirmasi Proses jahit Dikerjakan(Tombol Proses)
 *     tags: [Penjahit]
 *     parameters:
 *       - in: path
 *         name: id_proses_stok_potong
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hasil jahit berhasil disimpan
 *         content:
 *           application/json:
 *             example:
 *               message: "Potongan sedang dijahit"
 *               statusJahit: "DIKERJAKAN"
 *               status: "PROSES_JAHIT"
 */

router.put("/proses/dikerjakan/:id_proses_stok_potong", () => {});

/**
 * @swagger
 * /penjahit/proses/jeda/{id_proses_stok_potong}:
 *   put:
 *     summary: Konfirmasi Proses jahit Di Jeda (Tombol Jeda)
 *     tags: [Penjahit]
 *     parameters:
 *       - in: path
 *         name: id_proses_stok_potong
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hasil jahit berhasil disimpan
 *         content:
 *           application/json:
 *             example:
 *               message: "Potongan sedang dijeda"
 *               statusJahit: "JEDA"
 *               status: "JEDA_JAHIT"
 */

router.put("/proses/jeda/:id_proses_stok_potong", () => {});


/**
 * @swagger
 * /penjahit/proses/{id_proses_stok_potong}:
 *   put:
 *     summary: Input Hasil Jahit & Selesai (Tombol Selesai)
 *     tags: [Penjahit]
 *     parameters:
 *       - in: path
 *         name: id_proses_stok_potong
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jumlahSelesaiJahit:
 *                 type: integer
 *               catatan:
 *                 type: string
 *           example:
 *             jumlahSelesaiJahit: 25
 *             catatan: "Sisa kain kurang"
 *     responses:
 *       200:
 *         description: Hasil jahit berhasil selesai
 *         content:
 *           application/json:
 *             example:
 *               message: "Data jahit berhasil diselesaikan"
 *               status: "MENUNGGU_QC"
 */

router.put("/proses/:id_proses_stok_potong", () => {});

/**
 * @swagger
 * /penjahit/selesai:
 *   get:
 *     summary: Mendapatkan List Riwayat Pekerjaan (Tab Selesai)
 *     tags: [Penjahit]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id_proses_stok_potong: "pnh-001"
 *                 namaBarang: "Hoodie Green Navy"
 *                 ukuran: "L"
 *                 jumlahSelesai: 25
 *                 tanggalSelesai: "2023-10-27T15:00:00Z"
 *                 catatan: "Sisa kain kurang"
 */
router.get("/selesai", () => {});








export default router;