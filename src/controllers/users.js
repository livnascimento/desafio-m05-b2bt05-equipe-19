const knex = require("../db/db-knex");
const bcrypt = require("bcrypt");
require("dotenv/config");

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios")
      .insert({ nome, email, senha: encryptedPassword })
      .returning(["nome", "email"]);

    return res.status(201).json(user[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const detailProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const { rows, rowCount } = await Pool.query(
      'select id, nome, email from usuarios where id = $1',
      [id]
    )

    if (rowCount < 1) {
      return res.status(401).json({ mensagem: 'Usuario não encontrado' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateUser = (req, res) => {

};

module.exports = { createUser, detailProfile, updateUser };
