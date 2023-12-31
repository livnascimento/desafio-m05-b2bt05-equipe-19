const express = require("express");
const loginRoutes = require("./login");
const productRoutes = require("./products");
const userRoutes = require("./users");
const clientRoutes = require("./clients");
const categoryRoutes = require("./categories");
const ordersRoutes = require("./orders");
const uploadRoutes = require("./upload");

const routes = express();

routes.use(categoryRoutes);
routes.use(loginRoutes);
routes.use(userRoutes);
routes.use(productRoutes);
routes.use(clientRoutes);
routes.use(ordersRoutes);
routes.use(uploadRoutes);

module.exports = routes;
