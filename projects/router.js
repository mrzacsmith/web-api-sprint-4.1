const router = require('express').Router();

const Projects = require('../database/helpers/projectModel.js');

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({
                message: 'We ran into an error retrieving the projects',
            });
        });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: 'We could not find the project',
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'We ran into an error retrieving the project',
            });
        });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({
                message: 'We ran into an error retrieving the project actions',
            });
        });
});

router.post('/', (req, res) => {
    const project = req.body;

    if (project.name && project.description) {
        Projects.insert(project)
            .then(inserted => {
                res.status(201).json(inserted);
            })
            .catch(error => {
                res.status(500).json({
                    message: 'We ran into an error creating the project',
                });
            });
    } else {
        res.status(400).json({
            message: 'Please provide name and description for the project',
        });
    }
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    if (changes.name || changes.description || changes.completed) {
        Projects.update(req.params.id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json(updated);
                } else {
                    res.status(404).json({
                        message: 'That project does not exist',
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'We ran into an error updating the project',
                });
            });
    } else {
        res.status(400).json({
            message: 'Please provide name, description or completed status',
        });
    }
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message:
                        'That project does not exist, perhaps it was deleted already',
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'We ran into an error removing the project',
            });
        });
});

module.exports = router;
