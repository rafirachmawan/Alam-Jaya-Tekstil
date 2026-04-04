import express from "express";
import type { Request, Response } from "express";
import { prisma } from "./lib/prisma";
const app = express();
const port = 3000;

// Definisi route utama
app.get('/', async (req: Request, res: Response) => {
  try {
    const allPosts = await prisma.post.findMany();

    res.json({
      message: "Success",
      data: allPosts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching posts"
    });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
