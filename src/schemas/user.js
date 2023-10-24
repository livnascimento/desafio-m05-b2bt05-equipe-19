const joi = require("joi");

const schemaUser = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
  }),
});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "o campo email precisa ter um formato válido",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
  }),
});

module.exports = { schemaLogin, schemaUser };
