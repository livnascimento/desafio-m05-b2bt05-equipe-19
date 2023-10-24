const express = require("express");

const {
    verifyBodyRequest,
    verifyCategoryExist,
    verifyByIdAnyDataBase,
    verifyProductDescription,
} = require("../middlewares/verify");

const {
    schemaProduct
} = require("../schemas/product");

const {
    createProduct,
    listProducts,
    updateProduct,
    detailProduct,
    deleteProduct,
} = require("../controllers/products");

const productRoutes = express();

productRoutes.post(
    "/produto",
    verifyBodyRequest(schemaProduct),
    verifyCategoryExist,
    verifyProductDescription("create"),
    createProduct
);
productRoutes.get("/produto", listProducts);
productRoutes.put(
    "/produto/:id",
    verifyByIdAnyDataBase("produtos"),
    verifyBodyRequest(schemaProduct),
    verifyCategoryExist,
    verifyProductDescription("update"),
    updateProduct
);
productRoutes.get("/produto/:id", verifyByIdAnyDataBase("produtos"), detailProduct);
productRoutes.delete(
    "/produto/:id",
    verifyByIdAnyDataBase("produtos"),
    deleteProduct
);

module.exports = productRoutes;