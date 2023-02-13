const { productsModel } = require('../models');

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, message: product };
};

const allProducts = async () => {
  const response = await productsModel.allProducts();
  return { type: null, message: response };
};

module.exports = {
  allProducts,
  findById,
};