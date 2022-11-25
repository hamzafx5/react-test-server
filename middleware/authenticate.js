import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

export default function auth(req, res, next) {
    const token = req.header("Authorization");
    if (token) {
        jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
