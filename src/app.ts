import express, { Application, Response } from "express";
import cors from "cors";

import { config } from './config/env.config.js'
import { authRouter } from "./routes/auth.router.js";

export const app: Application = express();

const port = config.app.port || 8081;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.disable("x-powered-by");

app.get("/api/health", (_, res: Response) => {
  return res
    .status(200)
    .json({ code: 200, message: "Server is running successfully 🚀" });
});


app.use('/auth', authRouter)


app.listen(port, () => {
  console.log(`🚀 SERVER AT http://localhost:${port}`);
});
