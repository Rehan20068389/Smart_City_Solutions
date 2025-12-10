const router = require('express').Router();
const ctrl = require('../controllers/cooksController.js');
const auth = require('../middlewares/auth');// provider authentication

router.get('/public', ctrl.listAllCooks);//users will call this

router.use(auth); // sets req.user for these routes

router.post('/', ctrl.createCook);
router.get('/', ctrl.listProviderCooks);// provider-only
router.get('/:id', ctrl.getCook);
router.put('/:id', ctrl.updateCook);
router.delete('/:id', ctrl.deleteCook);

module.exports = router;
