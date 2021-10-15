'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  complain.init({
    complain_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    complain_name_posted: DataTypes.STRING,
    complain_post: DataTypes.STRING,
    complain_detail: DataTypes.TEXT,
    complain_phone: DataTypes.STRING,
    complain_email: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    ip: DataTypes.STRING,
    personid: DataTypes.STRING,
    is_done: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'complain',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return complain;
};
