import express from "express";
import authMiddleware from "../middleWare/authMiddleware.js";
import { getSummery } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/summery", authMiddleware, getSummery);

export default router;
