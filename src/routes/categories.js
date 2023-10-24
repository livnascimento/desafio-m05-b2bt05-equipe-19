const express = require("express");

const { listCategories } = require("../controllers/categories");

const categoryRoutes = express();

categoryRoutes.get("/categoria", listCategories);

module.exports = categoryRoutes;