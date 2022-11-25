import { Router } from "express";
const router = Router();

router.delete("/logout", async (req, res) => {
    res.clearCookie("accessToken").send("Logged out");
});

export default router;
