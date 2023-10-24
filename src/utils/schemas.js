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

const schemaProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatória",
    "string.empty": "O campo descrição é obrigatória",
  }),
  quantidade_estoque: joi
    .number()
    .integer()
    .positive()
    .allow(0)
    .required()
    .messages({
      "any.required": "O campo quantidade_estoque é obrigatório",
      "number.positive":
        "O campo quantidade_estoque precisa ser um numero positivo",
      "number.base":
        "O campo quantidade_estoque tem que ser um numero inteiro positivo",
      "number.integer":
        "O campo quantidade_estoque precisa ser um numero inteiro",
    }),
  valor: joi.number().integer().allow(0).positive().required().messages({
    "any.required": "O campo valor é obrigatório",
    "number.positive": "O campo valor precisa ser um numero positivo",
    "number.base":
      "O campo valor tem que ser um numero inteiro positivo, representar os valores em centavos",
    "number.integer":
      "O campo valor precisa ser um numero inteiro, representar os valores em centavos",
  }),
  categoria_id: joi.number().positive().integer().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.positive": "O campo categoria_id precisa ser um numero positivo",
    "number.base":
      "O campo categoria_id tem que ser um numero inteiro positivo",
  }),
});

const schemaClient = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),
  cpf: joi.string().min(11).max(11).required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.min":
      "O campo cpf requer 11 digitos. Digite sem os pontos e barras",
    "string.max":
      "O campo cpf requer 11 digitos. Digite sem os pontos e barras",
    "string.empty": "O campo cpf é obrigatório",
  }),
  cep: joi.string().min(8).max(8).messages({
    "string.min": "O campo cep requer 8 digitos. Digite sem a barra",
    "string.max": "O campo cep requer 8 digitos. Digite sem a barra",
  }),
  rua: joi.string(),
  numero: joi.string(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string().max(2).min(2).messages({
    "string.min": "O campo estado requer 2 digitos. Digite de forma reduzida",
    "string.max": "O campo estado requer 2 digitos. Digite de forma reduzida",
  }),
});

module.exports = { schemaLogin, schemaUser, schemaProduct, schemaClient };
