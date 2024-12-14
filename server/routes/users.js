import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();

/*
endpoint: /api/users/:user_id
method: DELETE
purpose: for deleting an existing user

response format:
    {
        status: "",
        msg: ""
    }
*/
ROUTER.delete("/:user_id", async (req, res) => {
    try {
        let user_id = req.params.user_id;
        const conn = await mongo_conn();
        const collection = conn.collection("users");
        
        const status = await collection.deleteOne({user_id: user_id});
        
        if (status.deletedCount != 1) {
            res.status(400).json({
                status: "error",
                msg: "user does not exist",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            msg: `deleted user ${user_id}!`
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to delete user",
        });
    }
});

export default ROUTER;