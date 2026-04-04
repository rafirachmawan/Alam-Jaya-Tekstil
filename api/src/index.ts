import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.use(postRoutes);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
