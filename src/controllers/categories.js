const knex = require('../db/db');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias');
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { listCategories };
