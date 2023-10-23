const express = require("express");

const { listCategories } = require("./controllers/categories");
const {
  createUser,
  detailProfile,
  updateUser,
} = require("./controllers/users");
const {
  verifyBodyRequest,
  verifyEmail,
  verifyCategoryExist,
  verifyByIdAnyDataBase,
  verifyProductDescription,
  verifyCPF,
} = require("./middlewares/verify");
const login = require("./controllers/login");
const {
  schemaUser,
  schemaLogin,
  schemaProduct,
  schemaClient,
} = require("./utils/schemas");

const authentication = require("./middlewares/authenticate");
const {
  createProduct,
  listProducts,
  updateProduct,
  detailProduct,
  deleteProduct,
} = require("./controllers/produto");

const {
  createClient,
  updateClient,
  listClient,
  detailClient
} = require("./controllers/clients");

const routes = express();

routes.get("/categorias", listCategories);
routes.post(
  "/usuario",
  verifyBodyRequest(schemaUser),
  verifyEmail("create", "usuarios"),
  createUser
);

routes.post(
  "/login",
  verifyBodyRequest(schemaLogin),
  verifyEmail("login", "usuarios"),
  login
);

routes.use(authentication);

routes.get("/usuario", detailProfile);
routes.put(
  "/usuario",
  verifyBodyRequest(schemaUser),
  verifyEmail("update", "usuarios"),
  updateUser
);

routes.post(
  "/produto",
  verifyBodyRequest(schemaProduct),
  verifyCategoryExist,
  verifyProductDescription("create"),
  createProduct
);
routes.get("/produto", listProducts);
routes.put(
  "/produto/:id",
  verifyByIdAnyDataBase("produtos"),
  verifyBodyRequest(schemaProduct),
  verifyCategoryExist,
  verifyProductDescription("update"),
  updateProduct
);
routes.get("/produto/:id", verifyByIdAnyDataBase("produtos"), detailProduct);
routes.delete(
  "/produto/:id",
  verifyByIdAnyDataBase("produtos"),
  deleteProduct
);

routes.post(
  "/cliente",
  verifyBodyRequest(schemaClient),
  verifyEmail("create", "clientes"),
  verifyCPF,
  createClient
);

routes.put(
  "/cliente/:id",
  verifyByIdAnyDataBase("clientes"),
  verifyBodyRequest(schemaProduct),
  updateClient
);

routes.get("/cliente", listClient);

routes.get("/produto/:id", verifyByIdAnyDataBase("clientes"), detailClient);

module.exports = routes;
