// const express = require("express");

// const {
//     verifyBodyRequest,
//     verifyEmail
// } = require("./middlewares/verify");

// const {
//     schemaUser
// } = require("./utils/schemas");

// const {
//     createUser,
//     detailProfile,
//     updateUser,
// } = require("./controllers/users");

// const routes = express();

// routes.post(
//     "/usuario",
//     verifyBodyRequest(schemaUser),
//     verifyEmail("create", "usuarios"),
//     createUser
// );

// //depois login
// routes.get("/usuario", detailProfile);
// routes.put(
//     "/usuario",
//     verifyBodyRequest(schemaUser),
//     verifyEmail("update", "usuarios"),
//     updateUser
// );

// module.exports = routes;