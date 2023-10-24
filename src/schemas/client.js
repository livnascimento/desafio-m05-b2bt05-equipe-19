const joi = require('joi');

exports.schemaClient = joi.object({
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