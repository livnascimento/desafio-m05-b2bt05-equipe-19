//usado para o JOI verificar os dados que foram mandados no request
const joi = require("joi");

const schemaUsuario = joi.object({});

const schemaLogin = joi.object({});

module.exports = { schemaLogin, schemaUsuario };
