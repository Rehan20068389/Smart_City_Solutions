const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
<<<<<<< HEAD
const ctrl = require('../controllers/authcontroller.js');
=======
const ctrl = require('../controllers/authcontroller');
>>>>>>> 9072ced1ebc8694fcd938757c68b9af22d96f0dc

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);

router.get('/me', authMiddleware, ctrl.getMe);
module.exports = router;
