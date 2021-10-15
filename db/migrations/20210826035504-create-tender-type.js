'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tender_types', {
      tender_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tendet_type_name: {
        type: Sequelize.STRING
      },
      status_active: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tender_types');
  }
};