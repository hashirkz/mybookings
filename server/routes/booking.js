import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";
import { gen_uuid } from "../utils.js";

const ROUTER = express.Router();

/*
endpoint: /api/booking/<booking_id>
method: GET
purpose: for fetching a booking from its booking_id

response format:
    { 
        status: "", 
        msg: "",
        data: {
            ... empty or the found booking ...
        }
    }
*/
ROUTER.get("/:booking_id", async (req, res) => {
    try {
        const booking_id = req.params.booking_id;
        let conn = await mongo_conn();
        const collection = conn.collection("bookings");

        let data = await collection.findOne({
            booking_id: booking_id,
        });

        res.status(200).json({
            status: "success",
            msg: "found booking",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to find booking",
        });
    }
});

/*
endpoint: /api/booking
method: POST
purpose: for creating a new booking

request_format: 
    {
        user_id: 118,
        name: "csus party",
        start: "2024-12-01 20:00",
        end: "2024-12-02 1:00",
        invited: [119, 222],
        attachments: [
            "https://cs.mcgill.ca/newsletter",
            "https://anotherfakelinkidk",
        ]
    }

response format:
    {
        status: "",
        msg: ""
    }
*/
ROUTER.post("/", async (req, res) => {
    try {
        const uuid = gen_uuid();
        const data = {
            ...req.body,
            booking_id: uuid,
        };

        let conn = await mongo_conn();
        const collection = conn.collection("bookings");
        await collection.insertOne(data);
        res.status(201).json({
            status: "success",
            msg: "booking created successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to create new booking",
        });
    }
});

export default ROUTER;
