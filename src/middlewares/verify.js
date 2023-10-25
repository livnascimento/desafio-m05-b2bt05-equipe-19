const knex = require("../db/db-knex");

const verifyBodyRequest = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const verifyEmail = (requestType, userType) => async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await knex(userType).where({ email }).first();

    if (requestType == "create") {
      const emailExists = user ? true : false;
      if (emailExists)
        return res
          .status(400)
          .json({ message: "Esse e-mail já está cadastrado" });
    } else if (requestType == "login") {
      const emailExists = user ? true : false;
      if (!emailExists)
        return res.status(404).json({ message: "Credenciais inválidas" });
    } else {
      const { id } = req.user;

      if (user) {
        const emailExists = user.id == id ? false : true;
        if (emailExists) {
          return res
            .status(400)
            .json({ message: "Esse e-mail já está cadastrado" });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const verifyProductDescription = (type) => async (req, res, next) => {
  const { id } = req.params;
  const { descricao } = req.body;
  const description = descricao.toLowerCase().trim();
  try {
    const productExist = await knex("produtos")
      .whereRaw("LOWER(descricao)=?", description)
      .first();

    if (type === "create" && productExist) {
      return res.status(400).json({
        message:
          "Já existe um produto com essa descrição já existe no banco de dados, mude a descrição, ou use a rota de atualizar produto",
      });
    }

    if (type === "update" && productExist && productExist.id !== Number(id)) {
      return res.status(400).json({
        message:
          "Já existe um produto com essa descrição já existe no banco de dados, mude a descrição",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const verifyCategoryExist = async (req, res, next) => {
  const { categoria_id } = req.body;
  try {
    const categoryExist = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!categoryExist) {
      return res.status(400).json({ message: "Essa categoria não existe" });
    }
    req.categoria_id_nome = categoryExist.descricao;
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const verifyByIdAnyDataBase = (selectDataBase) => async (req, res, next) => {
  const { id } = req.params;
  const { cliente_id } = req.body;
  const { cliente_id: cliente_id_query } = req.query;

  try {
    const newId = id ?? cliente_id ?? cliente_id_query;

    const findId = await knex(selectDataBase).where({ id: newId });

    if (!findId || findId.length < 1) {
      return res.status(404).json({
        message: `Não foi possivel localizar esse id no banco de dados ${selectDataBase}`,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const verifyCPF = (requestType) => async (req, res, next) => {
  const { cpf } = req.body;

  try {
    const client = await knex("clientes").where({ cpf }).first();

    if (requestType == "create") {
      const cpfExists = client ? true : false;
      if (cpfExists)
        return res.status(400).json({ message: "Esse cpf já está cadastrado" });
    } else if (requestType == "update") {
      const { id } = req.params;

      if (client) {
        const cpfExists = client.id == id ? false : true;
        if (cpfExists) {
          return res
            .status(400)
            .json({ message: "Esse cpf já está cadastrado" });
        }
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const verifyAllProductsId = async (req, res, next) => {
  const { pedido_produtos } = req.body;

  if (!pedido_produtos || pedido_produtos.length < 1)
    return res.status(400).json({ message: "Pedido inválido." });

  const errors = [];

  try {
    await Promise.all(
      pedido_produtos.map(async (product) => {
        const dbProduct = await knex("produtos").where({
          id: product.produto_id,
        });

        if (!dbProduct || dbProduct.length < 1) {
          errors.push(`Produto ${product.produto_id} não encontrado`);
        } else if (
          dbProduct[0].quantidade_estoque < product.quantidade_produto
        ) {
          errors.push(
            `Estoque insuficiente do produto ${product.produto_id}. Quantidade disponível: ${dbProduct[0].quantidade_estoque}`
          );
        }
      })
    );

    if (errors.length > 0) return res.status(400).json({ message: errors[0] });

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  verifyBodyRequest,
  verifyEmail,
  verifyCategoryExist,
  verifyProductDescription,
  verifyByIdAnyDataBase,
  verifyCPF,
  verifyAllProductsId,
};
