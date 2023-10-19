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

const listProducts = async (req, res) => {
  let { categoria_id } = req.query;

  try {
    if (categoria_id && categoria_id.length > 0) {
      if (!Array.isArray(categoria_id)) {
        let array = [];
        array.push(categoria_id);
        categoria_id = array;
      }
      categoria_id = categoria_id.map((fil) => Number(fil));

      let query = `c.id=? `;

      for (let x = 1; x < categoria_id.length; x++) {
        query += ` or c.id=?`;
      }

      const products = await knex("produtos")
        .join("categorias as c", "produtos.categoria_id", "c.id")
        .select("produtos.*", "c.descricao as categoria_descricao")
        .whereRaw(query, categoria_id);
      return res.status(200).json(products);
    }

    const products = await knex("produtos")
      .join("categorias as c", "produtos.categoria_id", "c.id")
      .select("produtos.*", "c.descricao as categoria_descricao");

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const product = await knex("produtos")
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .where({ id })
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
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { createProduct, listProducts, updateProduct };
