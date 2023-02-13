const express = require('express');
const connection = require('./models/connection');

const app = express();

app.get('/products', async (req, res) => {
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