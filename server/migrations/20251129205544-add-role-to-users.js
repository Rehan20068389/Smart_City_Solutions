//Used chatgpt from the creation
//this migration is used to create a 'role' cloum in the users table
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
  }
};
