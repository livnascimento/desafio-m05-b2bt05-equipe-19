const knex = require("../db/db-knex");

const createProduct = async (req, res) => {
  const { quantidade_estoque, valor, categoria_id } = req.body;
  let { descricao } = req.body;
  descricao = descricao.trim();

  try {
    const product = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");

    if (!product[0] || product.length < 1) {
      return res.status(400).json({
        message:
          "Erro interno do servidor. Não foi possivel realizar o cadastro, tente novamente",
      });
    }

    return res
      .status(201)
      .json({ ...product[0], categoria_descricao: req.categoria_id_nome });
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
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

      if (!products[0]) {
        return res
          .status(404)
          .json({ message: "Não possui produtos com essa categoria" });
      }
      return res.status(200).json(products);
    }

    const products = await knex("produtos")
      .join("categorias as c", "produtos.categoria_id", "c.id")
      .select("produtos.*", "c.descricao as categoria_descricao");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { quantidade_estoque, valor, categoria_id } = req.body;
  let { descricao } = req.body;
  descricao = descricao.trim();

  try {
    const product = await knex("produtos")
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .where({ id })
      .returning("*");

    if (!product[0]) {
      return res.status(400).json({
        message:
          "Erro interno do servidor. Não foi possivel realizar o cadastro, tente novamente",
      });
    }

    return res
      .status(201)
      .json({ ...product[0], categoria_descricao: req.categoria_id_nome });
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
  }
};

const detailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await knex("produtos").where({ id }).first();
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidosProduto = await knex("pedido_produtos")
      .where({ produto_id: id })
      .first();

    if (pedidosProduto) {
      return res
        .status(400)
        .json({
          message:
            "Não é possivel deletar o produto, pois existe um pedido atrelado ao mesmo",
        });
    }
    const product = await knex("produtos").where({ id }).delete();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  createProduct,
  listProducts,
  updateProduct,
  detailProduct,
  deleteProduct,
};
