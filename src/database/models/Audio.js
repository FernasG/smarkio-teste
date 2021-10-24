const { DataTypes, Model } = require('sequelize');
const sequelize = require('../index');

class Audio extends Model {}

Audio.init({
    comentario: DataTypes.TEXT,
    caminho: DataTypes.STRING
}, {
    sequelize
});

module.exports = Audio;