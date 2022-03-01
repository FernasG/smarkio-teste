const express = require('express');
const app = express();
require('dotenv').config(); // Configura as váriaveis de ambiente
const rotas = require('./src/routes');
const cors = require('cors');
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use('/audios', express.static('audios'));

// Configuração para renderizar arquivos PUG
app.set('views', './src/views');
app.set('view engine', 'pug');

rotas(app);

app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`); });