import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { prisma } from './lib/prisma.js';
import TrackLog from './lib/trackLog.js';
import { StatusPermintaan } from './generated/prisma/browser.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'; // PERBAIKAN: Cara import dotenv di ES Modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/authRoutes.js';
import potongRoutes from './routes/potongRoutes.js';
import stokPotongRoutes from './routes/stokPotongRoutes.js';
import kurirRoutes from './routes/kurirRoutes.js';
import penjahitRoutes from './routes/penjahitRoutes.js';
import qcRoutes from './routes/qcRoutes.js';
import stokGudangRoutes from './routes/stokGudangRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// // Dynamic Swagger Configuration
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Alam Jaya Textile API',
//       version: '1.0.0',
//       description: 'A simple Express API documented with Swagger',
//     },
//     servers: [], // Diisi dinamis oleh middleware di bawah
//   },
//   // PERBAIKAN: Vercel menggunakan file hasil compile (.js), lokal pakai .ts
//   apis: [
//     path.join(__dirname, './routes/*.ts'), 
//     path.join(__dirname, './routes/*.js'),
//     path.join(__dirname, './index.ts'),
//     path.join(__dirname, './index.js')
//   ],
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// // Middleware Swagger
// app.use(
//   '/api-docs',
//   (req: Request, res: Response, next: NextFunction) => {
//     const protocol = req.headers['x-forwarded-proto'] || req.protocol;
//     const host = req.get('host');
//     const fullUrl = `${protocol}://${host}`;
//     (swaggerSpec as any).servers = [{ url: fullUrl }];
//     next();
//   },
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );

const urlServerSwagger =
  process.env.NODE_ENV == "production"
    ? "https://api-alam.vercel.app/"
    : "http://localhost:3001";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alam Jaya Textile API",
      version: "1.0.0",
      description: "A simple Express API documented with Swagger",
    },
    servers: [
      {
        url: urlServerSwagger,
      },
    ],
  },
  // Path to the API docs (files containing @swagger comments)
  apis: ["./src/routes/*.ts", "./src/index.ts" , "./dist/routes/*.js", "./dist/index.js"],
};

console.log(urlServerSwagger);

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API Alam Jaya Textile' });
});

// ======= DEBUGGING backdoor =======

/**
 * @swagger
 * /create/permintaan:
 *   post:
 *     summary: BACKDOOR - Buat Permintaan Ke Gudang (Debugging Endpoint)
 *     description: RESI mengirimkan data permintaan ke GUDANG
 *     tags: [Debugging]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaBarang:
 *                 type: string
 *               kategori:
 *                 type: string
 *               jenisPermintaan:
 *                 type: string
 *               ukuran:
 *                 type: string
 *               isUrgent:
 *                 type: boolean
 *               jumlahMinta:
 *                 type: integer
 *           example:
 *             namaBarang: "Hoodie Green Navy"
 *             kategori: "hoodie"
 *             jenisPermintaan: "RESI"
 *             ukuran: "L"
 *             isUrgent: false
 *             jumlahMinta: 20
 *     responses:
 *       201:
 *         description: Permintaan produk berhasil dibuat
 *         content:
 *           application/json:
 *             example:
 *               message: "Permintaan produk berhasil dikirim"
 *               status: "MENUNGGU_GUDANG"
 */

app.post("/create/permintaan", async (req, res) => {
  try {
    const {
      namaBarang,
      kategori,
      jenisPermintaan,
      ukuran,
      isUrgent,
      jumlahMinta,
    } = req.body;

    const kategoriId = await prisma.kategori.findUnique({
      where: { slug: kategori },
    });

    if (!kategoriId) {
      return res.status(400).json({ message: "Kategori tidak ditemukan" });
    }

    const newPermintaan = await prisma.permintaan.create({
      data: {
        namaBarang,
        kategoriId: kategoriId?.id, // Gunakan ID kategori yang ditemukan atau fallback ke kategori hoodie
        jenisPermintaan,
        ukuran,
        isUrgent,
        jumlahMinta,
        status: "MENUNGGU_GUDANG",
      },
    });
    await TrackLog.logPermintaan(newPermintaan.id, "Permintaan produk berhasil dibuat", StatusPermintaan.MENUNGGU_GUDANG);
    await TrackLog.logStatus(newPermintaan.id, StatusPermintaan.MENUNGGU_GUDANG);
    return res.json({
      message: "Permintaan produk berhasil dikirim",
      status: StatusPermintaan.MENUNGGU_GUDANG,
      newPermintaan,
    });
  } catch (error) {
    console.error("Error creating permintaan:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  // Di sini Anda bisa menambahkan logika untuk menyimpan data permintaan ke database
});
// ================================

// API Routes
app.use('/auth', authRoutes);
app.use('/potong', potongRoutes);
app.use('/stokpotong', stokPotongRoutes);
app.use('/kurir', kurirRoutes);
app.use('/penjahit', penjahitRoutes);
app.use('/qc', qcRoutes);
app.use('/stokgudang', stokGudangRoutes);

// Server Start (Hanya untuk Lokal)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
