const knex = require("../db/db-knex");

const createProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
  } catch (error) {}
};

const listProducts = async (req, res) => {};

const updateProduct = async (req, res) => {};

module.exports = { createProduct, listProducts, updateProduct };
