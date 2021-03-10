const db = require('../database/config');
// Váriaveis do IBM-WATSON
const speechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
// Pegar Valores Salvos no .env
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

console.log(api_key);

module.exports = {
    createAudio: async function(req, res) {
        console.log('[POST][AudioController] - createAudio');

        const speechToText = new speechToTextV1({
            authenticator: new IamAuthenticator ({
                apikey: api_key,

            }),
            serviceUrl: api_url
        });

        res.status(200).json({
            error: false,
            code: 200,
        });
    },

    getAudios: async function(req, res) {
        console.log('[GET][AudioController] - getAudios');

        res.status(200).json({
            error: false,
            code: 200
        });
    }
}