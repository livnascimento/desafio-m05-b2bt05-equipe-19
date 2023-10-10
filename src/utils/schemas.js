//usado para o JOI verificar os dados que foram mandados no request
const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().messages({}),
  email: joi.string().email().required().messages({
    "string.mail": "o campo email precisa ter um formato válido",
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
    "string.mail": "o campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.min": "O campo senha requer 5 digitos",
    "string.empty": "O campo senha é obrigatório",
  }),
});

module.exports = { schemaLogin, schemaUsuario };
