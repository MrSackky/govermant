'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class holiday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  holiday.init({
    holiday_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    holiday_title: DataTypes.STRING,
    holiday_date_s: DataTypes.DATE,
    holiday_date_e: DataTypes.DATE,
    holiday_image: DataTypes.STRING,
    isHasBless: DataTypes.INTEGER,
    isAuto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'holiday',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return holiday;
};
