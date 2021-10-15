'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer_header.init({
    header_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    header_image: DataTypes.STRING,
    header_link: DataTypes.STRING,
    is_show: DataTypes.INTEGER,
    seq: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer_header',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return customer_header;
};
