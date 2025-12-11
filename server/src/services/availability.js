//Referance from youtube ,Timestamps:02:32:55 :"https://youtu.be/tBObk72EYYw?si=_J0XIFC9E_QrHeiX"
//Referance from chatgpt :"https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
const { Booking } = require('../models');
const { Op } = require('sequelize');

async function isAvailable(serviceType, serviceId, fromDate, toDate) {
  const overlapping = await Booking.findOne({
    where: {
      service_type: serviceType,
      service_id: serviceId,
      status: 'confirmed',
      [Op.or]: [
        { from_date: { [Op.between]: [fromDate, toDate] } },
        { to_date: { [Op.between]: [fromDate, toDate] } },
        { from_date: { [Op.lte]: fromDate }, to_date: { [Op.gte]: toDate } }
      ]
    }
  });
  return overlapping ? false : true;
}

module.exports = { isAvailable };
