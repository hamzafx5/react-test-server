import mongoose from "mongoose";
import Joi from "Joi";

const joiPostSchema = Joi.object({
    featuredImage: Joi.string().required().label("Image url"),
    title: Joi.string().required().label("Title"),
    body: Joi.string().required().label("Body"),
    author: Joi.string(),
});

const postSchema = new mongoose.Schema({
    featuredImage: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Post = mongoose.model("post", postSchema);

export function validatePost(post) {
    return joiPostSchema.validate(post);
}

export default Post;
