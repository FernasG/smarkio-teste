const express = require('express');
const app = express();
require('dotenv').config(); // Configura as váriaveis de ambiente
const rotas = require('./src/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração para renderizar arquivos HTML
app.set('views', './src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

rotas(app);

app.get('/', (req, res)=> {
    res.render('index.html', { port: port });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});