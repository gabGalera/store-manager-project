const express = require('express');
const { productsModel } = require('./models');
const connection = require('./models/connection');

const app = express();

app.use(express.json());

app.post('/products', async (req, res) => {
  const { name } = req.body;
  const allProducts = await productsModel.allProducts();
  const id = allProducts.length + 1;
  await connection.execute(
    'INSERT INTO products VALUE ( ?, ? )',
    [id, name],
  );
  res.status(201).json({ id, name });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
});

app.get('/products', async (_req, res) => {
  const allProducts = await productsModel.allProducts();

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