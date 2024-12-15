import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { mongo_conn } from "../mongodb.js";

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
            return res.status(400).json({
                status: "error",
                msg: "this user already exists",
            });
        }

        const hashed = await bcrypt.hash(pass, 10);
        const user_id = uuidv4();

        const new_user = {
            user: user,
            pass: hashed,
            user_id: user_id,
        };

        // create bearer jwt cookie
        const bearer_token = jwt.sign(
            {
                user_id: user_id,
                user: user,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        await collection.insertOne(new_user);
        res.status(201).json({
            status: "success",
            msg: "user created successfully",
            token: bearer_token,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to create user",
        });
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
            return res.status(400).json({
                status: "error",
                msg: "user does not exist",
            });
        }
        const stored_pass = found_user.pass;
        const same = await bcrypt.compare(pass, stored_pass);

        if (!same) {
            return res.status(400).json({
                status: "error",
                msg: "incorrect password",
            });
        }

        // create bearer jwt cookie
        const bearer_token = jwt.sign(
            {
                user_id: found_user.user_id,
                user: found_user.user,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            status: "success",
            msg: "user logged in successfully",
            token: bearer_token,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "server error unable to login",
        });
    }
});

export default ROUTER;
