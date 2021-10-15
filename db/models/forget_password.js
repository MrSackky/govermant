'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forget_password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  forget_password.init({
    forget_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email_user: DataTypes.STRING,
    status_reset: DataTypes.INTEGER,
    date_craeted: DataTypes.DATE,
    date_updated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'forget_password',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return forget_password;
};