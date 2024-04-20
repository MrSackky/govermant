import moment from 'moment';
import nextConnect from 'next-connect';
import middleware from '../../../../middleware/auth';
import { getIPAddress } from '../../../../middleware/utils';
const models = require('../../../../db/models/index');
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
    const { organization_id, infor_date, infor_title, infor_detail, infor_image, infor_keyword, infor_view, status_active } = body;
    // const userId = slug;

    const dataUser = {
      "organization_id": organization_id,
      "infor_date": infor_date.replace("+07:00", "+00:00"),
      "infor_title": infor_title,
      "infor_detail": infor_detail,
      "infor_image": infor_image,
      "infor_keyword": infor_keyword ? infor_keyword : "",
      "infor_view": infor_view,
      "status_active": status_active
    };
    console.log(dataUser)
    if (organization_id == undefined || infor_date == undefined || infor_title == undefined || infor_detail == undefined || infor_image == undefined || infor_view == undefined || status_active == undefined) {
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
    dataUser.date_update = currentDate.replace("+07:00", "+00:00")


    const newInformation = await models.information.create(dataUser);

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
