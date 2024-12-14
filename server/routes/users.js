import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongo_conn } from "../mongodb.js";

const ROUTER = express.Router();
