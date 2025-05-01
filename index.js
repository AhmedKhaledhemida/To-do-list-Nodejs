// Erroe Not handeld before
process.on("uncaughtException", (err) => {
  console.log({ error: err });
});
import express from "express";
import { bootstrap } from "./src/bootstrap.js";
import { db } from "./Database/dbConnection.js";
import { globalError } from "./src/Utils/globalError.js";
import "dotenv/config";
import { AppError } from "./src/Utils/appError.js";
import cors from "cors";
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
bootstrap(app);
// to get error of the root
app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);
// Error not handeld before
process.on("unhandledRejection", (err) => {
  console.log({ error: err });
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
