const knex = require('../db/db');
const bcrypt = require('bcrypt');
require('dotenv/config');

const createUser = async (req, res) => {

    const { nome, email, senha } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(senha, 10);

        const user = await knex('usuarios').insert({nome, email, senha: encryptedPassword}).returning(["nome", "email"]);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor."});
    }
};

const detailProfile = (req, res) => { };

const update = (req, res) => { };

module.exports = { createUser, detailProfile, update };
