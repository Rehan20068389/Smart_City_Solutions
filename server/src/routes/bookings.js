const router = require('express').Router();
const bookingsController = require('../controllers/bookingsController');
const authMiddleware = require('../middlewares/auth');

//modifications on the route for authentications.
router.get('/my', authMiddleware, bookingsController.getMyBookings);

router.post('/',authMiddleware, bookingsController.createBooking);
router.get('/',authMiddleware, bookingsController.listBookings);
router.get('/:id',authMiddleware, bookingsController.getBooking);
router.put('/:id',authMiddleware, bookingsController.updateBooking);
router.delete('/:id',authMiddleware, bookingsController.deleteBooking);

module.exports = router;
