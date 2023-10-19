exports.up = function (knex) {
  return knex.schema.createTable("clientes", function (table) {
    table.increments("id").primary(),
      table.string("nome", 255).notNullable(),
      table.string("email", 100).notNullable().unique();
    table.string("cpf", 11).notNullable().unique();
    table.string("cep", 8);
    table.string("rua", 255);
    table.string("numero", 255);
    table.string("bairro", 255);
    table.string("cidade", 255);
    table.string("estado", 2);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clientes");
};
