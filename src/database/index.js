const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize({ ...config, logging: false });

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Conexão foi estabelecida com sucesso.');
    }catch(err) {
        console.error('Erro ao conectar com o banco:', err);
    }
})();

module.exports = sequelize;
