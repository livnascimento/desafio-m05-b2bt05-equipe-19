const knex = require('../db/db-knex')

exports.processProducts = async (formatedProducts, order) => {
    try {
        formatedProducts.forEach(async product => {
            await knex("pedido_produtos").insert({ pedido_id: order[0].id, ...product });
        });
        return;
    } catch (error) {
        return error
    }
}
