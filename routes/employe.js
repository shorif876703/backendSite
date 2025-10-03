import express from "express";
import authMiddlewre from "../middleWare/authMiddleware.js";
import {
  addEmploye,
  upload,
  getEmployes,
  getEmploye,
  updateEmploye,
  fetchEmployesByDepId,
} from "../controllers/employeController.js";

const router = express.Router();

router.get("/", authMiddlewre, getEmployes);
router.post("/add", authMiddlewre, upload.single("image"), addEmploye);
router.get("/:id", authMiddlewre, getEmploye);
router.put("/:id", authMiddlewre, updateEmploye);
router.get("/department/:id", authMiddlewre, fetchEmployesByDepId);

export default router;
