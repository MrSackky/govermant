'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class holiday_blessing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  holiday_blessing.init({
    id_holiday_blessing: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    holiday_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    text_blessing: DataTypes.TEXT,
    name_blessing: DataTypes.STRING,
    position_blessing: DataTypes.STRING,
    work_blessing: DataTypes.STRING,
    date_blessing: DataTypes.DATE,
    status_deleted: DataTypes.INTEGER,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'holiday_blessing',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return holiday_blessing;
};
