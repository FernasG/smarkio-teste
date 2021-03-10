var audioController = require('./controllers/AudioController');

module.exports = (app) => {
    app.post('/audio', audioController.createAudio);
    app.get('/audio', audioController.getAudios);
}