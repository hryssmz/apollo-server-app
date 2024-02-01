// app.ts
import express from "express";
import cors from "cors";
import { NODE_ENV } from "./utils/env";
import indexRouter from "./routes";

const app = express();

app.use(cors({ origin: NODE_ENV === "development" }));
app.use(express.json());
app.use(indexRouter);

export default app;
