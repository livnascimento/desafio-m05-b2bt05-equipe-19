const upload = require('../services/upload');
const knex = require('../db/db-knex');

const uploadImage = async (req, res) => {
    const { file } = req;
    const { id } = req.params;
    const key = `produto/${id}/${file.originalname}`

    try {
        const product = await knex('produtos').where({ id: Number(id) }).first();

        if (!product.image) {

            const fileImage = await upload.upload(key, file.buffer, file.mimetype);

            const image = await knex('produtos').where({ id }).update({ produto_imagem: fileImage.url }, "produto_imagem");

            return res.status(201).json(image);
        }

        const path = product.image.split(`${process.env.ENDPOINT}/`)[1];

        await upload.deletar(path);

        const fileImage = await upload.upload(key, file.buffer, file.mimetype);

        const newImage = await knex('produtos').where({ id }).update({ produto_imagem: fileImage.url }, "produto_imagem");

        return res.status(201).json(newImage);

    } catch (error) {
        return res.status(400).json({ message: "Erro interno do servidor." });
    }

}

module.exports = {
    uploadImage
}