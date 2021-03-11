# Smarkio Teste 

Este projeto foi desenvolvido com Node.JS, MySQL, JQuery (Ajax).

## Servidor de Desenvolvimento

1. Assim que clonar o repositório rode o comando `npm upadate` para baixar os pacotes do NPM. 

2. Renomeio o `.env.example` para `.env` e insira suas informações fornecidas pela IBM Watson.

3. Acesse o seu gerenciador do MySQL e crie um banco de dados com o nome `smarkio-teste` (OBS: dá pra colocar qualquer nome, basta alterar o atributo `DB_DATABASE` no arquivo `.env`).

    * Com a tabela criada importe o arquivo `audio.sql` armazenado `src/database`.

    * Acesse novamento seu arquivo `.env` e ajuste os atributos com prefixo `DB` para se conectar com banco de dados local (OBS: se estiver usando XAMPP ou WAMP no Windows provavelmente não precisará mudar nada).

4. Rode o comando `npm run dev` para executar a aplicação.
