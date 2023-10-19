const axios = require('../api');

const lookUpAdressByCep = async (cep) => {
    try {
        const address = await axios.get(`${cep}/json/`);
        const { data } = address;

        if (data.erro) throw new Error();

        const formattedAddress = {
            cep,
            rua: data.logradouro,
            numero: null,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
        }

        return formattedAddress;
    } catch (error) {
        return error;
    }
}

module.exports = { lookUpAdressByCep };
