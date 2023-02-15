const connection = require('./connection');
const { deleteSale, insertSaleProduct } = require('./salesModel.model');

const allSales = async () => {
  const [response] = await connection.execute(
    `SELECT 
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      sales_products AS sp
    LEFT JOIN
      sales AS s
    ON 
      sp.sale_id = s.id`
    ,
  );
  return response;
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT 
      s.date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM sales_products AS sp
    LEFT JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE s.id = ?`,    
    [id],
  );
  return sale;
};

const deleteSaleProduct = async (id) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
};

const updateSaleProduct = async (id, body) => {
  await deleteSaleProduct(id);
  await deleteSale(id);
  await connection.execute(
    'INSERT INTO sales VALUE(?, ?)',
    [id, new Date()],
  );
  await insertSaleProduct(id, body);
};

module.exports = {
  allSales,
  findById,
  deleteSaleProduct,
  updateSaleProduct,
};