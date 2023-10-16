const jwt = require('jsonwebtoken');
const knex = require('../db/db-knex');
require('dotenv/config');

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }
    
    const token = authorization.split(' ')[1];
    
    try {
        const { id } = jwt.verify(token, process.env.HASH_PASS);
        
        const user = await knex('usuarios').where({id}).first();

        if (!user) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Não autorizado" })
    }

};

module.exports = authentication;
