import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays , getIPAddress } from '../../../middleware/utils';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import moment from 'moment';

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const poll_id = slug;

    const poll = await models.poll.findOne({
      where: {
        poll_id: poll_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      poll: poll ? poll : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const poll_id = slug;
    const {
      poll_title,
      poll_date_s,
      poll_date_e,
      is_identity,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataPoll = {
      poll_title: poll_title,
      poll_date_s: poll_date_s.replace('+07:00', '+00:00'),
      poll_date_e: poll_date_e.replace('+07:00', '+00:00'),
      is_identity: is_identity,
    };

    if (
      poll_title == undefined ||
      poll_date_s == undefined ||
      poll_date_e == undefined ||
      is_identity == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        poll_id: poll_id,
        data: dataPoll,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataPoll.ip = ip
    dataPoll.is_deleted = 0
    dataPoll.date_updated = currentDate.replace("+07:00", "+00:00")

    const pollDataResult = await models.poll.update(dataPoll, {
      where: {
        poll_id: poll_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      // organization: organization ? organization : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });
  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const poll_id = slug;
    if (poll_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        poll_id: poll_id,
      });
    }

    const dataPoll = {
      is_deleted: 1,
    };

    const poll = await models.poll.update(dataPoll, {
      where: {
        poll_id: poll_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      poll: poll ? poll : [],
    });
  });

export default handler;
