const express = require('express');
const { productsService } = require('./services/index');

const app = express();

app.use(express.json());

app.post('/products', async (req, res) => {
  const { name } = req.body;
  const payload = await productsService.insert(name);

  if (payload.type) return res.status(payload.type).json(payload);
  res.status(201).json(payload);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(Number(id));
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
});

app.get('/products', async (_req, res) => {
  const allProducts = await productsService.allProducts();

  res.status(200).json(allProducts.message);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;