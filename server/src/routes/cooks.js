const router = require('express').Router();
const ctrl = require('../controllers/cooksController.js');
const auth = require('../middlewares/auth');// provider authentication

router.use(auth); // sets req.user for these routes

router.post('/', ctrl.createCook);
router.get('/', ctrl.listCooks);
router.get('/:id', ctrl.getCook);
router.put('/:id', ctrl.updateCook);
router.delete('/:id', ctrl.deleteCook);

module.exports = router;
