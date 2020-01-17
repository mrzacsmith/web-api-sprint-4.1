const router = require("express").Router();

const projectsRouter = require("../projects/router.js");
const actionsRouter = require("../actions/router.js");

router.use("/projects", projectsRouter);
router.use("/actions", actionsRouter);

module.exports = router;
