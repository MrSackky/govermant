'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sub_districts', {
      sub_district_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sub_district_name: {
        type: Sequelize.STRING
      },
      district_id: Sequelize.INTEGER,
      province_id: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sub_districts');
  }
};