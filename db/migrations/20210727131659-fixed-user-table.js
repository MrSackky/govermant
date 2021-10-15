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
        queryInterface.renameColumn('Users', 'id', 'user_id', {}),
        queryInterface.renameColumn('Users', 'firstName','name_user', {}),
        queryInterface.renameColumn('Users', 'lastName', 'organization_id', {
          type: Sequelize.INTEGER,
          allowNull: false
        }),
        queryInterface.renameColumn('Users', 'email', 'email_user', {}),
        queryInterface.renameColumn('Users', 'phoneNumber', 'phone_user', {}),
        queryInterface.renameColumn('Users', 'gender', 'date_created', {
          type: Sequelize.DATE,
          // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
           allowNull: false
        }),
        queryInterface.renameColumn('Users', 'status','date_updated', {
          type: Sequelize.DATE,
          // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
           allowNull: false
        }),
        queryInterface.renameColumn('Users', 'createdAt','status_active', {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false
        }),
     
        queryInterface.renameColumn('Users', 'updatedAt','type_user', {
          type: Sequelize.INTEGER,
          defaultValue: 2,
          allowNull: false
        }),
        queryInterface.addColumn('Users', 'user_name', {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
          after: "id"
        }),
        queryInterface.changeColumn('Users', 'createdAt', {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        }),
        
        // queryInterface.removeColumn('Users', 'password', {}),
        // queryInterface.addColumn('Users', 'user_id', {
        //   allowNull: false,
        //   autoIncrement: true,
        //   primaryKey: true,
        //   type: Sequelize.INTEGER
        // }),
     
        // queryInterface.addColumn('Users', 'name_user', {
        //   type: Sequelize.STRING,
        //   defaultValue: false,
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'organization_id', {
        //   type: Sequelize.INTEGER,
        //   defaultValue: false,
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'email_user', {
        //   type: Sequelize.STRING,
        //   defaultValue: false,
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'phone_user', {
        //   type: Sequelize.STRING,
        //   defaultValue: false,
        //   allowNull: true
        // }),
        // queryInterface.addColumn('Users', 'date_created ', {
        //   type: Sequelize.DATE,
        //  // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'date_updated  ', {
        //   type: Sequelize.DATE,
        //  // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'status_active   ', {
        //   type: Sequelize.INTEGER,
        //   defaultValue: 1,
        //   allowNull: false
        // }),
        // queryInterface.addColumn('Users', 'type_user    ', {
        //   type: Sequelize.INTEGER,
        //   defaultValue: 2,
        //   allowNull: false
        // }),
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
      queryInterface.renameColumn('Users', 'user_id', 'id', {}),
      queryInterface.renameColumn('Users', 'name_user','firstName', {}),
      queryInterface.renameColumn('Users', 'organization_id', 'lastName', {
        type: Sequelize.STRING
      }),
      queryInterface.renameColumn('Users', 'email_user', 'email', {}),
      queryInterface.renameColumn('Users', 'phone_user', 'phoneNumber', {}),
      queryInterface.renameColumn('Users', 'date_created', 'gender', {
      }),
      queryInterface.renameColumn('Users', 'date_updated','status', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.renameColumn('Users', 'status_active','createdAt', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.renameColumn('Users', 'type_user','updatedAt', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.removeColumn('Users', 'user_name'),
    ])
  }
};
