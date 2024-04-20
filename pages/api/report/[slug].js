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
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const organization = slug;

    const organization = await models.Organization.findOne({
      where: {
        organization: organization,
      },

    });


    return res.status(200).json({
      status: 200,
      message: "success",
      organization: organization ? organization : []
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const organization = slug;
    const {
      organization_id,
      organization_name,
      organization_name_eng,
      organization_logo,
      organization_address,
      organization_email,
      organization_email_alert,
      organization_phone,
      organization_fax,
      social_fb_pageid,
      rss,
      person01_name,
      person01_position,
      person01_image,
      person02_name,
      person02_position,
      person02_image,
      person03_name,
      person03_position,
      person03_image,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataOrganization = {
      organization_id: organization_id,
      organization_name: organization_name,
      organization_name_eng: organization_name_eng,
      organization_logo: organization_logo,
      organization_address: organization_address,
      organization_email: organization_email,
      organization_email_alert: organization_email_alert,
      organization_phone: organization_phone,
      organization_fax: organization_fax,
      social_fb_pageid: social_fb_pageid,
      rss: rss,
      person01_name: person01_name,
      person01_position: person01_position,
      person01_image: person01_image,
      person02_name: person02_name,
      person02_position: person02_position,
      person02_image: person02_image,
      person03_name: person03_name,
      person03_position: person03_position,
      person03_image: person03_image,
    };

    if (
      organization_id == undefined ||
      organization_name == undefined ||
      organization_name_eng == undefined ||
      organization_logo == undefined ||
      organization_address == undefined ||
      organization_email == undefined ||
      organization_email_alert == undefined ||
      organization_phone == undefined ||
      organization_fax == undefined ||
      rss == undefined ||
      person01_name == undefined ||
      person01_position == undefined ||
      person01_image == undefined ||
      person02_name == undefined ||
      person02_position == undefined ||
      person02_image == undefined ||
      person03_name == undefined ||
      person03_position == undefined ||
      person03_image == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        organization: organization,
        data: dataOrganization,
      });
    }

    const organizationDataResult = await models.Organization.update(dataOrganization, {
      where: {
        organization: organization,
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
