const connection = require('./connection');

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [Number(id)],
  );

  return product;
};
const allProducts = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return response;
};

module.exports = {
  allProducts,
  findById,
};