const { salesProductsModel } = require('../models');
const { validateSalesProducts } = require('./validations/validationsInput');

const allSales = async () => {
  const message = await salesProductsModel.allSales();
  return { type: null, message };
};

const findById = async (id) => {
  const response = await salesProductsModel.findById(id);

  if (!response.length) return { type: 404, message: 'Sale not found' };
  return { type: null, message: response };
};

const updateSaleProduct = async (id, body, allProducts) => {
  const { type, message } = await findById(id);
  if (type) return { type, message };
  const responseArray = [];
  body.forEach(async (sale) => {
    validateSalesProducts(sale, allProducts, responseArray);
  });
  if (responseArray.length === 0) {
    await salesProductsModel.updateSaleProduct(id, body);
    return { type: null, message: '' };
  }
  return {
    type: responseArray[0].type,
    message: responseArray[0].message,
  };
};

module.exports = {
  allSales,
  findById,
  updateSaleProduct,
};