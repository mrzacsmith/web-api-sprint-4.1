// add middlewares here related to actions
const Action = require('./actions-model');

async function checkActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action
      next();
    } else {
      next({ status: 404, message: 'We could not find the action' });
    }
  } catch (error) {
    next({ message: 'Error getting the action' });
  }
}

module.exports = {
  checkActionId,
}
