import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";
import verify_jwt from "../jwt.js";

const ROUTER = express.Router();

/*
PROTECTED
endpoint: /api/history
params: ?type = created|invited
method: GET
purpose: for fetching a users booking history by their user_id

response format:
    { 
        status: "", 
        msg: "",
        data: [
            ... empty or an array of found bookings ...
        ] 
    }
*/
ROUTER.get("/", verify_jwt, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const type = req.query.type;

        if (type != "created" && type != "invited") {
            return res.status(400).send({
                status: "error",
                msg: `unknown parameter ${type} only ?type=created|invited allowed`,
            });
        }

        const q =
            type == "created"
                ? { user_id: user_id }
                : { invited: { $in: [user_id] } };

        const conn = await mongo_conn();
        const collection = conn.collection("bookings");
        let data = await collection.find(q).toArray();

        res.status(200).json({
            status: "success",
            msg: "found bookings",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to find bookings",
        });
    }
});

export default ROUTER;
