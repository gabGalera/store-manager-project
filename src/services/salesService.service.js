const { salesModel } = require('../models');
const { validateSalesProducts } = require('./validations/validationsInput');

const findAll = async () => {
  const response = await salesModel.findAll();
  return { type: null, message: response };
};

const insertSale = async (allSales) => {
  const id = await salesModel.insertSale(allSales);
  return { type: null, message: id };
};

const insertSaleProduct = async (allSales, body, allProducts) => {
  const responseArray = [];
  body.forEach(async (sale) => {
    validateSalesProducts(sale, allProducts, responseArray);
  });

  if (responseArray.length === 0) {
    const id = await salesModel.insertSale(allSales);
    await salesModel.insertSaleProduct(Number(id), body);
    return {
      type: null,
      message: {
        id: Number(id),
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