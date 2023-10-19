const axios = require('axios').create({
    baseURL: "https://viacep.com.br/ws/",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
    
});

module.exports = axios;