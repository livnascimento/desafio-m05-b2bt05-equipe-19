const knex = require("../db/db-knex");
const { processProducts } = require("../services/order");
const { sendEmail } = require("../services/sendEmail");

const createOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    let valor_total = 0;

    const formatProduct = async (order) => {
      const product = await knex("produtos")
        .where({ id: order.produto_id })
        .first();
      valor_total += product.valor * order.quantidade_produto;

      await knex("produtos")
        .where({ id: order.produto_id })
        .update({
          quantidade_estoque: knex.raw("quantidade_estoque - ?", [
            order.quantidade_produto,
          ]),
        });
      return {
        produto_id: order.produto_id,
        quantidade_produto: order.quantidade_produto,
        valor_produto: product.valor,
      };
    };

    const formatedProducts = await Promise.all(
      pedido_produtos.map(formatProduct)
    );

    const order = await knex("pedidos")
      .returning("*")
      .insert({ cliente_id, observacao, valor_total });

    await processProducts(formatedProducts, order);

    await sendEmail(cliente_id);

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const listAllOrders = async (req, res) => {
  const { cliente_id } = req.query;
  try {
    const orders = await knex("pedidos")
      .leftOuterJoin("pedido_produtos as p", "p.pedido_id", "pedidos.id")
      .select("*")
      .where("pedidos.cliente_id", cliente_id)
      .then((pedidosObj) => {
        const arrayFormatted = [];
        let pedidosIndex = 0;

        if (pedidosObj.length === 0) {
          return null;
        }

        for (let pedidoObj of pedidosObj) {
          const pedido = {
            pedido: {
              id: pedidoObj.pedido_id,
              valor_total: pedidoObj.valor_total,
              observacao: pedidoObj.observacao,
              cliente_id: pedidoObj.cliente_id,
            },
            pedido_produtos: [],
          };

          if (pedidosIndex !== pedido.pedido.id) {
            arrayFormatted.push(pedido);
            pedidosIndex = pedido.pedido.id;
          }

          for (let itensArray of arrayFormatted) {
            const pedido_produtos = {
              id: pedidoObj.id,
              quantidade_produto: pedidoObj.quantidade_produto,
              valor_produto: pedidoObj.valor_produto,
              pedido_id: pedidoObj.pedido_id,
              produto_id: pedidoObj.produto_id,
            };

            if (pedido_produtos.pedido_id === itensArray.pedido.id) {
              itensArray.pedido_produtos.push(pedido_produtos);
            }
          }
        }

        return arrayFormatted;
      });

    if (orders === null) {
      return res.status(404).json({ message: "Nenhum pedido encontrado" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  listAllOrders,
};
