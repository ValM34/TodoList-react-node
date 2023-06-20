var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

/* GET users listing. */
router.post('/connexion', userController.connexion);
router.post('/subscription', userController.subscription);
router.get('/verify', auth, userController.isLoggedIn);

module.exports = router;
