import { Router } from "express";
import auth from "../../middleware/authenticate.js";
const router = Router();
import Post, { validatePost } from "../../modules/Posts.module.js";

router.get("/", auth, async (req, res) => {
    const posts = await Post.find();
    res.json({
        ok: true,
        data: posts,
    });
});

router.post("/", auth, async (req, res) => {
    const reqPost = {
        featuredImage: (req.body.featuredImage || "").trim(),
        title: (req.body.title || "").trim(),
        body: (req.body.body || "").trim(),
        author: req.user.fullName,
    };
    const { error } = validatePost(reqPost);
    if (error) {
        const { message, context } = error.details[0];
        return res.status(400).json({
            ok: false,
            message: message,
            filed: context.key,
        });
    }

    const post = await new Post(reqPost).save();
    res.status(201).json({ ok: true, post });
});

router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const result = await Post.findByIdAndDelete(postId);
    if (!result) {
        return res.status(404).json({
            ok: false,
            message: 'There is no post with this id "' + (postId || "") + '"',
        });
    }
    res.json({
        ok: true,
        _id: result._id,
    });
});

export default router;
