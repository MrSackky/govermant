'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District.belongsTo(models.Province, { foreignKey: 'province_id', as: 'provinces' });
      // Sub_district.hasMany(models.Sub_district, { as: 'sub_districts' })

    }
  };
  District.init({
    district_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    district_name: DataTypes.STRING,
    province_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Province',
        key: 'province_id'
      },
    },
  }, {
    sequelize,
    modelName: 'District',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return District;
};