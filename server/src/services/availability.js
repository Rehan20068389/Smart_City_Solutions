//Referance from youtube ,Timestamps:02:32:55 :"https://youtu.be/tBObk72EYYw?si=_J0XIFC9E_QrHeiX"
//Referance from chatgpt :"https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
const { Booking } = require('../models');
const { Op } = require('sequelize');

 // my own modifications
async function isAvailable(serviceType, serviceId, fromDate, toDate) {
  const overlapping = await Booking.findOne({
    where: {
      serviceType,
      serviceId,
      status: 'confirmed',
      [Op.or]: [
        { fromDate: { [Op.between]: [fromDate, toDate] } },
        { toDate: { [Op.between]: [fromDate, toDate] } },
        { fromDate: { [Op.lte]: fromDate }, todate: { [Op.gte]: toDate } }
      ]
    }
  });
  return  !overlapping;
}

module.exports = { isAvailable };
