import express from "express";
import { getLoggedInUser, logoutUser, signinUser, signupUser } from "../controllers/users.controller.js";
import authenticateToken from "../utils/authenticateToken.js";
const router = express.Router();

router.post("/register", signupUser);
router.get("/current-user", authenticateToken, getLoggedInUser);
router.post("/login",  signinUser);
router.post("/logout", logoutUser);

export default router;