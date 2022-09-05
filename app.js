/*

    Bibliotecas necessarias para criar uma API
        Express e uma biblioteca para criar aplicacoes em node no formato de api 
            express - npm install express --save

        E uma biblioteca para manipular as permissoes do protocolo http
            cors - npm install cors --save
        
        E uma biblioteca que permite manipular o corpo do protocolo http 
            body--parser - npm install body-parser --save

*/

// import da biblioteca do express para criar a API
const express =  require('express');

// import da biblioteca do cors para manipular as permissoes do protocolo http 
const cors = require('cors');

// import da biblioteca do body-parser que ira manipular o corpo das requisocoes do protocolo http 
const bodyParser = require('body-parser');

const {getListEstados, getEStado} = require('./modulo/estados.js');
const {getCidades} = require('./modulo/cidades');


//cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
// request  - receber dados
// response - devolve dados
// 
app.use((request, response, next) => {
    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos);
    response.header('Acess-Control-Allow-Origin', '*'); 
    //Permite especificar quais serao os verbos (metodos) que a API ira reconhecer
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Estabelece que as permissoes acima sera representada pelo cors 
    app.use(cors());

    next();
})

//EndPoint: Listagem de Estados
app.get('/estados', cors(),async function(request, response, next){
    let estados = getListEstados();

    let estadosJSON = {};

    if(estados)
    {
        //Criamos uma chave chamada uf para receber o array de estados 
        estadosJSON.uf = estados;
        response.status(200);
        response.json(estados);
    }else{
        response.status(400);
        response.json('{message: "Nenhum item encontrado"}');
    }


})

//EndPoint: Busca informacoes de um estado pela sigla
app.get('/estado/:sigla', cors(), async function(request, response, nex){
    //Recebe a sigla enviada por parametro no endpoint
    let sigla = request.params.sigla;
    let estado = getEStado(sigla);

    if(estado){
        response.status(200);
        response.json(estado);
    }else
        response.status(404);
})

app.get('/cidades', cors(), async function(request,response, next){
    let message = {mensagem: 'Olha as cidades ai o'}

    response.status(200);
    response.json(message);
})

//EndPoint: busca todas as cidades de um determinado estado
app.get('/cidadesEstado/:sigla', cors(), async function(request,response,next){
    let sigla = request.params.sigla;
    let cidade = getCidades(sigla);
    let cidadesJSON = {};

    if(cidade){
        cidadesJSON.list = cidade;
        response.status(200);
        response.json(cidade);
    }else{
        response.status(400);
    }


})

//Para que os endpoints possam estar funcionando, precisamos obrigatoriamente finalizar 
// a API essa function, que representa o start da API 
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.');
});