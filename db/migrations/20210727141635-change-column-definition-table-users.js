'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'user_name', {
          type: Sequelize.STRING,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'password', {
          type: Sequelize.STRING,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'name_user', {
          type: Sequelize.STRING,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'organization_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'email_user', {
          type: Sequelize.STRING,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'phone_user', {
          type: Sequelize.STRING,
          allowNull: false,
        },{
          defaultValue: null,
         
        }),
        queryInterface.changeColumn('Users', 'date_created', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },{
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
         
        }),
        queryInterface.changeColumn('Users', 'date_updated', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },{
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
         
        }),
        queryInterface.changeColumn('Users', 'status_active', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },{
          defaultValue: 1,
         
        }),
        queryInterface.changeColumn('Users', 'type_user', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 2,
        },{
          defaultValue:2,
         
        }),
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
     
      // queryInterface.changeColumn('Users', 'password', {
      //   allowNull: true,
      // }),
      // queryInterface.changeColumn('Users', 'name_user', {
      //   allowNull: true,
      // }),
      // queryInterface.changeColumn('Users', 'organization_id', {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.changeColumn('Users', 'email_user', {

      //   allowNull: true,
      // }),
      // queryInterface.changeColumn('Users', 'phone_user', {

      //   allowNull: true,
      // }),
      // queryInterface.changeColumn('Users', 'date_created', {
      //   allowNull: true,
      // type: Sequelize.STRING
      // }),
      // queryInterface.changeColumn('Users', 'date_updated', {
      //   allowNull: false,
      // type: Sequelize.BOOLEAN
      // }),
      // queryInterface.changeColumn('Users', 'status_active', {
    
      // type: Sequelize.DATE
      // }),
      // queryInterface.changeColumn('Users', 'type_user', {
   
      // type: Sequelize.DATE
      // }),
    ])
  }
};
