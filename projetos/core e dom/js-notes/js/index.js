//inicia os listeners - ouvintes de eventos
document.getElementById('mais-item').addEventListener("click", adicionarItem);
document.getElementById('salvar-nota').addEventListener("click", cadastrarNotaSemDom);
document.getElementById('salvar-nota-dom').addEventListener("click", cadastrarNotaComDom);
document.getElementById('limpar-nota').addEventListener("click", limparCampos);
document.getElementById('pesquisar-icon').addEventListener("click", pesquisarNota);
document.getElementById('testerFuncion').addEventListener("click", teste);
// document.getElementById('pesquisar').addEventListener("keyup", pesquisarNota);

var id = 0;

/**
 * Adiciona um input para um novo 
 * ítem da nota a ser cadastrada
 */
function adicionarItem(){
	//CRIAÇÃO DO LABEL
	var div = document.createElement('div');

	var label = document.createElement("label");//label vazio
		label.setAttribute("for", novoId);//atributo for
	
	var novoId = "ITEM "+(id + 1);//gera um texto item
	var txtLabel = novoId.charAt(0).toUpperCase() + novoId.substring(1);//primeira letra maiúscula
	var textNode = document.createTextNode(txtLabel);//gera o nó de texto para o label

	label.appendChild(textNode);//insere o nó de texto no label

	//CRIAÇÃO DO INPUT
	var input = document.createElement("input");//gera um input vazio
		input.setAttribute("type", "text");//gera um atributo dentro do input
		input.setAttribute("id", "item"+id);//gera um atributo dentro do input
		input.setAttribute("class", "itens-lista");//gera um atributo dentro do input
		
		// input.setAttribute("onkeyup", "addBotaoExcluir(this)");//gera um atributo dentro do input
		
	var iconeExcluir = document.createElement('i')
		iconeExcluir.setAttribute('class', 'fa fa-minus-square-o fa-lg');
		iconeExcluir.setAttribute('aria-hidden', 'true');
		iconeExcluir.setAttribute('style', 'margin-left: 1%;');

		/*
		 * A função do ultimo elemento no HTML é ficar sempre como último,
		 * por isso utilizarei o insertBefore(elemento, ultimoElemento)
		 * ou melhor, inserir antes do ultimo elemento
		*/
		var ultimoElemento = document.getElementById('ultimo');
		div.appendChild(label);
		div.appendChild(input);
		div.appendChild(iconeExcluir);

		var br = document.createElement('br');//clear booth
			br.setAttribute('class', 'clear');
		
		div.appendChild(br);
		

		// document.getElementById("div-new").insertBefore(label, ultimoElemento);
		// document.getElementById("div-new").insertBefore(input, ultimoElemento);
		
		document.getElementById("div-new").insertBefore(div, ultimoElemento);

		input.focus();

		//libera o contador de ids e...
		id++; //...aqui sim, incrementa o id para o próximo elemento
}


// function addBotaoExcluir(input){
	
// 	if( input.value.length == 0 ){
// 		alert('REMOVER btn excluir');
// 	} else {
// 		//alert('ADICIONAR btn excluir');
// 	}
	
// }

function validaLista(titulo, arrItens){

	if(titulo.trim().length == 0 || arrItens.length == 0 ) {
		return false;
	} else {
		for (var i = 0; i < arrItens.length; i++) {
			if( arrItens[i].value.trim().length == 0 ) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Cadastra uma nova lista de afazeres
 */
function cadastrarNotaComDom(){

	var titulo 		= document.getElementById('titulo').value;
	var arrItens 	= document.querySelectorAll("#div-new input");
	
	if ( validaLista(titulo, arrItens) ) {
		var nota 	= document.createElement("article");
			nota.setAttribute('class', 'nota');

		var txtH4 	= document.createTextNode(titulo);
		var h4 		= document.createElement("h4");
			h4.appendChild(txtH4);

		var ul 		= document.createElement('ul');
		var li;//undefined
		var txtLi;//undefined

		//cirando todos os ítens
		for ( var i = 0; i < arrItens.length; i++ ) {
			li 		= document.createElement('li');//cria LI vazia
			txtLi 	= document.createTextNode(arrItens[i].value);//cria um texto para inserir na LI
			li.appendChild(txtLi);//insere o texto na LI
			
			//insere o li na ul
			ul.appendChild(li);
		}

		//RODAPÉ DA NOTA - ÍCONES -- CRIAR, SETAR E APPENDAR!!
		var p = document.createElement("p");
			p.setAttribute('class', 'acoes');
		
		//MAÇÃ - <a href="#"><i class="fa fa-apple fa-wf" aria-hidden="true"></i></a>
		var a = document.createElement('a');
			a.setAttribute('href', '#');
		var i = document.createElement("i");
				i.setAttribute('class', 'fa fa-apple fa-wf');
				i.setAttribute('aria-hidden', 'true');
		
		a.appendChild(i);
		p.appendChild(a);

		//ANDROID - <a href="#"><i class="fa fa-android fa-wf" aria-hidden="true"></i></a>
		var a = document.createElement('a');
			a.setAttribute('href', '#');
		
		var i = document.createElement("i");
			i.setAttribute('class', 'fa fa-android fa-wf');
			i.setAttribute('aria-hidden', 'true');
		
		a.appendChild(i);
		p.appendChild(a);

		//CHROME - <a href="#"><i class="fa fa-chrome fa-wf" aria-hidden="true"></i></a>
		var a = document.createElement('a');
			a.setAttribute('href', '#');
		
		var i = document.createElement("i");
			i.setAttribute('class', 'fa fa-chrome fa-wf');
			i.setAttribute('aria-hidden', 'true');
		
		a.appendChild(i);
		p.appendChild(a);

		//CLOSE - <a href="#"><i class="fa fa-close fa-wf" aria-hidden="true"></i></a>
		var a = document.createElement('a');
				a.setAttribute('href', '#');
		var i = document.createElement("i");
			i.setAttribute('class', 'fa fa-close fa-wf');
			i.setAttribute('aria-hidden', 'true');
			i.setAttribute('onclick', 'removeNota(this)');
		
		a.appendChild(i);
		p.appendChild(a);

		//compondo a nota
		nota.appendChild(h4);
		nota.appendChild(ul);
		nota.appendChild(p);
		
		//inserindo a nota no documento
		document.getElementById('section-notas').appendChild(nota);

		//reseta o formulário de cadastro
		limparCampos();
		excluiTodosOsItens();

		resetarId();


	} else {//caso todos os ítens não estejam preenchidos
		alert('É necessário preencher o título e todos os ítens');
	}


}

/**
 * Reseta o id, inicialmente utilizado após 
 * o cadastri da nota
 */
function resetarId() {
	id = 0;
}
/**
 * Limpa o campo de título e todos os inputs de ítens 
 * ítem da nota a ser cadastrada
 */
function limparCampos(){
	document.getElementById('titulo').value = '';
	var arrItens = document.querySelectorAll('#div-new input');

	for( var i = 0; i < arrItens.length; i++ ){
		arrItens[i].value = '';	
	}
}

/**
 * Exclui todos os ítens da mesma nota
 * Funcionalidade criada inicialmente para remover
 * após o cadastro da nota
 */
function excluiTodosOsItens(){
	var arrItens = document.querySelectorAll('#div-new input');
	
	arrItens.forEach( function(e, i) {
		document.getElementById('div-new').removeChild(e.parentNode)
	});
}

/**
 * Confirma se o usuário quer realmente excluir uma nota
 */
function removeNota(i){
	if( confirm("Deseja realmente remover a nota?") ) {
		var article = i.parentNode.parentNode.parentNode;//pega o article
		//remove o article específico filho de section
		document.getElementById('section-notas').removeChild(article);	
	} /*else { 
			alert('Ok, nao vou remover!!');
	}*/
	
}

/**
 * Pesquisar Nota
 */
function pesquisarNota(){
	
	alert('desenvolvendo');
	// var textoPesquisa = document.getElementById('pesquisar').value;

	// if (textoPesquisa.length > 0) {
	// 	esconderNotas();
	// 	mostrarNotas(textoPesquisa);
	// } else {
	// 	mostrarTodasNotas();
	// }
		
}

function mostrarTodasNotas(){
	var notas 		= document.getElementsByTagName('article');
	
	for(var i = 0; i < notas.length; i++){
		
		notas[i].classList.remove('esconder');
	}	
}

function mostrarNotas( _t ){
	console.log('sss ' +_t);
	_t 	= _t.toLowerCase();
	var notas 		= document.getElementsByTagName('article');
	
	for(var i = 0; i < notas.length; i++){
		var nota = notas[i];
		var tituloNota 	= nota.childNodes[1].textContent.toLowerCase();

		if( tituloNota.search(_t) >= 0){
			// console.log(tituloNota.search(tProcurado));
			nota.classList.remove('esconder');
		}
	}		
}

function esconderNotas( ){
	var notas = document.getElementsByTagName('article');
	for(var i = 0; i < notas.length; i++){
		notas[i].classList.add('esconder');
	}
}


/**
 * Cadastra uma nova lista de afazeres
 */
function cadastrarNotaSemDom(){
	var titulo 	 = document.getElementById('titulo').value;
	var arrItens = document.querySelectorAll("#div-new input");

	var nota  = "";
		nota += '<article class="nota">';
		nota += 	'<h4>'+titulo+'</h4>';//titulo
		nota += 	'<ul>';
		
		for (var i = 0; i < arrItens.length; i++) {
			nota += '<li>'+arrItens[i].value+'</li>';
		}

		nota += 	'</ul>';

		nota += 	'<p class="acoes">';
		nota += 		'<a href="#"><i class="fa fa-apple fa-wf" aria-hidden="true"></i></a>';
		nota += 		'<a href="#"><i class="fa fa-android fa-wf" aria-hidden="true"></i></a>';
		nota += 		'<a href="#"><i class="fa fa-chrome fa-wf" aria-hidden="true"></i></a>';
		nota += 		'<a href="#"><i class="fa fa-close fa-wf" aria-hidden="true" onclick="removeNota(this)"></i></a>';
		nota += 	'</p>';

		nota += '</article>';

	document.getElementById('section-notas').innerHTML += nota;
}



function teste(){
	
	console.log('função teste ok');
}