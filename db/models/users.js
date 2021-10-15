'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.belongsTo(models.Organization, { foreignKey: 'organization_id', as: '_organizations' });
      Users.belongsTo(models.Organization, { foreignKey: 'organization_id', as: '_organizations' });

    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
      name_user: DataTypes.STRING,
      organization_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'organization_id'
        },
      },
      email_user: DataTypes.STRING,
      phone_user: DataTypes.STRING,
      date_created: DataTypes.DATE,
      date_updated: DataTypes.DATE,
      status_active: DataTypes.INTEGER,
      type_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: false,
      // I don't want createdAt
      createdAt: false,
      updatedAt: false,
      id: false,
    },
  );
  return Users;
};
