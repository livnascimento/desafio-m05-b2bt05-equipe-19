//usado para o JOI verificar os dados que foram mandados no request
const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório"
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.min": "O campo senha requer 5 digitos",
    "string.empty": "O campo senha é obrigatório",
  }),
});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "o campo email precisa ter um formato válido",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.min": "O campo senha requer 5 digitos",
    "string.empty": "O campo senha é obrigatório",
  }),
});

module.exports = { schemaLogin, schemaUsuario };
