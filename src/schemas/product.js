const joi = require('joi');

exports.schemaProduct = joi.object({
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
    valor: joi.number().integer().positive().required().messages({
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