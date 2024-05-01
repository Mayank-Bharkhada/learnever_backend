import express from "express";
import cors from "cors";
import { config } from './config/env.config.js';
import { authRouter } from "./routes/auth.router.js";
export var app = express();
var port = config.app.port || 8081;
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.disable("x-powered-by");
app.get("/api/health", function(_, res) {
    return res.status(200).json({
        code: 200,
        message: "Server is running successfully 🚀"
    });
});
app.use('/auth', authRouter);
app.listen(port, function() {
    console.log("\uD83D\uDE80 SERVER AT http://localhost:".concat(port));
});
