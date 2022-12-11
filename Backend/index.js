import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import startup from "./start/routes.js";
import startDB from "./start/db.js";
dotenv.config();

const app = express();

app.use(cors());

startup(app);
startDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
