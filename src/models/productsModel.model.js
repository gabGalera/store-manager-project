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

const insert = async ({ id, name }) => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO products VALUE ( ?, ? )',
      [id, name],
  );
  return insertId;
};

module.exports = {
  allProducts,
  findById,
  insert,
};