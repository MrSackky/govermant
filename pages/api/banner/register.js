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
      banner_title,
      banner_image,
      banner_link,
      status_active,
      num_click,
      seq,
    } = body;
    // const userId = slug;

    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + 8);

    const dataUser = {
      organization_id,
      banner_title,
      banner_image,
      banner_link,
      status_active,
      num_click,
      seq,
    };

    if (
      organization_id == undefined ||
      banner_title == undefined ||
      banner_image == undefined ||
      banner_link == undefined ||
      seq == undefined ||
      num_click == undefined ||
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
    const dataBanner = await models.Banners.findOne({
      where: { organization_email: organization_email },
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataBanner != null) {
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

    const newBanners = await models.Banners.create(dataUser);

    if (newBanners == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    console.log('newBanners');
    console.log(newBanners);
    const dataBanner2 = {
      organization_id: organization_id,
      banner_title: banner_title,
      banner_image: banner_image,
      banner_link: banner_link,
      status_active: status_active,
      num_click: num_click,
      seq: seq,
    };

    const newBanners = await models.Banners.create(dataBanner2);

    if (newBanners == null) {
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
