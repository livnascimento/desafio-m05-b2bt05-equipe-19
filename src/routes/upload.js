const { uploadImage, deleteImage } = require("../controllers/upload");
const { verifyByIdAnyDataBase } = require("../middlewares/verify");
const express = require('express');
const multer = require('../multer')

const uploadRoutes = express();

uploadRoutes.post('/upload/:id', verifyByIdAnyDataBase('produtos'), multer.single('imagefile'), uploadImage);

module.exports = uploadRoutes;