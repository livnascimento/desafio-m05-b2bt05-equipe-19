const express = require("express");

const { listCategories } = require("../controllers/categories");
const { verifyCategoryExist } = require("../middlewares/verify");

const categoryRoutes = express();

categoryRoutes.get("/categoria", verifyCategoryExist, listCategories);

module.exports = categoryRoutes;