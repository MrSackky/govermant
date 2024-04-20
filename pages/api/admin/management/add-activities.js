import nextConnect from 'next-connect';
const models = require('../../../../db/models/index');
import middleware from '../../../../middleware/auth';
import { addDays, getIPAddress } from '../../../../middleware/utils';
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
    const { organization_id, activities_date, activities_title, activities_detail, activities_image, activities_keyword, is_slide, status_active } = body;
    // const userId = slug;
    const dataUser = {
      "organization_id": organization_id,
      "activities_date": activities_date.replace("+07:00", "+00:00"),
      "activities_title": activities_title,
      "activities_detail": activities_detail,
      "activities_image": activities_image,
      "activities_keyword": activities_keyword ? activities_keyword : "",
      "is_slide": is_slide,
      "status_active": status_active,
    };
    console.log(dataUser)
    if (organization_id == undefined || activities_date == undefined || activities_title == undefined || activities_detail == undefined || activities_image == undefined || is_slide == undefined || status_active == undefined) {
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

    const newAddactivities = await models.activities.create(dataUser);

    if (newAddactivities == null) {
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
