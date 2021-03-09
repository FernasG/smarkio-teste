const express = require('express');
const app = express();
const rotas = require('./src/routes');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

// Configuração para renderizar arquivos HTML
app.set('views', './src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

rotas(app);

app.get('/', (req, res)=> {
    // res.send('Olá Mundo');
    res.render('index.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});