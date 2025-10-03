import express from "express";
import authMiddlewre from "../middleWare/authMiddleware.js";
import { addSalary, getSalary } from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", authMiddlewre, addSalary);
router.get("/:id/:role", authMiddlewre, getSalary);

export default router;
