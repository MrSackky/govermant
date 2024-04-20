import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
const models = require('../../../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {

  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    // const organization_id = slug;
    const {
      organization_id,
      is_use_intro,
      is_poll_confirm
    } = body;

    const dataOrganization = {
      is_use_intro: is_use_intro,
      is_poll_confirm: is_poll_confirm
    };

    if (
      organization_id == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        organization_id: organization_id,
        dataOrganization: dataOrganization
      });
    }


    const organization = await models.Organization.update(
      dataOrganization, {
      where: {
        organization_id: organization_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
      organization: organization ? organization : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });

  })

export default handler;
