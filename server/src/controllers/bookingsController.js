//Referance from youtube,Timestamps:02:32:55 "https://youtu.be/tBObk72EYYw?si=_J0XIFC9E_QrHeiX"
//Referance from chatgpt: "https://chatgpt.com/share/693c695c-dff8-8008-b5d3-729d8e7b5d34"
//Referance from youtube: "https://youtu.be/tBObk72EYYw?si=DyU_mSI4GqZdkCYt"
//"Rferance from stackoverflow:https://stackoverflow.com/questions/50950011/
// axios-post-request-fails-with-error-status-code-500-internal-server-error"
const { Booking, Car, Cook } = require('../models');
const { Op } = require('sequelize');

//my own modifications
// Safe availability check
async function safeIsAvailable(serviceType, serviceId, fromDate, toDate) {
  try {
    const bookings = await Booking.findAll({
      where: {
        service_type: serviceType,
        service_id: serviceId,
        from_date: { [Op.lte]: toDate },
        to_date: { [Op.gte]: fromDate },
        status: 'confirmed'
      }
    });
    return bookings.length === 0; // available if no overlapping booking
  } catch (err) {
    console.error("Availability check failed:", err);
    return false; // treat as unavailable if check fails
  }
}


async function createBooking(req, res) {
try{
    const { serviceType, serviceId, fromDate, toDate, pickupLocation, dropLocation, price } = req.body;
   //my own modifications
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  let service;   
  if(serviceType === 'car') {
    service = await Car.findByPk(serviceId);
     if (!service) return res.status(404).json({ message: 'Car not found' });
    if (!pickupLocation || !dropLocation)
        return res.status(400).json({ message: 'Pickup and drop location required for car booking' });

    
  } else if(serviceType === 'cook') {
    service = await Cook.findByPk(serviceId);
     if (!service) return res.status(404).json({ message: 'Cook not found' });

  } else {
    return res.status(400).json({ message: 'Invalid service_type' });
  }


 //checking the availability
const available = await safeIsAvailable(serviceType, serviceId, fromDate, toDate);
  if(!available){
     return res.status(409).json({ message: 'Service not available for selected dates' });
  }
  const bookingData = {//create booking
      userId: user.id,
      user_name: user.name,
      service_type: serviceType,
      service_id: serviceId,
      from_date: fromDate,
      to_date: toDate,
      price,
      status: 'confirmed',
      payment_status: 'unpaid'
  };

  if (serviceType === 'car') {
      bookingData.pickup_location = pickupLocation;
      bookingData.drop_location = dropLocation;
    }

    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);

}catch (err) {
    console.error("Create booking Error:", err);
    res.status(500).json({ message: 'Internal server error',error:err.message });
  }
}
//my own modifications

async function listBookings(req, res) {//here listing the books
  try{
  const bookings = await Booking.findAll();
  res.json(bookings);
  }catch(err){
     console.error(err);
    res.status(500).json({ message: 'Internal server error' });

  }
}
//my own modifications
async function getBooking(req, res) {
  try{
  const booking = await Booking.findByPk(req.params.id);
  if(!booking) return res.status(404).json({ message: 'Not found' });
  res.json(booking);
  }catch (err){
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });

  }
}
//my own modifications
async function updateBooking(req, res) {
  try {
  await Booking.update(req.body, { where: { id: req.params.id }});
  const updated = await Booking.findByPk(req.params.id);
  res.json(updated);
  }catch (err){
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });

  }
}
//my own modifications
async function deleteBooking(req, res) {
  try{
 const deleted = await Booking.destroy({ where: { id: req.params.id }});
 if (!deleted) return res.status(404).json({ message: 'Booking not found' });
  res.status(204).send();
} catch (err){
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });

}
}
module.exports = { createBooking, listBookings, getBooking, updateBooking, deleteBooking };
