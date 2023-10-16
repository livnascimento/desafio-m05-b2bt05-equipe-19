
const knex = require("../db/db-knex");
const bcrypt = require("bcrypt");
const verifyEmail = require("../middlewares/user");
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
    const user = await knex('usuarios').where({ id }).first();

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuario não encontrado' });
    }

    const { senha: _, ...userDetails } = user;

    return res.json(userDetails);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { nome, email, senha } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10);
    const user = await knex('usuarios').where({ id }).update({ nome, email, senha: encryptedPassword }, '*');
    // pool.query('update usuarios set nome = $1, email = $2, senha = $3 where ud = $4', [nome, email, encryptedPassword, id]);

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json('Erro interno do servidor');
  }
};



module.exports = { createUser, detailProfile, updateUser };
