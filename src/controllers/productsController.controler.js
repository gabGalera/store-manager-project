const { productsService } = require('../services');

const insert = async (req, res) => {
  const { name } = req.body;
  const payload = await productsService.insert(name);

  if (payload.type) return res.status(payload.type).json(payload);
  res.status(201).json(payload);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(Number(id));
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const allProducts = async (_req, res) => {
  const payload = await productsService.allProducts();

  res.status(200).json(payload.message);
};

module.exports = {
  findById,
  allProducts,
  insert,
};