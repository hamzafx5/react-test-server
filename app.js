import { config } from "dotenv";
config();
import connect from "./config/mongoDB.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "./api/index.js";
import notFound from "./middleware/notFound.js";
import serverError from "./middleware/serverError.js";
import normalizeReqBody from "./middleware/normalizeReqBody.js";
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(normalizeReqBody);
// Connect to the mongoDB Database
await connect();

app.use("/api/v1", api);

app.all("*", notFound);
app.use(serverError);

export default app;
