const { htmlCompilator } = require('../../handler');
const { transposter } = require('../../transposter');
const knex = require('../db/db-knex');

exports.sendEmail = async id => {
    const client = await knex('clientes').where({ id }).first();

    try {
        const html = await htmlCompilator('./src/templates/novo-pedido.html', { client: client.nome });

        transposter.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${client.nome} <${client.email}>`,
            subject: 'Recebemos seu pedido!',
            html,
        })

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}