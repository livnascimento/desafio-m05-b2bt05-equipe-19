const express = require("express");

const { listCategories } = require("../controllers/categories");

const categoryRoutes = express();

categoryRoutes.get("/categorias", listCategories);

module.exports = categoryRoutes;