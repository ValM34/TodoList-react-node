var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/all', auth, taskController.getAll);
router.post('/create', auth, taskController.create);
router.post('/update', auth, taskController.update);
router.delete('/delete', auth, taskController.delete);

module.exports = router;
