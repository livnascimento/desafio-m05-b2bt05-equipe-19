const express = require("express");

const { verifyByIdAnyDataBase, verifyAllProductsId, verifyBodyRequest } = require("../middlewares/verify");
const { createOrder } = require("../controllers/orders");
const { schemaOrder } = require("../schemas/orders");

const ordersRoutes = express();

ordersRoutes.post(
    '/pedido', 
    verifyBodyRequest(schemaOrder),
    verifyByIdAnyDataBase("clientes"),
    verifyAllProductsId,
    createOrder
)

module.exports = ordersRoutes;