const router = require('express').Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/', bookingsController.createBooking);
router.get('/', bookingsController.listBookings);
router.get('/:id', bookingsController.getBooking);
router.put('/:id', bookingsController.updateBooking);
router.delete('/:id', bookingsController.deleteBooking);

module.exports = router;
