const mysql = require('mysql2');

const params = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const conn = new mysql.createConnection(params);

conn.connect((err) => {
    if(!err) {
        console.log("Conexão com banco de dados efetuada com sucesso!");
    }else {
        console.log("Erro ao conectar com banco de dados: ", err);
    }
})

module.exports = { conn: conn };

