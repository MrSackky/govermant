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
    const { organization_id, tender_date, type_tender_id, tender_title, tender_detail, tender_keyword = "", expire_date, status_active } = body;
    // const userId = slug;
    const dataUser = {
      "organization_id": organization_id,
      "tender_date": tender_date.replace("+07:00", "+00:00"),
      "type_tender_id": type_tender_id,
      "tender_title": tender_title,
      "tender_detail": tender_detail,
      "tender_keyword": tender_keyword,
      "expire_date": expire_date.replace("+07:00", "+00:00"),
      "status_active": status_active,
    };
    console.log(dataUser)
    if (organization_id == undefined || tender_date == undefined || type_tender_id == undefined || tender_title == undefined || tender_detail == undefined || tender_keyword == undefined || expire_date == undefined || status_active == undefined) {
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

    const newTender = await models.tender.create(dataUser);

    if (newTender == null) {
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
