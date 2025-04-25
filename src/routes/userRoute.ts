import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController";
import {isAuthenticated } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-session", isAuthenticated, (req, res) => {
    res.json({isLoggedIn: true, user_id: req.session.id_user }); // Protetto dal middleware
});

export default router;