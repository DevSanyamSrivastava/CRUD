import express from "express";
import { registerEmployee, loginEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

export default router;
