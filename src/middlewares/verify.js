const knex = require("../db/db-knex");

const verifyBodyRequest = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const verifyEmail = (requestType) => async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await knex("usuarios").where({ email }).first();

    if (requestType == "create") {
      const emailExists = user ? true : false;
      if (emailExists)
        return res
          .status(400)
          .json({ message: "Esse e-mail já está cadastrado" });
    } else if (requestType == "login") {
      const emailExists = user ? true : false;
      if (!emailExists)
        return res.status(404).json({ message: "Credenciais inválidas" });
    } else {
      const { id } = req.user;

      if (user) {
        const emailExists = user.id == id ? false : true;
        if (emailExists) {
          return res
            .status(400)
            .json({ message: "Esse e-mail já está cadastrado" });
        }
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { verifyBodyRequest, verifyEmail };
