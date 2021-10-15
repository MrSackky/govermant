'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('holiday_blessings', {
      id_holiday_blessing: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      holiday_id: {
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      text_blessing: {
        type: Sequelize.TEXT
      },
      name_blessing: {
        type: Sequelize.STRING
      },
      position_blessing: {
        type: Sequelize.STRING
      },
      work_blessing: {
        type: Sequelize.STRING
      },
      date_blessing: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status_deleted: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('holiday_blessings');
  }
};
