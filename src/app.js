const express = require('express');
const { productsController, salesController } = require('./controllers/index');
const connection = require('./models/connection');

const app = express();

app.use(express.json());

app.post('/sales', salesController.newSale);

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
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
  if (!sale.length) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sale);
});

app.get('/sales', async (_req, res) => {
  const [allSales] = await connection.execute(
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
  res.status(200).json(allSales);
});

app.get('/products/:id', productsController.findById);

app.post('/products', productsController.insert);

app.get('/products', productsController.allProducts);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;