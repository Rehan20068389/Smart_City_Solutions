//Referance from chatgpt
//this migration file is used to create a new cloum as providerID in the cars and cooks table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cars', 'providerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('Cooks', 'providerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Cars', 'providerId');
    await queryInterface.removeColumn('Cooks', 'providerId');
  }
};
