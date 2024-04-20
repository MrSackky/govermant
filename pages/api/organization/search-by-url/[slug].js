import nextConnect from 'next-connect';
import middleware from '../../../../middleware/auth';
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
    const { url } = body;
    // const userId = slug;


    if (!slug) {
      return res.status(200).json({
        status: 201,
        message: '- ไม่พบข้อมูล',
        url: url
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataOrganization = await models.Organization.findOne({
      attributes: ['organization_id', 'thumbnail_url', 'date_expired', 'theme'],
      where: { thumbnail_url: slug, is_use: 1 }
    });
    if (dataOrganization != null) {
      return res.status(200).json({
        status: 200,
        message: 'พบข้อมูล',
        data: dataOrganization,
      });
    }

    return res.status(200).json({
      status: 202,
      message: 'ไม่พบข้อมูล',
    });





  });

export default handler;
