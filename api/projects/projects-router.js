const router = require('express').Router();
const Projects = require('./projects-model');
const md = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      next({
        message: 'We ran into an error retrieving the projects',
      });
    });
});

router.get('/:id', md.checkProjectId, (req, res, next) => {
  res.json(req.project)
});

router.get('/:id/actions', md.checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      next({
        message: 'We ran into an error retrieving the project actions',
      });
    });
});

router.post('/', (req, res, next) => {
  const project = req.body;

  if (project.name && project.description) {
    Projects.insert(project)
      .then(inserted => {
        res.status(201).json(inserted);
      })
      .catch(error => {
        next({
          message: 'We ran into an error creating the project',
        });
      });
  } else {
    next({
      status: 400,
      message: 'Please provide name and description for the project',
    });
  }
});

router.put('/:id', md.checkProjectId, (req, res, next) => {
  const changes = req.body;

  if (changes.name && changes.description && changes.completed !== undefined) {
    Projects.update(req.params.id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(error => {
        next({
          message: 'We ran into an error updating the project',
        });
      });
  } else {
    next({
      status: 400,
      message: 'Please provide name, description and completed status',
    });
  }
});

router.delete('/:id', md.checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(count => {
      res.status(204).end();
    })
    .catch(error => {
      next({
        message: 'We ran into an error removing the project',
      });
    });
});

module.exports = router;
