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
      method,
      body,
    } = req;
    const { organization_id, results, page, search, sortField = "contact_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    _search = {
      is_done: {
        [Op.ne]: 1,
      },
      organization_id: organization_id

    }


    // console.log(_search)
    const _blessing = await models.contact.findAndCountAll({
      attributes: [
        'contact_id', 'organization_id', 'contact_post', 'contact_detail', 'contact_name_posted',
        'contact_telephone', 'contact_email', 'date_created', 'date_updated',
        'ip', 'personid', 'is_done',
      ],
      where: _search
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _blessing.rows,
      totalCount: _blessing.count
    });

  })
  .delete(async (req, res) => {

  })

export default handler;
