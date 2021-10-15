import nextConnect from 'next-connect';
const models = require('../../../db/models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const package_id = slug;


    const packageData = await models.Packages.findOne({
  
      where: {
        package_id: package_id,
      },
     
    });
    return res.status(200).json({
      status: 200,
      message: "success",
      packageData: packageData ? packageData : []
    });
  })
  .post(async (req, res) => { })
  .put(async (req, res) => {
   
  })
  .delete(async (req, res) => {
    

  })
  .patch(async (req, res) => {

  });

export default handler;
