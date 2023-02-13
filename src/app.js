const express = require('express');
const connection = require('./models/connection');

const app = express();

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [Number(id)],
  );

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
});

app.get('/products', async (_req, res) => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  res.status(200).json(allProducts);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;