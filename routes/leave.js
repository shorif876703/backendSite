import express from "express";
import authMiddleware from "../middleWare/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", authMiddleware, getLeaves);
router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeave);
router.get("/detail/:id", authMiddleware, getLeaveDetail);
router.put("/:id", authMiddleware, updateLeave);

export default router;
