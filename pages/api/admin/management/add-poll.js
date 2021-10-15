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
    const {
      organization_id,
      poll_date_s,
      poll_title,
      poll_detail,
      poll_date_e,
      is_identity,
    } = body;
    // const userId = slug;
    const dataUser = {
      organization_id: organization_id,
      poll_date_s: poll_date_s.replace('+07:00', '+00:00'),
      poll_title: poll_title,
      poll_detail: poll_detail,
      poll_date_e: poll_date_e.replace('+07:00', '+00:00'),
      is_identity: is_identity,
    };
    console.log(dataUser);
    if (
      organization_id == undefined ||
      poll_date_s == undefined ||
      poll_title == undefined ||
      poll_detail == undefined ||
      poll_date_e == undefined ||
      is_identity == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }

    var ip = await getIPAddress();
    var currentDate = moment().format();
    dataUser.ip = ip;
    dataUser.is_deleted = 0;
    dataUser.date_created = currentDate.replace('+07:00', '+00:00');
    dataUser.date_updated = currentDate.replace('+07:00', '+00:00');

    const newPoll = await models.poll.create(dataUser);

    if (newPoll == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Insert completed',
      poll_id: newPoll.null,
    });
  });

export default handler;
