import moment from 'moment';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
import { getIPAddress } from '../../../middleware/utils';
const models = require('../../../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const contact_id = slug;

    const contact = await models.contact.findOne({
      where: {
        contact_id: contact_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      contact: contact ? contact : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const contact_id = slug;
    const {
      organization_id,
      is_done
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataContact = {
      organization_id: organization_id,
      is_done: is_done
    };

    if (
      organization_id == undefined ||
      is_done == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        contact_id: contact_id,
        data: dataContact,
      });
    }

    var ip = await getIPAddress();
    var currentDate = moment().format();
    dataContact.ip = ip;
    dataContact.date_update = currentDate.replace('+07:00', '+00:00');

    const contactDataResult = await models.contact.update(dataContact, {
      where: {
        contact_id: contact_id,
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

export default handler;
