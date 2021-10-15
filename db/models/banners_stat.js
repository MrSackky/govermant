'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banners_stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  banners_stat.init({
    stat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    banner_id: DataTypes.INTEGER,
    stat_os: DataTypes.TEXT,
    stat_browser: DataTypes.TEXT,
    stat_user_agent: DataTypes.TEXT,
    date_create: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'banners_stat',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return banners_stat;
};