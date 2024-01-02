import express from "express";
import { signUp, login, refresh, logout } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
