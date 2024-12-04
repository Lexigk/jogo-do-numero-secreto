let listaDeNumerosSorteados = []; // cria lista de numeros vazia para adicionar 
let numeroLimite = 100; //define o número máximo
let numeroSecreto = gerarNumeroAleatorio(); //define o número secreto
let tentativas = 1; //define o número de tentativas iniciais

function exibirTextoNaTela(tag, texto){   //alterar texto no HTML, tag é o local e texto é oq quer ser escrito
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} ); // responsiveVoice lê a pagina - fiz funcionar conseguindo uma chave no site e colocando no HTML
}

function exibirMensagemInicial(){  //uso da função anterior de juntar o JS com o HTML para exibir o texto
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    let instrcaoJogo = `Escolha um número entre 1 e ${numeroLimite}`;
    exibirTextoNaTela('p', instrcaoJogo);
}
exibirMensagemInicial();  //chama a função para exibir a mensagem

 function verificarChute() {  //'verificarChute' está no HTML para identificar o botão
    let chute = document.querySelector('input').value; // 'input' é a caixa de texto em branco a ser digitada, 'value' é o valor
    
    if(chute == numeroSecreto){
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';// ajuste de plural e singular
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p', mensagemTentativas);//HTML não aceita mt bem diretamente dentro do parametro, gerado variável para alocar no lugar
        document.getElementById('reiniciar').removeAttribute('disabled');//remove o atribto de desabilitado do botão, reiniciar é o 'id' do botao no HTML
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número é menor.');
        } else {
            exibirTextoNaTela('p', 'O número é maior.');
        }
        tentativas++; //adiciona tentativas a contagem
        limparCampo() //função para limpar o campo escrito
    }
    
}
 
function gerarNumeroAleatorio() {  //gera numero aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // gera variavel para a quantidade de elementos na lista

    if (quantidadeDeElementosNaLista == numeroLimite){// limpa a lista assim q chegar ao valor máximo de números
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){// icludes - verifica se o numero sorteado ja está na lista 
        return gerarNumeroAleatorio();// gera um novo numero
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);// push adiciona o novo número ao final da lista 
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {  //função para limpar o campo escrito
    chute = document.querySelector('input');
    chute.value = '';
}

 function reiniciarJogo() { //habilita o botão de reiniciar o jogo e em sequências as funções que precisam ser executadas
    numeroSecreto = gerarNumeroAleatorio(); //gera novo número aleatório
    limparCampo(); //limpa o campo escrito
    tentativas = 1; //reseta o numero de tentativas
    exibirMensagemInicial(); //reseta a mensagem inicial do jogo
    document.getElementById('reiniciar').setAttribute('disabled', true); //desabilita novamete o botão novo jogo
}
