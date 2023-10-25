const joi = require('joi');

exports.schemaOrder = joi.object({
    cliente_id: joi.required().messages({
        'any.required': 'cliente_id é obrigatório.'
    }),
    observacao: joi.string().messages({
        'string.base': 'Observação inválida'
    }),
    valor_total: joi.number().messages({
        'number.base': 'Valor inválido'
    }),
    pedido_produtos: joi.array()
        .required()
        .items(
            joi.object({
                produto_id: joi.number().required().positive().messages({
                    'number.base': 'O id deve ser um número.',
                    'number.empty': 'O id não pode estar vazio.',
                    'number.positive': 'O id deve ser maior que zero.'
                }),
                quantidade_produto: joi.number().required().positive().messages({
                    'any.required': 'Não é possível adicionar um produto sem a quantidade.',
                    'number.base': 'A quantidade do produto deve ser um número.',
                    'number.empty': 'Não é possível adicionar um produto sem a quantidade.',
                    'number.positive': 'Não é possível adicionar um produto sem a quantidade.'
                })
            })
        ).messages({
            'array.base': 'Você deve enviar uma lista com 1 ou mais produtos.',
            'any.required': 'Você deve enviar uma lista com 1 ou mais produtos.',
            'any.empty': 'Não é possível fazer um pedido sem produtos.',
        })
})
