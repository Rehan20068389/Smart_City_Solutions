'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userName: {           // maps to `user_name` in DB
      type: DataTypes.STRING,
      field: 'user_name'
    },
    serviceType: {        // maps to `service_type` in DB
      type: DataTypes.STRING,
      field: 'service_type'
    },
    serviceId: {          // maps to `service_id` in DB
      type: DataTypes.INTEGER,
      field: 'service_id'
    },
    fromDate: {           // maps to `from_date` in DB
      type: DataTypes.DATEONLY,
      field: 'from_date'
    },
    toDate: {             // maps to `to_date` in DB
      type: DataTypes.DATEONLY,
      field: 'to_date'
    },
    pickupLocation: {     // maps to `pickup_location` in DB
      type: DataTypes.STRING,
      field: 'pickup_location'
    },
    dropLocation: {       // maps to `drop_location` in DB
      type: DataTypes.STRING,
      field: 'drop_location'
    },
    price: DataTypes.FLOAT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    paymentStatus: {      // maps to `payment_status` in DB
      type: DataTypes.STRING,
      field: 'payment_status',
      defaultValue: 'unpaid'
    }
  }, {
    tableName: 'bookings',  // ensures Sequelize uses the correct table name
    timestamps: true        // uses `createdAt` and `updatedAt`
  });

  return Booking;
};
