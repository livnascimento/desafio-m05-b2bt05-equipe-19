const knex = require('../db/db-knex');
const { processProducts } = require('../services/order');
const { sendEmail } = require('../services/sendEmail');

const createOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        let valor_total = 0;

        const formatProduct = async (order) => {
            const product = await knex('produtos').where({ id: order.produto_id }).first();
            valor_total += product.valor * order.quantidade_produto;

            await knex('produtos')
                .where({ id: order.produto_id })
                .update({ quantidade_estoque: knex.raw('quantidade_estoque - ?', [order.quantidade_produto]) });
            return {
                produto_id: order.produto_id,
                quantidade_produto: order.quantidade_produto,
                valor_produto: product.valor
            };
        };

        const formatedProducts = await Promise.all(pedido_produtos.map(formatProduct));

        const order = await knex("pedidos").returning("*").insert({ cliente_id, observacao, valor_total });

        await processProducts(formatedProducts, order);

        await sendEmail(cliente_id);

        return res.status(201).json({ order });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    createOrder
}