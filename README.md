# QuickSale - Projeto Interdisciplinar de Conclusão de Curso

![Static Badge](https://img.shields.io/badge/status-em%20desenvolvimento-blue)


## Descrição do Projeto
QuickSale é um Projeto Interdisciplinar de Conclusão de Curso que visa simular uma aplicação de frente de caixa, com foco na primeira sprint de desenvolvimento. Atualmente, o projeto oferece os seguintes endpoints:

### Endpoints Públicos (Acessíveis sem Autenticação)

- Listar categorias: `GET /categorias`
- Cadastrar usuário: `POST /usuario`
- Efetuar login do usuário: `POST /login`

### Endpoints Privados (Requerem Autenticação)

<span style="font-size: smaller; color: gray;">(endpoints em fase de desenvolvimento/teste)</span>

- Editar perfil do usuário logado: `PUT /usuario`
- Detalhar perfil do usuário logado: `GET /usuario`

## Tecnologias Utilizadas
- Linguagem de Programação: Node.js
- Banco de Dados: PostgreSQL
- Autenticação de Usuário: JSON Web Token (JWT)
- Criptografia de Senhas: bcrypt
- Query Builder: Knex
- Validações: Joi

## Metodologia de Desenvolvimento
O projeto QuickSale segue a metodologia ágil SCRUM e faz uso da plataforma Trello para o gerenciamento de tarefas e sprints. O desenvolvimento é dividido em sprints e tem uma duração total de aproximadamente 3 semanas. Ressaltamos que tanto o README quanto o código do projeto estão em constante evolução e podem sofrer alterações ao longo do tempo.

## Testando a Aplicação
Para testar a aplicação, recomendamos o uso de uma ferramenta de teste de API, como o Insomnia. Você pode fazer as requisições diretamente para a seguinte URL:

[Link para a API QuickSale](https://fair-mittens-colt.cyclic.cloud)

Certifique-se de utilizar os endpoints mencionados acima de acordo com a descrição das funcionalidades.

## Desenvolvedoras
- [Lívia Nascimento](https://github.com/livnascimento)
- [Luiza Ferreira](https://github.com/LuhOli42)
- [Vitória Blau](https://github.com/viviblau)