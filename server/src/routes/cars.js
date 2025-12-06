const router = require('express').Router();
const ctrl = require('../controllers/CarsController');
const auth = require('../middlewares/auth');// provider authentication

router.use(auth); // sets req.user for these routes


router.post('/', ctrl.createCar);
router.get('/', ctrl.listCars);
router.get('/:id', ctrl.getCar);
router.put('/:id', ctrl.updateCar);
router.delete('/:id', ctrl.deleteCar);

module.exports = router;
