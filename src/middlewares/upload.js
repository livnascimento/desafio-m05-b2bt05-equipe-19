const knex = require('../db/db-knex');
const upload = require('../services/upload');

const deleteImage = async (req, res, next) => {
    const { id } = req.params;

    const product = await knex('produtos').where({ id: Number(id) }).first();

    try {

        const path = product.produto_imagem.split(`${process.env.ENDPOINT}/`)[1];

        await upload.deleteFile(path);

        await knex('produtos').where({ id }).update({ produto_imagem: null });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = deleteImage;