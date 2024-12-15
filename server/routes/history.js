import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";
import verify_jwt from "../jwt.js";

const ROUTER = express.Router();

/*
PROTECTED
endpoint: /api/history
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
        let user_id = req.user.user_id;
        const conn = await mongo_conn();
        const collection = conn.collection("bookings");
        let data = await collection
            .find({
                user_id: user_id,
            })
            .toArray();

        res.status(200).json({
            status: "success",
            msg: "users booking history found successfully",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "unable to fetch data",
        });
    }
});

export default ROUTER;
