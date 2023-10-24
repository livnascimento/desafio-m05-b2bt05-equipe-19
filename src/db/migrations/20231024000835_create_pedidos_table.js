exports.up = function (knex) {
    return knex.schema.createTable("pedidos", function (table) {
        table.increments("id").primary();
        table.string("descricao", 255)
        .notNullable();
        table.integer("cliente_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clientes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table.text("observacao");
        table.integer("valor_total")
        .unsigned();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("pedidos");
};
