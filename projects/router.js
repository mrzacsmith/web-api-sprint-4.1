const router = require("express").Router();

const Projects = require("../data/helpers/projectModel.js");

router.get("/", async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "We ran into an error retrieving the projects",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "We could not find the project" });
        }
    } catch (error) {
        res.status(500).json({
            message: "We ran into an error retrieving the project",
        });
    }
});

router.get("/:id/actions", async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({
            message: "We ran into an error retrieving the project actions",
        });
    }
});

router.post("/", async (req, res) => {
    const project = req.body;

    if (project.name && project.description) {
        try {
            const inserted = await Projects.insert(project);

            res.status(201).json(inserted);
        } catch (error) {
            res.status(500).json({
                message: "We ran into an error creating the project",
            });
        }
    } else {
        res.status(400).json({
            message: "Please provide name and description for the project",
        });
    }
});

router.put("/:id", async (req, res) => {
    const changes = req.body;

    if (changes.name || changes.description || changes.completed) {
        try {
            const updated = await Projects.update(req.params.id, changes);

            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({
                    message: "That project does not exist",
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "We ran into an error updating the project",
            });
        }
    } else {
        res.status(400).json({
            message: "Please provide name, description or completed status",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message:
                    "That project does not exist, perhaps it was deleted already",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "We ran into an error removing the project",
        });
    }
});

module.exports = router;
