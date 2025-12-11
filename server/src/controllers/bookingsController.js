//Referance from youtube,Timestamps:02:32:55 "https://youtu.be/tBObk72EYYw?si=_J0XIFC9E_QrHeiX"
//Referance from chatgpt: "https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
const { Booking, Car, Cook } = require('../models');
const { isAvailable } = require('../services/availability');

async function createBooking(req, res) {
try{
    const { userId, serviceType, serviceId, fromDate, toDate, pickupLocation, dropLocation, price } = req.body;
   //my own modifications
  let service;   
  if(serviceType === 'car') {
    service = await Car.findByPk(serviceId);
    
  } else if(serviceType === 'cook') {
    service = await Cook.findByPk(serviceId);
    
  } else {
    return res.status(400).json({ message: 'Invalid service_type' });
  }

    if(!service) return res.status(404).json({ message: `${serviceType} not found` });

 //checking the availability
const available = await isAvailable(serviceType, serviceId, fromDate, toDate);
  if(!ok) return res.status(409).json({ message: 'Service not available for selected dates' });

  const booking = await Booking.create({
     userId,
      serviceType,
      serviceId,
      fromDate,
      toDate,
      pickupLocation,
      dropLocation,
      price,
      status: 'confirmed',
      paymentStatus: 'unpaid'
  });
  res.status(201).json(booking);
}catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
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
  const updated = await Booking.findByPk(req.params.id);
  res.json(updated);
}
async function deleteBooking(req, res) {
  await Booking.destroy({ where: { id: req.params.id }});
  res.status(204).send();
}

module.exports = { createBooking, listBookings, getBooking, updateBooking, deleteBooking };
