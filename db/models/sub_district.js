'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sub_district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sub_district.belongsTo(models.District, { foreignKey: 'district_id', as: 'districts' });
      Sub_district.belongsTo(models.Province, { foreignKey: 'province_id', as: 'provinces' });
    }
  };
  Sub_district.init({
    sub_district_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sub_district_name: DataTypes.STRING,
    district_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'District',
        key: 'district_id'
      },
    },
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
    modelName: 'Sub_district',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return Sub_district;
};