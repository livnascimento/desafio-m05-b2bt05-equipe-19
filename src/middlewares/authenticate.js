const jwt = require("jsonwebtoken");
const knex = require("../db/db-knex");

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.trim() == "Bearer") {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.HASH_PASS);

    const user = await knex("usuarios").where({ id }).first();

    if (!user) {
      return res.status(400).json({ message: "Não autorizado" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Não autorizado" });
  }
};

module.exports = authentication;
