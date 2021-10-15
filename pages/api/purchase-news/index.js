import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
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
    const { organization_id, results, page, search, sortField = "tender_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            tender_title: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id

        }
      } else {
        console.log("if2")
        console.log(filters)
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            tender_title: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id


        }
      }


    } else {
      if (filters == 'undefined' || filters == 'null') {
        // console.log("if3")
        // console.log(filters)

        _search = {

          is_deleted: {
            [Op.ne]: 1,
          },
          organization_id: organization_id

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          is_deleted: {
            [Op.ne]: 1,
          },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _tender = await models.tender.findAndCountAll({
      attributes: [
        'tender_id', 'organization_id', 'tender_date', 'type_tender_id',
        'tender_title', 'tender_detail', 'tender_keyword', 'expire_date',
        'date_created', 'date_update', 'status_active', 'is_deleted', 'ip'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "tender_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _tender.rows,
      totalCount: _tender.count
    });

  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const tender_id = slug;
    if (tender_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        tender_id: tender_id,
      });
    }

    const tender = await models.tender.update(dataTender, {
      where: {
        tender_id: tender_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      tender: tender ? tender : [],
    })
  })

export default handler;
