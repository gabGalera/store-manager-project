const connection = require('./connection');

const findAll = async () => {
  const [allSales] = await connection.execute(
    'SELECT * FROM sales',
  );
  return allSales;
};

const insertSale = async (allSales) => {
  const id = allSales.length + 1;
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales VALUE(?, ?)',
    [id, new Date()],
  );

  return insertId;
};

const insertSaleProduct = async (id, body) => {
  Promise.all(body.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?)',
      [Number(id), sale.productId, sale.quantity],
    );
  }));
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  insertSale,
  insertSaleProduct,
  deleteSale,
};