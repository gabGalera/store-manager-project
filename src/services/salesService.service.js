const { allProducts } = require('./productsService.service');
const { salesModel, productsModel } = require('../models');

const findAll = async () => {
  const response = await salesModel.findAll();
  return { type: null, message: response };
};

const insertSale = async (payload) => {
  const id = await salesModel.insertSale(payload);
  return { type: null, message: id };
};

const insertSaleProduct = async (payload, body, allProducts) => {
  const responseArray = [];
  body.forEach(async (sale) => {
    const columns = Object.keys(sale);
    const values = Object.values(sale);
    if (columns[0] !== 'productId') {
      responseArray.push({ type: 400, message: '"productId" is required' });
    }
    if (columns[1] !== 'quantity') {
      responseArray.push({ type: 400, message: '"quantity" is required' });
    }
    if (!values[0]) {
      responseArray.push({ type: 404, message: 'Product not found' });
    }
    if (values[1] < 1) {
      responseArray.push({ type: 422, message: '"quantity" must be greater than or equal to 1' });
    }
    const { message } = allProducts;
    const allIds = message.map((product) => product.id);
    const ThisProductExits = allIds.find((product) => product === Number(values[0]));
    if (!ThisProductExits) { responseArray.push({ type: 404, message: 'Product not found' }); }
  });

  console.log(responseArray);
  if (responseArray.length === 0) {
    const id = await salesModel.insertSale(payload);
    await salesModel.insertSaleProduct(id, body);
    return {
      type: null,
      message: {
        id,
        itemsSold: body,
      },
    };
  }
  return { type: responseArray[0].type, message: responseArray[0].message };
};

module.exports = {
  findAll,
  insertSale,
  insertSaleProduct,
};