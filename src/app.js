const express = require('express');
const { productsController } = require('./controllers/index');
const { salesService, productsService } = require('./services');

const app = express();

app.use(express.json());

app.post('/sales', async (req, res) => {
  const { body } = req;
  const allSales = await salesService.findAll();
  const allProducts = await productsService.allProducts();
  const { type, message } = await salesService.insertSaleProduct(allSales, body, allProducts);

  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
});

app.post('/products', productsController.insert);

app.get('/products/:id', productsController.findById);

app.get('/products', productsController.allProducts);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;