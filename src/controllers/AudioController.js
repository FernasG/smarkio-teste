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
        let id = "";

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
            let sql = `INSERT INTO audio (comentario, caminho) VALUES ("${text}", "${path}")`;
            id = await db.conn.promise().query(sql)
            .then(([ret]) => {
                return ret.insertId;
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            console.log('error => ', err);

            res.status(500).json({
                error: true,
                code: 500,
                data: err
            })
        });

        res.status(200).json({
            error: false,
            code: 200,
            data: { id: id }
        });
    },

    getAudio: async function(req, res) {
        console.log('[GET][AudioController] - getAudios');
        const { id } = req.params;

        let sql = `SELECT * FROM audio WHERE id = ${id}`;

        let data = await db.conn.promise().query(sql)
        .then(([ret]) => {
            let aux = JSON.stringify(ret[0]);
            return JSON.parse(aux);
        }).catch((err) => {
            console.log('Erro getting data from database: ', err);

            res.status(500).json({
                error: true,
                code: 500,
                data: err
            })
        });

        res.status(200).json({
            error: false,
            code: 200,
            data: data
        });
    }
}