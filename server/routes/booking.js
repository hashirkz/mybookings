import dotenv from "dotenv";
dotenv.config();
import express from "express";
import verify_jwt from "../jwt.js";
import { v4 as uuidv4 } from "uuid";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();

/*
endpoint: /api/booking/:booking_id
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
PROTECTED
endpoint: /api/booking
method: POST
purpose: for creating a new booking owned by the logged in user

request_format: 
    {
        user: {
            user_id: "118",
            user: "admin",
        },
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
ROUTER.post("/", verify_jwt, async (req, res) => {
    try {
        const booking_id = uuidv4();
        const data = {
            ...req.body,
            user_id: req.user.user_id,
            booking_id: booking_id,
        };
        delete data.user;

        let conn = await mongo_conn();
        const collection = conn.collection("bookings");
        await collection.insertOne(data);
        res.status(201).json({
            status: "success",
            msg: "booking created successfully",
            data: {
                booking_id: booking_id,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to create new booking",
        });
    }
});

/*
PROTECTED
endpoint: /api/booking/:booking_id
method: DELETE
purpose: for deleting an existing booking

response format:
    {
        status: "",
        msg: ""
    }
*/
ROUTER.delete("/:booking_id", verify_jwt, async (req, res) => {
    try {
        const booking_id = req.params.booking_id;
        const user_id = req.user.user_id;
        let conn = await mongo_conn();
        const collection = conn.collection("bookings");

        const status = await collection.deleteOne({
            user_id: user_id,
            booking_id: booking_id,
        });

        if (status.deletedCount == 0) {
            return res.status(404).json({
                status: "error",
                msg: `unable to find booking ${booking_id}`,
            });
        }

        res.status(200).json({
            status: "success",
            msg: `deleted booking ${booking_id}`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to delete booking",
        });
    }
});

/*
PROTECTED
endpoint: /api/booking/:booking_id
method: PUT
purpose: for updating an existing booking

request_format: 
    {
        user: {
            user_id: "100",
            user: "admin",
        },
        name: "new name",
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
ROUTER.put("/:booking_id", verify_jwt, async (req, res) => {
    try {
        const booking_id = req.params.booking_id;
        const user_id = req.user.user_id;
        let conn = await mongo_conn();
        const collection = conn.collection("bookings");

        const status = await collection.updateOne(
            {
                booking_id: booking_id,
                user_id: user_id,
            },
            { $set: req.body }
        );

        if (status.modifiedCount == 0) {
            return res.status(404).json({
                status: "error",
                msg: `unable to find booking ${booking_id}`,
            });
        }

        res.status(200).json({
            status: "success",
            msg: `updated booking ${booking_id}`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to update booking",
        });
    }
});


export default ROUTER;
