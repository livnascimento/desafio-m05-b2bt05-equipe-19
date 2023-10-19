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
  let { filtro } = req.query;

  if (!Array.isArray(filtro)) {
    let array = [];
    array.push(filtro);
    filtro = array;
  }

  filtro = filtro.filter((fil) => fil !== "");

  try {
    if (filtro && filtro.length > 0) {
      filtro = filtro.map((fil) => fil.trim().toLowerCase());

      let query = `LOWER(c.descricao)=? `;

      for (let x = 1; x < filtro.length; x++) {
        query += ` or LOWER(c.descricao)=?`;
      }

      const products = await knex("produtos")
        .join("categorias as c", "produtos.categoria_id", "c.id")
        .select("*", "c.descricao as categoria_descricao")
        .whereRaw(query, filtro);
      return res.status(200).json(products);
    }

    const products = await knex("produtos")
      .join("categorias as c", "produtos.categoria_id", "c.id")
      .select("*", "c.descricao as categoria_descricao");

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
