CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);
CREATE TABLE categorias (
  ID SERIAL PRIMARY KEY,
  descricao VARCHAR(100)
);
