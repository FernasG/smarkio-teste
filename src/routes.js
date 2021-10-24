const audioController = require('./controllers/AudiosController');
const Audio = require('./database/models/Audio');

module.exports = (app) => {
    // Função responsável por renderizar o arquivo PUG
    app.get('/', async(req, res) => {
        const audios = await Audio.findAll({ order: [['created_at']] });

        res.render('index', { title: 'Smarkio Teste - Chat Bots', audios });
    });

    app.post('/audio', audioController.createAudio);
    app.get('/audio/:id', audioController.getAudio);
}