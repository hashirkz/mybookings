import dotenv from "dotenv";
dotenv.config();
import express, { Router } from "express";
import verify_jwt from "../jwt.js";
import { v4 as uuidv4 } from "uuid";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();

/*
PROTECTED
endpoint: /api/request
method: POST
purpose: for creating a new request

request format:
    { 
        status: "", 
        msg: "",
        data: {
            recipient_id: some user_id
            ... other details ... 
        }
    }
*/
ROUTER.post("/", verify_jwt, async (req, res) => {
    try {
        const request_id = uuidv4();
        let conn = await mongo_conn();
        const collection = conn.collection("requests");
        const data = {
            ...req.body,
            requestId: request_id,
            user_id: req.user.user_id,
        }
        delete data.user;
        await collection.insertOne(data);

        res.status(201).json({
            status: "success",
            msg: `created new request ${request_id}`,
            data: { request_id },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to create request",
        });
    }
});


/*
endpoint: /api/request/:request_id
method: GET
purpose: for fetching a request from its request_id

response format:
    { 
        status: "", 
        msg: "",
        data: {
            ... empty or the found booking ...
        }
    }
*/
ROUTER.get("/:request_id", async (req, res) => {
    try {
        const request_id = req.params.request_id;
        let conn = await mongo_conn();
        const collection = conn.collection("requests");

        let data = await collection.findOne({
            requestId: request_id,
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
endpoint /api/request?type=recipient
method: GET
purpose: for fetching all requests that this user is a recipient of
*/
ROUTER.get("/", verify_jwt, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        let conn = await mongo_conn();
        const collection = conn.collection("requests");

        const data = await collection.find({
            recipientId: user_id,
        }).toArray();

        res.status(200).send({
            status: "success",
            msg: "found all requests for this recipient",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to find requests",
        });
    }
})

/*
PROTECTED
endpoint: /api/request/:request_id
method: DELETE
purpose: to allow a recipient to delete a request that was sent to them 
*/
ROUTER.delete("/:request_id", verify_jwt, async (req, res) => {
    try {
        const request_id = req.params.request_id;
        const user_id = req.user.user_id;
        let conn = await mongo_conn();
        const collection = conn.collection("requests");

        const status = await collection.deleteOne({
            requestId: request_id,
            recipientId: user_id
        })

        if (status.deletedCount == 0) {
            return res.status(404).json({
                status: "error",
                msg: `no such request ${request_id}`
            });
        }
        res.status(200).send({
            status: "success",
            msg: `successfully deleted ${request_id}`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to delete request",
        });
    }
});

export default ROUTER;

