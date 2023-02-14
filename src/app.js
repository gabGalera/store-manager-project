const express = require('express');
const {
  productsController,
  salesController,
  salesProductsController,
} = require('./controllers/index');
const { productsModel } = require('./models');
const connection = require('./models/connection');
const { productsService } = require('./services');

const app = express();

app.use(express.json());

app.post('/sales', salesController.newSale);

app.get('/sales/:id', salesProductsController.findById);

app.get('/sales', salesProductsController.allSales);

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateById(id, name);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
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