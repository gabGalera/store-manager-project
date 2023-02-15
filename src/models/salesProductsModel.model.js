const connection = require('./connection');

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

module.exports = {
  allSales,
  findById,
  deleteSaleProduct,
};