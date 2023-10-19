const knex = require("../db/db-knex");

const createProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const product = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");

    if (!product[0]) {
      return res.status(500).json({
        message:
          "Erro interno do servidor. Não foi possivel realizar o cadastro, tente novamente",
      });
    }

    return res
      .status(201)
      .json({ ...product[0], categoria_descricao: req.categoria_id_nome });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const listProducts = async (req, res) => {};

const updateProduct = async (req, res) => {};

module.exports = { createProduct, listProducts, updateProduct };
