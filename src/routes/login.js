const express = require("express");

const login = require("../controllers/login");

const {
    schemaLogin
} = require("../schemas/user");

const {
    verifyBodyRequest,
    verifyEmail
} = require("../middlewares/verify");

const loginRoutes = express();

loginRoutes.post(
    "/login",
    verifyBodyRequest(schemaLogin),
    verifyEmail("login", "usuarios"),
    login
);

module.exports = loginRoutes;