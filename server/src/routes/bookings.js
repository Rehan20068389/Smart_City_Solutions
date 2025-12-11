const router = require('express').Router();
const ctrl = require('../controllers/bookingsController');

router.post('/', ctrl.createBooking);
router.get('/', ctrl.listBookings);
router.get('/:id', ctrl.getBooking);
router.put('/:id', ctrl.updateBooking);
router.delete('/:id', ctrl.deleteBooking);

module.exports = router;
