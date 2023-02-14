const { salesProductsService } = require('../services');

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

module.exports = {
  allSales,
  findById,
};