'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class information_new extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  information_new.init({
    infor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    infor_detail: DataTypes.TEXT,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING
  },{
    sequelize,
    modelName: 'information_news',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return information_new;
};