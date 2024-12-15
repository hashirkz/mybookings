import dotenv from "dotenv";
dotenv.config();
import express from "express";
import verify_jwt from "../jwt.js";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();

/*
endpoint: /api/users/
method: DELETE
purpose: for deleting a logged in users account

response format:
    {
        status: "",
        msg: ""
    }
*/
ROUTER.delete("/", verify_jwt, async (req, res) => {
    try {
        let user_id = req.user.user_id;
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        const status = await collection.deleteOne({ user_id: user_id });

        if (status.deletedCount == 0) {
            return res.status(404).json({
                status: "error",
                msg: "user does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            msg: `deleted user ${user_id}!`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to delete user",
        });
    }
});

/*
PROTECTED
endpoint: /api/users/
method: PUT
purpose: for updating a logged in users account

request_format:
    {
        user: "admin"
    }
response format:
    {
        status: "",
        msg: ""
    }
*/
ROUTER.put("/", verify_jwt, async (req, res) => {
    try {
        let user_id = req.user.user_id;
        let new_user = req.body.user;
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        const status = await collection.updateOne(
            { user_id: user_id },
            { $set: { user: new_user } }
        );

        if (status.deletedCount == 0) {
            return res.status(404).json({
                status: "error",
                msg: "user does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            msg: `deleted user ${user_id}!`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to delete user",
        });
    }
});

export default ROUTER;