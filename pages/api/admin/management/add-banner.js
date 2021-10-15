import nextConnect from 'next-connect';
const models = require('../../../../db/models/index');
import middleware from '../../../../middleware/auth';
import { addDays , getIPAddress } from '../../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
import moment from 'moment';

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
    const { organization_id, banner_title, banner_image, banner_link, status_active, num_click, seq } = body;
    // const userId = slug;

    const dataUser = {
      "organization_id": organization_id,
      "banner_title": banner_title,
      "banner_image": banner_image,
      "banner_link": banner_link,
      "status_active": status_active,
      "num_click": num_click,
      "seq": seq,
    };
    console.log(dataUser)
    if (organization_id == undefined || banner_title == undefined || banner_image == undefined || banner_link == undefined ||  status_active == undefined || num_click == undefined || seq == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataUser.ip = ip
    dataUser.is_deleted = 0
    dataUser.date_created = currentDate.replace("+07:00", "+00:00")
    dataUser.date_updated = currentDate.replace("+07:00", "+00:00")

    const newBanner = await models.banners.create(dataUser);

    if (newBanner == null) {
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
