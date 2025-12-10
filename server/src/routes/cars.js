const router = require('express').Router();
const ctrl = require('../controllers/CarsController');
const auth = require('../middlewares/auth');// provider authentication

router.get('/public', ctrl.listAllCars);//users will call this

router.use(auth); // sets req.user for these routes


router.post('/', ctrl.createCar);
router.get('/', ctrl.listProviderCars);    // provider only
router.get('/:id', ctrl.getCar);
router.put('/:id', ctrl.updateCar);
router.delete('/:id', ctrl.deleteCar);

module.exports = router;
