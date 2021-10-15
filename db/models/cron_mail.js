'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cron_mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cron_mail.init({
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    cron_subject: DataTypes.STRING,
    cron_detail: DataTypes.TEXT,
    cron_date: DataTypes.DATE,
    cron_to: DataTypes.STRING,
    is_send: DataTypes.INTEGER,
    send_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cron_mail',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return cron_mail;
};
