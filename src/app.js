const express = require('express');
const {
  productsController,
  salesController,
  salesProductsController,
} = require('./controllers/index');
const { productsService } = require('./services');

const app = express();

app.use(express.json());

app.delete('/sales/:id', salesController.deleteSale);

app.put('/sales/:id', salesProductsController.updateSale);

app.get('/sales/:id', salesProductsController.findById);

app.post('/sales', salesController.newSale);

app.get('/sales', salesProductsController.allSales);

app.get('/products/search', async (req, res) => {
  const { q } = req.query;
  const allProducts = await productsService.allProducts();
  const response = allProducts.message.filter((product) => product.name.includes(q));
  res.status(200).json(response);
});

app.delete('/products/:id', productsController.deleteById);

app.put('/products/:id', productsController.updateById);

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