import { Router } from "express";
import {
  createBillboard,
  deleteBillboard,
  getBillboard,
  getBillboards,
  updateBillBoard,
} from "../controller/billboard.controller.js";

const router = Router();

router.post("/", createBillboard);
router.get("/:id", getBillboard);
router.get("/all/:storeId", getBillboards);
router.delete("/:id", deleteBillboard);
router.put("/:id", updateBillBoard);

export default router;
