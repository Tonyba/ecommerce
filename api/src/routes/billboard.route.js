import { Router } from "express";
import {
  createBillboard,
  deleteStore,
  getBillboard,
  updateStore,
} from "../controller/billboard.controller.js";

const router = Router();

router.post("/", createBillboard);
router.get("/:id", getBillboard);
router.delete("/:id", deleteStore);
router.put("/:id", updateStore);

export default router;
