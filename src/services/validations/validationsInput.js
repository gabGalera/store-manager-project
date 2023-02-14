const { nameSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate(name);

  let errorType = 500;
  if (error && error.message === '"value" length must be at least 5 characters long') {
    errorType = 422;
  } else {
    errorType = 400;
  }
  if (error) return { type: errorType, message: error.message.replace('value', 'name') };

  return { type: null, message: '' };
};

const validateIfProductIsFound = async (allProducts, responseArray, values) => {
  const { message } = allProducts;
  const allIds = message.map((product) => product.id);
  const ThisProductExits = allIds.find((product) => product === Number(values[0]));
  if (!ThisProductExits) { responseArray.push({ type: 404, message: 'Product not found' }); }
};

const validateSalesProducts = async (sale, allProducts, responseArray) => {
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
  validateIfProductIsFound(allProducts, responseArray, values);
};
module.exports = {
  validateName,
  validateSalesProducts,
};