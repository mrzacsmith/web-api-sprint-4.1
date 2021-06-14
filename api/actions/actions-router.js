const router = require('express').Router();
const Action = require('./actions-model');
const md = require('./actions-middleware');

router.get('/', async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (error) {
    next({ message: 'Error getting the list of actions' });
  }
});

router.get('/:id', md.checkActionId, async (req, res) => {
  res.json(req.action)
});

router.post('/', async (req, res, next) => {
  const action = req.body;

  if (action.description && action.project_id && action.notes) {
    try {
      const inserted = await Action.insert(action);
      res.status(201).json(inserted);
    } catch (error) {
      next({ message: 'Error creating the action' });
    }
  } else {
    next({ status: 400, message: 'Please provide description, notes and the id of the project' });
  }
});

router.put('/:id', md.checkActionId, async (req, res, next) => {
  const changes = req.body;

  if (
    changes.description &&
    changes.notes &&
    changes.project_id &&
    changes.completed !== undefined
  ) {
    try {
      const updated = await Action.update(req.params.id, changes);
      res.status(200).json(updated);
    } catch (error) {
      next({ message: 'We ran into an error updating the project' });
    }
  } else {
    next({ status: 400, message: 'Please provide all required fields' });
  }
});

router.delete('/:id', md.checkActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next({ message: 'We ran into an error removing the project' });
  }
});

module.exports = router;
