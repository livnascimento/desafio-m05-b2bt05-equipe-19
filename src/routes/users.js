const express = require("express");
const authentication = require("../middlewares/authenticate");

const {
    verifyBodyRequest,
    verifyEmail
} = require("../middlewares/verify");

const {
    schemaUser
} = require("../schemas/user");

const {
    createUser,
    detailProfile,
    updateUser,
} = require("../controllers/users");


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