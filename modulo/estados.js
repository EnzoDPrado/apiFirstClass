/* *****************************************************
* Objetivo : Obter uma lista de estados
* Data: 29/08/2022
* Autor: Enzo D. Prado
* ******************************************************/

//Simulando o resultado de uma API
var estados = [
    {
        sigla : 'SP',
        nome  : 'Sao Paulo'
    },
    {
        sigla : 'AC',
        nome  : 'Acre',
    },
    {
        sigla : 'BA',
        nome  : 'Bahia',
    },
    {
        sigla : 'CE',
        nome  : 'Ceara',
    },
    {
        sigla : 'MG',
        nome  : 'Minas Gerais',
    },
    {
        sigla : 'GO',
        nome  : 'Goias',
    },
    {
        sigla : 'SC',
        nome  : 'Santa Catarina',
    }
];

//Retornando todos os estados pela sigla
const getListEstados = function(){
    let listaEstados = [];
    erro = true
    estados.forEach(itemSrch => {
        listaEstados.push(itemSrch.sigla);
        erro = false;
    });

    if(erro)
        return false;
    else
    //JSON.stringfy converte um array[] para um JSON{};ç
    return listaEstados;
}



//Retorna os dados de um estado tendo como base a sigla
const getEStado = function(siglaEstado = ''){
  let sigla  = siglaEstado.toUpperCase();
  let estado = {};  
  let erro = true;

  //Tratamento de sigla vazia e diferenca de caracteres
  if(sigla != ' ' && sigla.length == 2){
    estados.forEach(item => {
        //Localiza um item no array (IndexOf())
        if(item.sigla.indexOf(sigla) == 0){
    
            //Criamos as chaves gila e nome para enviar pelo JSON 
            estado.sigla = item.sigla;
            estado.nome = item.nome;
            erro = false;
        }
      })
    
      if(erro)
        return false
      else
        return estado;
  }else{
    return false;
  }
  
};

module.exports = {
    getListEstados,
    getEStado
}