const { salesProductsModel } = require('../models');

const allSales = async () => {
  const message = await salesProductsModel.allSales();
  return { type: null, message };
};

const findById = async (id) => {
  const response = await salesProductsModel.findById(id);
  if (!response.length) return { type: 404, message: 'Sale not found' };
  return { type: null, message: response };
};

module.exports = {
  allSales,
  findById,
};