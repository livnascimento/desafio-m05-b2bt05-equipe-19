exports.up = function (knex) {
  return knex.schema.createTable("produtos", function (table) {
    table.increments("id"),
      table.string("descricao", 255).notNullable(),
      table.integer("quantidade_estoque").notNullable().unsigned();
    table.float("valor", 100).notNullable().unsigned();
    table.integer("categoria_id").notNullable().unsigned();
    table.foreign("categoria_id").references("categorias.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("produtos");
};
