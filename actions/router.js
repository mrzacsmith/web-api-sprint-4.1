const router = require("express").Router();

const Actions = require("../data/helpers/actionModel.js");

router.get("/", async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Error getting the list of actions" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "We could not find the action" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting the action" });
    }
});

router.post("/", async (req, res) => {
    const action = req.body;

    if (action.description && action.project_id && action.notes) {
        try {
            const inserted = await Actions.insert(action);
            res.status(201).json(inserted);
        } catch (error) {
            res.status(500).json({ message: "Error creating the action" });
        }
    } else {
        res.status(400).json({
            message:
                "Please provide description, notes and the id of the project",
        });
    }
});

router.put("/:id", async (req, res) => {
    const changes = req.body;

    if (
        changes.description ||
        changes.notes ||
        changes.completed ||
        action.project_id
    ) {
        try {
            const updated = await Actions.update(req.params.id, changes);
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({
                    message: "That action does not exist",
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "We ran into an error updating the project",
            });
        }
    } else {
        res.status(400).json({
            message:
                "Please provide at least one of name, description, notes or completed status",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
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
