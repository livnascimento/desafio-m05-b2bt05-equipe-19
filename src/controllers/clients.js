const knex = require("../db/db-knex");
const { lookUpAdressByCep } = require("../services/addressLookup");

const createClient = async (req, res) => {
    const { nome, email, cpf, cep } = req.body;
    const clientData = { nome, email, cpf };

    try {
        if (cep) {
            const address = await lookUpAdressByCep(cep);

            if (address instanceof Error) return res.status(400).json({ message: "CEP inválido." });

            else Object.assign(clientData, address);
        }
        const [client] = await knex("clientes").insert(clientData, "*");

        return res.status(201).json(client);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

module.exports = { createClient };