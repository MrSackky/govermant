import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
const models = require('../../../db/models/index');
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
      infor_date,
      infor_title,
      infor_detail,
      infor_image,
      infor_keyword,
      status_active,
    } = body;
    // const userId = slug;

    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + 8);

    const dataUser = {
      organization_id,
      infor_date,
      infor_title,
      infor_detail,
      infor_image,
      infor_keyword,
      status_active,
    };

    if (
      organization_id == undefined ||
      infor_date == undefined ||
      infor_title == undefined ||
      infor_detail == undefined ||
      infor_image == undefined ||
      infor_keyword == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrectdddddd',
        dataUser: dataUser,
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataInformation = await models.Information.findOne({
      where: { organization_email: organization_email },
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataInformation != null) {
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

    const newInformation = await models.Information.create(dataUser);

    if (newInformation == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    console.log('newInformation');
    console.log(newInformation);
    const dataInformation2 = {
      organization_id: organization_id,
      infor_date: infor_date,
      infor_title: infor_title,
      infor_detail: infor_detail,
      infor_image: infor_image,
      infor_keyword: infor_keyword,
      status_active: status_active,
    };

    const newInformation = await models.Information.create(dataInformation2);

    if (newInformation == null) {
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
