//Referance from youtube,Timestamps:02:32:55 "https://youtu.be/tBObk72EYYw?si=_J0XIFC9E_QrHeiX"
//Referance from chatgpt: "https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
const { Booking, Car, Cook } = require('../models');
const { isAvailable } = require('../services/availability');

async function createBooking(req, res) {
  const payload = req.body;
  const { service_type, service_id, from_date, to_date } = payload;

  if(service_type === 'car') {
    const car = await Car.findByPk(service_id);
    if(!car) return res.status(400).json({ message: 'Car not found' });
  } else if(service_type === 'cook') {
    const cook = await Cook.findByPk(service_id);
    if(!cook) return res.status(400).json({ message: 'Cook not found' });
  } else {
    return res.status(400).json({ message: 'Invalid service_type' });
  }

  const ok = await isAvailable(service_type, service_id, from_date, to_date);
  if(!ok) return res.status(409).json({ message: 'Service not available for selected dates' });

  const booking = await Booking.create(payload);
  res.status(201).json(booking);
}

async function listBookings(req, res) {
  const bookings = await Booking.findAll();
  res.json(bookings);
}
async function getBooking(req, res) {
  const booking = await Booking.findByPk(req.params.id);
  if(!booking) return res.status(404).json({ message: 'Not found' });
  res.json(booking);
}
async function updateBooking(req, res) {
  await Booking.update(req.body, { where: { id: req.params.id }});
  const b = await Booking.findByPk(req.params.id);
  res.json(b);
}
async function deleteBooking(req, res) {
  await Booking.destroy({ where: { id: req.params.id }});
  res.status(204).send();
}

module.exports = { createBooking, listBookings, getBooking, updateBooking, deleteBooking };
