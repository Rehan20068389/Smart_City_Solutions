//Referance from chagpt
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {                  //my own modifications
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {               // Reference user
        type: Sequelize.INTEGER,
        allowNull: false
      },
      service_type: {    //car or cook
        type: Sequelize.STRING,
        allowNull: false
      },
      service_id: { //carId or cookId
        type: Sequelize.INTEGER,
        allowNull: false
      },
      from_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      to_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pickup_location: {
        type: Sequelize.STRING
      },
      drop_location: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      status: { // confirmed,pending,cancelled
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      payment_status: {
        type: Sequelize.STRING,
        defaultValue: 'unpaid'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};