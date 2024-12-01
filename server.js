import express from "express";
import bcrypt from "bcrypt";
import { mongo_conn, close_connection } from "./mongodb.js";

const APP = express();
const PORT = 3000;

APP.use(express.json());

// need to move these routes to their own files so the logic isnt all in this file
APP.get("/api/history", async (req, res) => {
    try {
        // reading params from url
        let { owner } = req.query;
        owner = parseInt(owner, 10);

        const conn = await mongo_conn();
        const collection = conn.collection("bookings");
        let data = await collection.find({
            owner: owner
        }).toArray();

        res.json(data);
    }
    catch(err) {
        res.status(500).send("unable to fetch data");
    }
});

APP.post("/api/signup", async(req, res) => {
    const { user, pass } = req.body;

    if (!user && !pass) {
        return res.status(400).send("bad request need a username and password");
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(pass, salt);
    
        const conn = await mongo_conn();
        const collection = conn.collection("users");
        
        // user already exists bad
        let found_user = await collection.findOne({user: user});
        if (found_user) {
            res.status(400).send("this user already exists");
            return;
        }

        const new_user = {
            user: user,
            pass: hashed,
            salt: salt
        }
    
        await collection.insertOne(new_user);
        res.status(201).send("user created successfully");
    }
    catch(err) {
        res.status(500).send("unable to create user");
        throw err;
    }
});


APP.post("/api/login", async (req, res) => {
    const { user, pass } = req.body;
    try {
        const conn = await mongo_conn();
        const collection = conn.collection("users");
        
        // fetching the salt and checking if user exists
        let found_user = await collection.findOne({user: user});
        if (!found_user) {
            res.status(400).send("user does not exist");
            return;
        }
        const salt = found_user.salt;
        const stored_hash = found_user.pass;
        const hashed = await bcrypt.hash(pass, salt);

        if (hashed != stored_hash) {
            res.status(400).send("incorrect password try again");
            return;
        }

        res.status(200).send("success logged in");
    }
    catch(err) {
        res.status(500).send("server error unable to login");
        throw err;
    }
});

APP.listen(PORT, () => {
    console.log(`api running at http://localhost:${PORT}`)
})

// shutdown mongodb on ctrlc
process.on("SIGINT", async () => {
    await close_connection();
    process.exit(0);
})