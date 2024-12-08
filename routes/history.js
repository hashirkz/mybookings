import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();

ROUTER.get("/:user_id", async (req, res) => {
    try {
        let user_id = parseInt(req.params.user_id, 10);
        const conn = await mongo_conn();
        const collection = conn.collection("bookings");
        let data = await collection
            .find({
                user_id: user_id,
            })
            .toArray();

        res.json(data);
    } catch (err) {
        res.status(500).send("unable to fetch data");
    }
});

export default ROUTER;
