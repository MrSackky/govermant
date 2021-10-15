import nextConnect from 'next-connect';
const models = require('../../../db/models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const news_id = slug;
    console.log(news_id)

    const information_news = await models.information_news.findOne({
      where: {
        infor_id : news_id,
      },
     
    });
    
    
    return res.status(200).json({
      status: 200,
      message: "success",
      information_news: information_news ? information_news : []
    });
  })
  .post(async (req, res) => { })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const news_id = slug;
    const {
      infor_detail
    } = body;

    const dataNews = {
      infor_detail: infor_detail
    };

    if (
      news_id == undefined ||
      infor_detail == undefined 
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        news_id: news_id,
        dataNews: dataNews
      });
    }


    const organization = await models.information_news.update(
      dataNews, {
      where: {
        infor_id : news_id
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
  .delete(async (req, res) => {
    
  })
  .patch(async (req, res) => {

  });

export default handler;
