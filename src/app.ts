import express from "express";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);

export default app;
