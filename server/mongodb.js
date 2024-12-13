import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

let CONN = null;
let CLIENT = null;
// returns mongosh conn handle
// NEEDS TO BE CLOSED BY USER ON CLEANUP
let mongo_conn = async () => {
    if (CONN) return CONN;

    try {
        const mongo = new MongoClient(MONGO_URL);
        await mongo.connect();
        CONN = mongo.db(MONGO_DB);
        console.log("mongodb connected");

        return CONN;
    }
    catch (err) {
        console.error("unable to connect to mongodb", err);
        process.exit(1);
    }
}

let close_connection = async () => {
    if (!CLIENT) return;
    await CLIENT.close();
    CLIENT = null;
    CONN = null;

    console.log("mongo connection closed");
}

export { mongo_conn, close_connection };