const express = require("express");
const { listCategories } = require("./controllers/categories");
const users = require("./controllers/users");
const { verify } = require("jsonwebtoken");
const login = require("./controllers/login");
const { schemaUsuario, schemaLogin } = require("./utils/schemas");

const routes = express();

//***all access routes***
routes.get("/categorias", listCategories);

//routes.post("/usuario", verify(schemaUsuario), users.create);

//****authentication route*******

//routes.post("/login", verify(schemaLogin), login);

//***routes that require login***
routes.get("/usuario", users.detailProfile);
//routes.put("/usuario", verify(schemaUsuario), users.update);

module.exports = routes;
