const knex = require("../db/db-knex");
const { lookUpAdressByCep } = require("../services/addressLookup");

const createClient = async (req, res) => {
    const { nome, email, cpf, cep } = req.body;
    const clientData = { nome, email, cpf };

    try {
        if (cep && cep != "") {
            const address = await lookUpAdressByCep(cep);

            if (address instanceof Error) return res.status(400).json({ message: "CEP inválido." });

            else Object.assign(clientData, address);
        }
        const [client] = await knex("clientes").insert(clientData, "*");

        return res.status(201).json(client);
    } catch (error) {
        return res.status(400).json({ message: "Erro interno do servidor." });
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf } = req.body;

    try {
        const client = await knex("clientes")
            .update({ nome, email, cpf })
            .where({ id })
            .returning("*");

        if (!client[0]) {
            return res.status(500).json({
                message:
                    "Erro interno do servidor. Não foi possivel realizar a atualização, tente novamente",
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json("Erro interno do servidor");
    }
};

const listClient = async (req, res) => {
    try {
        const client = await knex("clientes");
        return res.json(client);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

const detailClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await knex("clientes").where({ id }).first();
        return res.json(client);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};


module.exports = {
    createClient,
    updateClient,
    listClient,
    detailClient
};