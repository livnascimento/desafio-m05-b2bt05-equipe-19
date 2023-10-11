const knex = require('../db/db');

const verifyEmail = (requestType) => async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await knex('usuarios').where({ email }).first();

        if (requestType == "cadastro") {

            const emailExists = user ? true : false;
            if (emailExists) return res.status(400).json({ message: "Esse e-mail já está cadastrado" });

        } else {

            const { id } = req.usuario;
            const emailExists = user.id == id ? false : true;
            if (emailExists) return res.status(400).json({ message: "Esse e-mail já está cadastrado" });

        }

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = verifyEmail;