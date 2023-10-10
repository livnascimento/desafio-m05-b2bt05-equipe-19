const express = require("express");
const { listCategories } = require("./controllers/categories");
const users = require("./controllers/users");
const verifyBodyRequest = require("./middlewares/verify");
const login = require("./controllers/login");
const { schemaUsuario, schemaLogin } = require("./utils/schemas");

const routes = express();

//***all access routes***
routes.get("/categorias", listCategories);

//routes.post("/usuario", verifyBodyRequest(schemaUsuario), users.create);

//****authentication route*******

//routes.post("/login", verifyBodyRequest(schemaLogin), login);

//***routes that require login***
routes.get("/usuario", users.detailProfile);
//routes.put("/usuario", verifyBodyRequest(schemaUsuario), users.update);

module.exports = routes;
