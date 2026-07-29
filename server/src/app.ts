import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "./config/env.js";
import healthRouter from "./routes/health.routes.js";

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/health", healthRouter);

export default app;
