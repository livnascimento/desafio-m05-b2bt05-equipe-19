// const express = require("express");

// const {
//     verifyBodyRequest,
//     verifyEmail,
//     verifyByIdAnyDataBase,
//     verifyCPF
// } = require("./middlewares/verify");

// const {
//     schemaProduct,
//     schemaClient,
// } = require("./utils/schemas");

// const {
//     createClient,
//     updateClient,
//     listClient,
//     detailClient
// } = require("./controllers/clients");

// const routes = express();

// routes.post(
//     "/cliente",
//     verifyBodyRequest(schemaClient),
//     verifyEmail("create", "clientes"),
//     verifyCPF,
//     createClient
// );

// routes.put(
//     "/cliente/:id",
//     verifyByIdAnyDataBase("clientes"),
//     verifyBodyRequest(schemaProduct),
//     updateClient
// );

// routes.get("/cliente", listClient);

// routes.get("/cliente/:id", verifyByIdAnyDataBase("clientes"), detailClient);

// module.exports = routes;