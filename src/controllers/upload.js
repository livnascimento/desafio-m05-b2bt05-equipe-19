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
        console.log(error.message);
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }

}

const deleteImage = async (req, res) => {
    const { id } = req.params;

    const product = await knex('produtos').where({ id: Number(id) }).first();

    try {

        const path = product.produto_imagem.split(`${process.env.ENDPOINT}/`)[1];

        await upload.deleteFile(path);

        await knex('produtos').where({ id }).update({ produto_imagem: null });

        return res.json({ mensagem: "Imagem deletada com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    uploadImage,
    deleteImage
}