import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";
import bcrypt from "bcrypt";

const ROUTER = express.Router();

ROUTER.post("/signup", async (req, res) => {
    const { user, pass } = req.body;

    if (!user && !pass) {
        return res.status(400).send("bad request need a username and password");
    }

    try {
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        // user already exists bad
        let found_user = await collection.findOne({ user: user });
        if (found_user) {
            res.status(400).send("this user already exists");
            return;
        }

        const hashed = await bcrypt.hash(pass, 10);

        const new_user = {
            user: user,
            pass: hashed,
        };

        await collection.insertOne(new_user);
        res.status(201).send("user created successfully");
    } catch (err) {
        res.status(500).send("unable to create user");
        throw err;
    }
});

ROUTER.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
        const conn = await mongo_conn();
        const collection = conn.collection("users");

        // fetching the salt and checking if user exists
        let found_user = await collection.findOne({ user: user });
        if (!found_user) {
            res.status(400).send("user does not exist");
            return;
        }
        const stored_pass = found_user.pass;
        const same = await bcrypt.compare(pass, stored_pass);

        if (!same) {
            res.status(400).send("incorrect password try again");
            return;
        }

        res.status(200).send("success logged in");
    } catch (err) {
        res.status(500).send("server error unable to login");
        throw err;
    }
});

export default ROUTER;
