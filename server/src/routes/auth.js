const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const ctrl = require('../controllers/authcontroller.js');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);

router.get('/me', authMiddleware, ctrl.getMe);
module.exports = router;
