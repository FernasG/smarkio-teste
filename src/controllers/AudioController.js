module.exports = {
    createAudio: async function(req, res) {
        console.log('[POST][AudioController] - createAudio');

        res.status(200).json({
            error: false,
            code: 200,
        });
    },

    getAudios: async function(req, res) {
        console.log('[GET][AudioController] - getAudios');

        res.status(200).json({
            error: false,
            code: 200,
        });
    }
}