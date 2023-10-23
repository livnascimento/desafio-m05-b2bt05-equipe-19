const express = require("express");

const {
    verifyBodyRequest,
    verifyEmail,
    verifyByIdAnyDataBase,
    verifyCPF
} = require("../middlewares/verify");

const {
    schemaProduct,
    schemaClient,
} = require("../utils/schemas");

const {
    createClient,
    updateClient,
    listClient,
    detailClient
} = require("../controllers/clients");

const clientRoutes = express();

clientRoutes.post(
    "/cliente",
    verifyBodyRequest(schemaClient),
    verifyEmail("create", "clientes"),
    verifyCPF,
    createClient
);

clientRoutes.put(
    "/cliente/:id",
    verifyByIdAnyDataBase("clientes"),
    verifyBodyRequest(schemaProduct),
    updateClient
);

clientRoutes.get("/cliente", listClient);

clientRoutes.get("/cliente/:id", verifyByIdAnyDataBase("clientes"), detailClient);

module.exports = clientRoutes;