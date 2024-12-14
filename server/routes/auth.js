import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";
import bcrypt from "bcrypt";

const ROUTER = express.Router();

/*
endpoint: /api/auth/signup
method: POST
purpose: for signing up new users

request format:
    {
        user: "username",
        pass: "password"
    }

response format:
    { 
        status: "", 
        msg: "" 
    }
*/
ROUTER.post("/signup", async (req, res) => {
    const { user, pass } = req.body;

    if (!user && !pass) {
        return res.status(400).json({
            status: "error",
            msg: "need username and password",
        });
    }

    try {
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        // user already exists bad
        let found_user = await collection.findOne({ user: user });
        if (found_user) {
            res.status(400).json({
                status: "error",
                msg: "this user already exists",
            });
            return;
        }

        const hashed = await bcrypt.hash(pass, 10);

        const new_user = {
            user: user,
            pass: hashed,
        };

        await collection.insertOne(new_user);
        res.status(201).json({
            status: "success",
            msg: "user created successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to create user",
        });
        throw err;
    }
});

/*
endpoint: /api/auth/login
method: POST
purpose: for logging in an existing user

request format:
    {
        user: "username",
        pass: "password"
    }

response format:
    { 
        status: "", 
        msg: "" 
    }
*/
ROUTER.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        // fetching the salt and checking if user exists
        let found_user = await collection.findOne({ user: user });
        if (!found_user) {
            res.status(400).json({
                status: "error",
                msg: "user does not exist",
            });
            return;
        }
        const stored_pass = found_user.pass;
        const same = await bcrypt.compare(pass, stored_pass);

        if (!same) {
            res.status(400).json({
                status: "error",
                msg: "incorrect password",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            msg: "user logged in successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to login",
        });
        throw err;
    }
});

export default ROUTER;
