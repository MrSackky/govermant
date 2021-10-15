'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.hasMany(models.Sub_district, { as: 'sub_districts' })
      Province.hasMany(models.District, { as: 'districts' })

    }
  };
  Province.init({
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    province_name: DataTypes.STRING,
    province_abbrev: DataTypes.STRING,
    region_id: DataTypes.INTEGER,
    seq: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Province',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return Province;
};