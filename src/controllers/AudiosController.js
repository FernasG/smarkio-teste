const Audio = require('../database/models/Audio');
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
        }).then(async (buffer) => {
            let date = Date.now();
            let path = `audios/${date}.wav`;

            fs.writeFileSync(path, buffer);

            // Insere dados na tabela de audios
            let audio = await Audio.create({ comentario: text, caminho: path });
            let id = audio.getDataValue('id');

            res.status(200).json({
                error: false,
                code: 200,
                data: { id }
            });
        }).catch((err) => {
            res.status(500).json({
                error: true,
                code: 500,
                data: err
            })
        });
    },

    getAudio: async function(req, res) {
        console.log('[GET][AudioController] - getAudios');
        const { id } = req.params;

        const audio = await Audio.findOne({ where: { id } });

        res.status(200).json({
            error: false,
            code: 200,
            data: audio
        });
    }
}