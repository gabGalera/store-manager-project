const { productsModel } = require('../models');
const { validateName } = require('./validations/validationsInput'); 

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, message: product };
};

const allProducts = async () => {
  const response = await productsModel.allProducts();
  return { type: null, message: response };
};

const insert = async (name) => {
  const error = validateName(name);

  if (error.type) return error;

  const response = await productsModel.allProducts();
  const id = response.length + 1;
  await productsModel.insert({ id, name });
  return { id, name };
};

const updateById = async (id, name) => {
  const { type, message } = await findById(id);
  if (type) return { type, message };
  const error = validateName(name);

  if (error.type) return error;
  console.log(type);
  console.log(message);
  await productsModel.updateById(id, name);
  return { type, message };
};

module.exports = {
  allProducts,
  findById,
  insert,
  updateById,
};