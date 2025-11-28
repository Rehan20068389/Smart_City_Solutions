const router = require('express').Router();
const ctrl = require('../controllers/cooksController.js');

router.post('/', ctrl.createCook);
router.get('/', ctrl.listCooks);
router.get('/:id', ctrl.getCook);
router.put('/:id', ctrl.updateCook);
router.delete('/:id', ctrl.deleteCook);

module.exports = router;
