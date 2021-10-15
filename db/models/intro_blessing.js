'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class intro_blessing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      intro_blessing.belongsTo(models.intro, { foreignKey: 'intro_id', as: 'intros' });

    }
  };
  intro_blessing.init({
    intro_blessing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    intro_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'intro',
        key: 'intro_id'
      },
    },
    text_blessing: DataTypes.TEXT,
    name_blessing: DataTypes.STRING,
    position_blessing: DataTypes.STRING,
    work_blessing: DataTypes.STRING,
    year: DataTypes.STRING,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'intro_blessing',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return intro_blessing;
};
