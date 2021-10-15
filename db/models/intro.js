'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class intro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      intro.hasMany(models.intro_blessing, { foreignKey: 'intro_id', as: 'intros' })

    }
  };
  intro.init({
    intro_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Organizations',
        key: 'organization_id'
      },
    },
    intro_title: DataTypes.STRING,
    intro_url: DataTypes.STRING,
    intro_btn: DataTypes.STRING,
    intro_date_s: DataTypes.DATE,
    intro_date_e: DataTypes.DATE,
    intro_image: DataTypes.STRING,
    is_has_bless: DataTypes.INTEGER,
    is_admin: DataTypes.INTEGER,
    is_use: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    is_deleted: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'intro',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return intro;
};
