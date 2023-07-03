import { Router } from "express";
import {
  createStore,
  deleteStore,
  getStoreByIdOrUserId,
  getStoreByUserId,
  getStores,
  updateStore,
} from "../controller/store.controller.js";

const router = Router();

router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);
router.get("/:id", getStoreByIdOrUserId);
router.get("/user/:userId", getStoreByUserId);
router.get("/all/:userId", getStores);

export default router;
