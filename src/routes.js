const audioController = require('./controllers/AudiosController');
const db = require('./database');

module.exports = (app) => {
    // Função responsável por renderizar o arquivo PUG
    app.get('/', async(req, res) => {
        let sql = "SELECT * FROM audio ORDER BY id";

        let data = await db.conn.promise().query(sql)
        .then(([rows]) => {
            let aux = JSON.stringify(rows);
            return JSON.parse(aux);
        }).catch((err) => {
            console.log('Erro getting data from database: ', err);
        });

        res.render('index', { title: 'Smarkio Teste - Chat Bots', audios: data });
    });

    app.post('/audio', audioController.createAudio);
    app.get('/audio/:id', audioController.getAudio);
}