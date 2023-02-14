const connection = require('./connection');

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [Number(id)],
  );
  console.log(product);
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

const updateById = async (id, name) => connection.execute(
    `
    UPDATE products
    SET name = ?
    WHERE id = ? 
    `,
    [name, id],
  );

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

module.exports = {
  allProducts,
  findById,
  insert,
  updateById,
  deleteById,
};