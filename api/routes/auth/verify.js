import { Router } from "express";
import auth from "../../../middleware/authenticate.js";
const router = Router();

router.get("/verify", auth, async (req, res) => {
    res.json({
        ok: true,
        message: "Verified successfully",
        user: req.user,
    });
});

export default router;
