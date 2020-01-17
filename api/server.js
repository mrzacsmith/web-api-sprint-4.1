const express = require("express");
const helmet = require("helmet");

const apiRouter = require("./router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api", apiRouter);

// sanity check route
server.get("/", (req, res) => {
    res.status(200).json({ hello: "World!" });
});

module.exports = server;
