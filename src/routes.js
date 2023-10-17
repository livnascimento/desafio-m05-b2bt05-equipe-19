const express = require("express");
const { listCategories } = require("./controllers/categories");
const {
  createUser,
  detailProfile,
  updateUser,
} = require("./controllers/users");
const { verifyBodyRequest, verifyEmail } = require("./middlewares/verify");
const login = require("./controllers/login");
const { schemaUsuario, schemaLogin } = require("./utils/schemas");

const authentication = require("./middlewares/authenticate");

const routes = express();

routes.get("/categorias", listCategories);
routes.post(
  "/usuario",
  verifyBodyRequest(schemaUsuario),
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
  verifyBodyRequest(schemaUsuario),
  verifyEmail("update"),
  updateUser
);

module.exports = routes;
