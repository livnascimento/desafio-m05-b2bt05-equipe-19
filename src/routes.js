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
} = require("./controllers/produto");

const routes = express();

routes.get("/categorias", listCategories);
routes.post(
  "/usuario",
  verifyBodyRequest(schemaUser),
  verifyEmail("create"),
  createUser
);

routes.post(
  "/login",
  verifyBodyRequest(schemaLogin),
  verifyEmail("login"),
  login
);

routes.use(authentication);

routes.get("/usuario", detailProfile);
routes.put(
  "/usuario",
  verifyBodyRequest(schemaUser),
  verifyEmail("update"),
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

module.exports = routes;
