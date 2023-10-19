exports.up = function (knex) {
  return knex.schema.createTable("categorias", function (table) {
    table.increments("id").primary(),
      table.string("descricao", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categorias");
};
