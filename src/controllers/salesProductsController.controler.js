const { salesProductsService, productsService } = require('../services');

const allSales = async (_req, res) => {
  const { message } = await salesProductsService.allSales();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.findById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const updateSale = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const products = await productsService.allProducts();
  const { type, message } = await salesProductsService.updateSaleProduct(id, body, products);
  if (type) return res.status(type).json({ message });
  return res.status(200).json({
    saleId: id,
    itemsUpdated: body,
  });
};

module.exports = {
  allSales,
  findById,
  updateSale,
};