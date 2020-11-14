const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projectsRouter.js");
const actionsRouter = require("./actionsRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// sanity check route
server.get("/", (req, res) => {
    res.status(200).json({ hello: "World!" });
});

module.exports = server;
