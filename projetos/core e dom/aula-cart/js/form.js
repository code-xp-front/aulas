var dadosCliente = {
    endereco : {},
    contato : {}
};

function validarFormulario(){
    
    event.preventDefault();
    
    if(validarEndereco() && validarContato())
        console.log('validação está ok.. pode prosseguir');
    else 
        console.log('validação não passou.. preencher todos os campos');
}

function validarEndereco(){
   
    var retorno = false;
    //gerar objeto endereco baseado nos dados do formulario
    objEndereco = {
        pais        : document.getElementById('selection_country').value,
        cidade      : document.getElementById('selection_city').value,
        estado      : document.getElementById('state').value,
        endereco1   : document.getElementById('ad1').value,
        endereco2   : document.getElementById('ad2').value,
    };
    
    //verificar se os dados estão preenchidos
    if( objEndereco.pais.trim().lenght == 0 )
        retorno = true;
    
    //retorno da função
    return retorno;
}

function validarContato( _objContato ){

}

