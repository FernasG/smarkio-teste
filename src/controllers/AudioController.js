const db = require('../database/config');
const fs = require('fs');
// Váriaveis do IBM-WATSON
const TextToSpeechV1  = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
// Pegar Valores Salvos no .env
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

module.exports = {
    createAudio: async function(req, res) {
        console.log('[POST][AudioController] - createAudio');
        const { text } = req.body;

        const textToSpeech = new TextToSpeechV1 ({
            authenticator: new IamAuthenticator ({
                apikey: api_key,

            }),
            serviceUrl: api_url
        });

        const params = {
            text: text,
            accept: 'audio/wav',
            voice: 'pt-BR_IsabelaV3Voice'
        }

        await textToSpeech.synthesize(params).then((response) => {
            return textToSpeech.repairWavHeaderStream(response.result);
        }).then((buffer) => {
            let date = Date.now();

            fs.writeFileSync(`./src/audios/${date}.wav`, buffer);
        }).catch((err) => {
            console.log('error', err);
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