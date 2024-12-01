import { MongoClient } from "mongodb";

const IP = "192.168.2.234";
const PORT = 27017;
const DB = "mybookings"
const MONGO_URL = `mongodb://${IP}:${PORT}`;

let CONN = null;
let CLIENT = null;
// returns mongosh conn handle
// NEEDS TO BE CLOSED BY USER ON CLEANUP
let mongo_conn = async () => {
    if (CONN) return CONN;

    try {
        const mongo = new MongoClient(MONGO_URL);
        await mongo.connect();
        CONN = mongo.db(DB);
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