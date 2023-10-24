const express = require("express");

const {
    verifyBodyRequest,
    verifyEmail,
    verifyByIdAnyDataBase,
    verifyCPF
} = require("../middlewares/verify");

const {
    schemaClient,
} = require("../schemas/client");

const {
    schemaProduct,
} = require("../schemas/product")

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
    verifyCPF("create"),
    createClient
);

clientRoutes.put(
    "/cliente/:id",
    verifyByIdAnyDataBase("clientes"),
    verifyBodyRequest(schemaProduct),
    verifyCPF("update"),
    updateClient
);

clientRoutes.get("/cliente", listClient);

clientRoutes.get("/cliente/:id", verifyByIdAnyDataBase("clientes"), detailClient);

module.exports = clientRoutes;