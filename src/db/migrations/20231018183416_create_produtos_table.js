exports.up = function (knex) {
    return knex.schema.createTable("produtos", function (table) {
      table.increments("id").primary(),
      table.string("descricao", 255).notNullable(),
      table.integer("quantidade_estoque").notNullable().unsigned(),
      table.integer("valor").notNullable().unsigned(),
      table.integer("categoria_id").notNullable().unsigned(),
      table.foreign("categoria_id").references("categorias.id"),
      table.text("produto_imagem")
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("produtos");
  };
  