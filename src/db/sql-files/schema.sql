DROP TABLE IF EXISTS clientes

DROP TABLE IF EXISTS produtos

DROP TABLE IF EXISTS categorias

DROP TABLE IF EXISTS usuarios

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

CREATE TABLE produtos {
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL, 
  quantidate_estoque INTEGER UNSIGNED NOT NULL, 
  valor FLOAT UNSIGNED NOT NULL,
  categoria_id INT references categorias(id) NOT NULL
}

CREATE TABLE clientes {
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  cep VARCHAR(8),
  rua VARCHAR(255),
  numero VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(2), 
}
