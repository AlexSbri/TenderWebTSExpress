"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "napoli",
    port: 5432,
});
pool.on("connect", (Client) => {
    Client.query("set search_path to tender_web");
});
exports.default = pool;
