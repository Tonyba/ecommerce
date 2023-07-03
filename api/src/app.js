import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import StoreRoutes from "./routes/store.route.js";
import BillboardRoutes from "./routes/billboard.route.js";

import { Store } from "./models/Store.js";
import { Billboard } from "./models/BillBoard.js";

const urlPrefix = "api";
const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

Store.hasMany(Billboard);
Billboard.belongsTo(Store);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "x-auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

app.use(`/${urlPrefix}/store`, StoreRoutes);
app.use(`/${urlPrefix}/billboard`, BillboardRoutes);

export default app;
