const express = require('express');
const loginRoutes = require('./login');
const productRoutes = require('./produto');
const userRoutes = require('./users');
const clientRoutes = require('./clients');
const categoryRoutes = require('./categories');

const routes = express();

routes.use(categoryRoutes);
routes.use(loginRoutes);
routes.use(userRoutes);
routes.use(productRoutes);
routes.use(clientRoutes);

module.exports = routes;