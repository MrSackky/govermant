'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Provinces', {
      province_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      province_name: {
        type: Sequelize.STRING
      },
      province_abbrev: {
        type: Sequelize.STRING
      },
      region_id: {
        type: Sequelize.INTEGER
      },
      seq: {
        type: Sequelize.INTEGER
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Provinces');
  }
};