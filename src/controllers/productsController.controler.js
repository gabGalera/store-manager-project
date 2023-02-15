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

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateById(id, name);
  if (type) return res.status(type).json({ message });
  message.name = name;
  res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteById(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.allProducts();
  const response = products.message.filter((product) => product.name.includes(q));
  res.status(200).json(response);
};

module.exports = {
  findById,
  allProducts,
  insert,
  updateById,
  deleteById,
  searchProduct,
};