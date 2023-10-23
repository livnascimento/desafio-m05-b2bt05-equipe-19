const express = require('express');
const loginRoutes = require('./login');
const productRoutes = require('./produto');
const userRoutes = require('./users');
const clientRoutes = require('./clients');

const routes = express();

routes.use(loginRoutes);
routes.use(productRoutes);
routes.use(userRoutes);
routes.use(clientRoutes);
routes.use(categoryRoutes);

module.exports = routes;