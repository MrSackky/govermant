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
    const { organization_id, results, page, search, sortField = "infor_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    _search = {
      is_deleted: {
        [Op.ne]: 1,
      },
      organization_id: organization_id

    }


    // console.log(_search)
    const _information = await models.information.findAndCountAll({
      attributes: [
        'infor_id', 'organization_id', 'infor_date', 'infor_title',
        'infor_detail', 'infor_image', 'infor_keyword', 'infor_view',
        'date_created', 'date_update', 'status_active', 'is_deleted', 'ip'
      ],
      where: _search
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _information.rows,
      totalCount: _information.count
    });

  })
  .delete(async (req, res) => {

  })

export default handler;
