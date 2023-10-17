const knex = require("../db/db-knex");

const listCategories = async (req, res) => {
  try {
    const categories = await knex("categorias");
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { listCategories };
