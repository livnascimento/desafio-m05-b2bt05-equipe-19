exports.up = function(knex) {
    return knex.schema.createTable("pedido_produtos", function (table) {
        table.increments("id").primary()
        table.integer("pedido_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table.integer("produto_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("produtos")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table.integer("valor_produto")
        table.integer("quantidade_produto").notNullable()
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable("pedido_produtos");
};
