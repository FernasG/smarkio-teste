const mysql = require('mysql');

const conn = new mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smarkio-teste"
});

conn.connect((err) => {
    if(!err) {
        console.log("Conexão com banco de dados efetuada com sucesso!");
    }else {
        console.log(err);
    }
})

module.exports = { conn: conn };

