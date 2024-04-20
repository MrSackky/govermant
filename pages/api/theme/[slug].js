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
    const organization_id = slug;
    const {
      theme,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataTheme = {
      theme: theme,
    };

    if (
      theme == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        theme: theme,
      });
    }

    const themeDataResult = await models.Organization.update(dataTheme, {
      where: {
        organization_id: organization_id,
      },
    });
    console.log('themeDataResult');
    console.log(themeDataResult);
    console.log(dataTheme);
    console.log(organization_id);

    return res.status(200).json({
      status: 200,
      message: 'success',
      // theme: theme ? theme : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });
  })

export default handler;
