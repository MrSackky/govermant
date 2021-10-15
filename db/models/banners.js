'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  banners.init({
    banner_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    banner_title: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    banner_link: DataTypes.TEXT,
    status_active: DataTypes.INTEGER,
    num_click: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    seq: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'banners',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return banners;
};