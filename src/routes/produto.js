// const express = require("express");

// const {
//     verifyBodyRequest,
//     verifyCategoryExist,
//     verifyByIdAnyDataBase,
//     verifyProductDescription,
// } = require("./middlewares/verify");

// const {
//     schemaProduct
// } = require("./utils/schemas");

// const {
//     createProduct,
//     listProducts,
//     updateProduct,
//     detailProduct,
//     deleteProduct,
// } = require("./controllers/produto");

// const routes = express();

// routes.post(
//     "/produto",
//     verifyBodyRequest(schemaProduct),
//     verifyCategoryExist,
//     verifyProductDescription("create"),
//     createProduct
// );
// routes.get("/produto", listProducts);
// routes.put(
//     "/produto/:id",
//     verifyByIdAnyDataBase("produtos"),
//     verifyBodyRequest(schemaProduct),
//     verifyCategoryExist,
//     verifyProductDescription("update"),
//     updateProduct
// );
// routes.get("/produto/:id", verifyByIdAnyDataBase("produtos"), detailProduct);
// routes.delete(
//     "/produto/:id",
//     verifyByIdAnyDataBase("produtos"),
//     deleteProduct
// );

// module.exports = routes;