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


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          // is_done: {
          //   [Op.ne]: 1,
          // },
          [Op.or]: [{
            contact_post: {
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
          // is_done: {
          //   [Op.ne]: 1,
          // },
          [Op.or]: [{
            contact_post: {
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

          // is_done: {
          //   [Op.ne]: 1,
          // },
          organization_id: organization_id

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          // is_done: {
          //   [Op.ne]: 1,
          // },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _blessing = await models.contact.findAndCountAll({
      attributes: [
        'contact_id', 'organization_id', 'contact_post', 'contact_detail', 'contact_name_posted',
        'contact_telephone', 'contact_email', 'date_created', 'date_updated',
        'ip', 'personid', 'is_done',
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "contact_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
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
    const { body } = req;
    const { slug } = req.query;
    const contact_id = slug;
    if (contact_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        contact_id: contact_id,
      });
    }

    const contact = await models.contact.update(dataBlessing, {
      where: {
        contact_id: contact_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      contact: contact ? contact : [],
    })
  })

export default handler;
