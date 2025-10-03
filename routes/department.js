import express from "express";
import authMiddlewre from "../middleWare/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", authMiddlewre, getDepartments);
router.post("/add", authMiddlewre, addDepartment);
router.get("/:id", authMiddlewre, getDepartment);
router.put("/:id", authMiddlewre, updateDepartment);
router.delete("/:id", authMiddlewre, deleteDepartment);

export default router;
