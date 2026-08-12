import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "./config/env.js";
import healthRouter from "./routes/health.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import authRouter from "./features/auth/auth.routes.js";
import tripRouter from "./features/trips/trip.routes.js";
import destinationRouter from "./features/destinations/destination.routes.js";

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api/destinations", destinationRouter);
app.use(errorMiddleware);

export default app;
