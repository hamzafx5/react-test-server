import { Router } from "express";
const router = Router();

import register from "./routes/auth/register.js";
import login from "./routes/auth/login.js";
import verify from "./routes/auth/verify.js";
import posts from "./routes/posts.js";

router.get("/test", (_, res) => {
    res.send("API is running... ✔👍👍😂");
});

router.use("/auth", register);
router.use("/auth", login);
router.use("/auth", verify);
router.use("/posts", posts);

export default router;
