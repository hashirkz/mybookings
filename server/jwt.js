import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const verify_jwt = (req, res, next) => {
    const bearer_token = req.headers["authorization"]?.split(" ")[1];
    if (!bearer_token) {
        res.status(401).json({
            status: "error",
            msg: "missing jwt cookie",
        });
        return;
    }

    try {
        const decrypted = jwt.verify(bearer_token, process.env.JWT_SECRET_KEY);
        req.user = decrypted;
        next();
    } catch (err) {
        res.status(403).json({
            status: "error",
            msg: "invalid or expired jwt cookie",
        });
    }
};

export default verify_jwt;
