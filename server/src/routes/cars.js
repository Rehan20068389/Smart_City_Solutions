const router = require('express').Router();
const ctrl = require('../controllers/carsController');

router.post('/', ctrl.createCar);
router.get('/', ctrl.listCars);
router.get('/:id', ctrl.getCar);
router.put('/:id', ctrl.updateCar);
router.delete('/:id', ctrl.deleteCar);

module.exports = router;
