const express = require("express");

const {
  verifyByIdAnyDataBase,
  verifyAllProductsId,
  verifyBodyRequest,
} = require("../middlewares/verify");
const { createOrder, listAllOrders } = require("../controllers/orders");
const { schemaOrder } = require("../schemas/orders");

const ordersRoutes = express();

ordersRoutes.post(
  "/pedido",
  verifyBodyRequest(schemaOrder),
  verifyByIdAnyDataBase("clientes"),
  verifyAllProductsId,
  createOrder
);

ordersRoutes.get("/pedido", verifyByIdAnyDataBase("clientes"), listAllOrders);

module.exports = ordersRoutes;
