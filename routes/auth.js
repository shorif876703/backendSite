import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddleware from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/verify", authMiddleware, verify);

export default router;
