const knex = require("../db/db-knex");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios")
      .insert({ nome, email, senha: encryptedPassword })
      .returning(["nome", "email"]);

    return res.status(201).json(user[0]);
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." });
  }
};

const detailProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await knex("usuarios").where({ id }).first();

    if (!user || user.lenght < 1) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const { senha: _, ...userDetails } = user;

    return res.json(userDetails);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { nome, email, senha } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10);
    const user = await knex("usuarios")
      .where({ id })
      .update({ nome, email, senha: encryptedPassword }, "*");

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({message: "Erro interno do servidor"});
  }
};

module.exports = { createUser, detailProfile, updateUser };
