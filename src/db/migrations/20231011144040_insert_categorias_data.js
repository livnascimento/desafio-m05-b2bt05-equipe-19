exports.up = function (knex) {
  return knex("categorias").insert([
    { descricao: "Informática" },
    { descricao: "Celulares" },
    { descricao: "Beleza e Perfumaria" },
    { descricao: "Mercado" },
    { descricao: "Livros e Papelaria" },
    { descricao: "Brinquedos" },
    { descricao: "Moda" },
    { descricao: "Bebê" },
    { descricao: "Games" },
  ]);
};

exports.down = function (knex) {};
