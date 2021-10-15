import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays } from '../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    return res.status(400).json({
      status: 400,
      message: 'deny permission!!',
    });
  })
  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      organization_id,
      activities_date,
      activities_title,
      activities_detail,
      activities_image,
      activities_keyword,
      is_slide,
      status_active,
    } = body;
    // const userId = slug;

    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + 8);

    const dataUser = {
      organization_id,
      activities_date,
      activities_title,
      activities_detail,
      activities_image,
      activities_keyword,
      is_slide,
      status_active,
    };

    if (
      organization_id == undefined ||
      activities_date == undefined ||
      activities_title == undefined ||
      activities_detail == undefined ||
      activities_image == undefined ||
      activities_keyword == undefined ||
      is_slide  == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataActivities = await models.Activities.findOne({
      where: { organization_email: organization_email },
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataActivities != null) {
      return res.status(200).json({
        status: 202,
        message: 'data user "email" is exist',
      });
    }

    const dataUsers = await models.Users.findOne({
      where: { user_name: organization_email },
    });
    if (dataUsers != null) {
      return res.status(200).json({
        status: 203,
        message: 'data user "email" is exist',
      });
    }

    const newActivities = await models.Activities.create(dataUser);

    if (newActivities == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    console.log('newActivities');
    console.log(newActivities);
    const dataActivities2 = {
      organization_id: organization_id,
      activities_title: activities_title,
      activities_detail: activities_detail,
      activities_image: activities_image,
      activities_date: activities_date,
      activities_keyword: activities_keyword,
      is_slide: is_slide,
      status_active: status_active,
    };

    const newActivities = await models.Activities.create(dataActivities2);

    if (newActivities == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Insert completed',
    });
  });

export default handler;
