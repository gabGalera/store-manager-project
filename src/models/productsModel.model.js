const connection = require('./connection');

const allProducts = async () => {
  const response = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return response;
};

module.exports = {
  allProducts,
};