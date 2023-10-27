const upload = require('../services/upload');
const knex = require('../db/db-knex');

const uploadImage = async (req, res) => {
    const { imagefile } = req;
    const { id } = req.params;
    console.log(imagefile)
    const key = `produto/${id}/${imagefile.originalname}`

    try {
        const product = await knex('produtos').where({ id: Number(id) }).first();

        if (!product.image) {

            const file = await upload.upload(key, imagefile.buffer, imagefile.mimetype);

            const image = await knex('produtos').where({ id }).update({ produto_imagem: file.url }, "produto_imagem");

            return res.status(201).json(image);
        }

        const path = product.image.split(`${process.env.ENDPOINT}/`)[1];

        await upload.deletar(path);

        const file = await upload.upload(key, imagefile.buffer, imagefile.mimetype);

        const newImage = await knex('produtos').where({ id }).update({ produto_imagem: file.url }, "produto_imagem");

        return res.status(201).json(newImage);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }

}

const deleteImage = async (req, res) => {
    const { id: produto_id } = req.params;

    const product = await knex('produtos').where({ id: Number(produto_id) }).first();

    try {

        const path = product.imagem.split(`${process.env.ENDPOINT}/`)[1];

        await upload.deletar(path);

        await knex('produtos').where({ id: produto_id }).update({ produto_imagem: null });

        return res.json({ mensagem: "Imagem deletado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    uploadImage,
    deleteImage
}