'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Packages.hasMany(models.Organization);
      // Packages.associate = (models) => { Packages.hasMany(models.Organization, { foreignKey: 'package', sourceKey: 'package_id' }); };
      Packages.hasMany(models.Organization, { foreignKey: 'package',as: 'organizations' })
    }
  }
  Packages.init(
    {
      package_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      code_package: DataTypes.STRING,
      name_package: DataTypes.STRING,
      size_limit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Packages',
      timestamps: false,
      // I don't want createdAt
      createdAt: false,
      updatedAt: false,
      id: false,
    },
  );

  // Packages.associate = function (models) {
  //   Packages.belongsTo(models.Packages, { foreignKey: 'package_id' });

  // }

  // Packages.associate = (models) => { Packages.hasMany(models.Organization, { foreignKey: 'package', sourceKey: 'package_id' }); };
  return Packages;
};
