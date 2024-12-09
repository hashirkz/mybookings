import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { close_connection } from "./mongodb.js";
import { localhost } from "./utils.js";

import history_router from "./routes/history.js";
import booking_router from "./routes/booking.js";
import auth_router from "./routes/auth.js";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const APP = express();
APP.use(express.json());
APP.use(cors());

// ROUTES
APP.use("/api/history", history_router);
APP.use("/api/booking", booking_router);
APP.use("/api/auth", auth_router);

APP.listen(PORT, () => {
    console.log(
        `local: api running at http://${HOST}:${PORT}\n` +
            `network: api runnning at http://${localhost}:${PORT}`
    );
});

// shutdown mongodb on ctrlc
process.on("SIGINT", async () => {
    await close_connection();
    process.exit(0);
});
