const knex = require("../db/db-knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await knex("usuarios").where({ email }).first();

    const isPasswordValid = await bcrypt.compare(senha, user.senha); //user.rows[0].senha

    if (!isPasswordValid)
      return res.status(400).json({ message: "Credenciais inválidas." });

    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.HASH_PASS,
      { expiresIn: "12h" }
    );

    const { senha: _, ...authenticatedUser } = user;

    return res.json({ authenticatedUser, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = login;
