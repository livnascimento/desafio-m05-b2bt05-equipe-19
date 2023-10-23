const express = require("express");

const {
    verifyBodyRequest,
    verifyEmail
} = require("../middlewares/verify");

const {
    schemaUser
} = require("../utils/schemas");

const {
    createUser,
    detailProfile,
    updateUser,
} = require("../controllers/users");

const authentication = require("../middlewares/authenticate");

const userRoutes = express();

userRoutes.post(
    "/usuario",
    verifyBodyRequest(schemaUser),
    verifyEmail("create", "usuarios"),
    createUser
);

userRoutes.use(authentication);

userRoutes.get("/usuario", detailProfile);

userRoutes.put(
    "/usuario",
    verifyBodyRequest(schemaUser),
    verifyEmail("update", "usuarios"),
    updateUser
);

module.exports = userRoutes;