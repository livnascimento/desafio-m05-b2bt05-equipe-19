const { uploadImage, deleteImage } = require("../controllers/upload");
const { verifyByIdAnyDataBase } = require("../middlewares/verify");
const express = require('express');
const multer = require('../multer')

const uploadRoutes = express();

uploadRoutes.post('/upload/:id', verifyByIdAnyDataBase('produtos'), multer.single('imagefile'), uploadImage);
uploadRoutes.delete('/upload/:id', verifyByIdAnyDataBase('produtos'), deleteImage);

module.exports = uploadRoutes;