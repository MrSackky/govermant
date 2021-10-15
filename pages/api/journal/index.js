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
    const { organization_id, results, page, search, sortField = "journal_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            journal_subject: {
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
            journal_subject: {
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
            [Op.ne]: null,
          },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _journals = await models.journals.findAndCountAll({
      attributes: [
        'journal_id', 'organization_id', 'journal_subject', 'journal_detail',
        'journal_file', 'journal_ori', 'is_show', 'journal_img',
        'date_created', 'date_update', 'is_deleted', 'ip'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "journal_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _journals.rows,
      totalCount: _journals.count
    });

  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const journal_id = slug;
    if (journal_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        journal_id: journal_id,
      });
    }

    const journals = await models.journals.update(dataJournals, {
      where: {
        journal_id: journal_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      journals: journals ? journals : [],
    })
  })

export default handler;
