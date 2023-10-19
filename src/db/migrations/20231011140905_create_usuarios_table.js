exports.up = function (knex) {
  return knex.schema.createTable("usuarios", function (table) {
    table.increments("id").primary(),
      table.string("nome", 255),
      table.string("email", 100).notNullable().unique();
    table.string("senha", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
