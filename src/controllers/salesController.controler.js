const { salesService, productsService } = require('../services');

const newSale = async (req, res) => {
  const { body } = req;
  const allSales = await salesService.findAll();
  const allProducts = await productsService.allProducts();
  const { type, message } = await salesService.insertSaleProduct(allSales, body, allProducts);

  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(type).json({ message });
  
  return res.status(204).json();
};

module.exports = { newSale, deleteSale };