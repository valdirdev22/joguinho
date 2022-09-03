// Imagens das cartas
 
const imagens = ['./IMAGENS/Beija_Flor.jpg', './IMAGENS/Catatau.jpg', 
'./IMAGENS/coelho.jpg', './IMAGENS/Marsh.jpg', './IMAGENS/Padrinho_Madrinha.jpg', 
'./IMAGENS/rosa.jpg'];
 
for (let i = 1; i <= 8; i++) imagens.push(`../JOGO_MEMORIA_JOSE/id/${i}/100`);
 
let fundo = `./IMAGENS/Capa_Santa_Catarina.jpg`;
 
 
// Estrutura do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer('#matematica');
 
onload = () => {
   
    // Carregar imagens de fundo
     let elemImagens = document.querySelectorAll(`#memoria img`);
     elemImagens.forEach((img, i) => {
         img.src = fundo;
         img.setAttribute('data-valor', i);
         img.style.opacity = 0.8;
     });
     
    // Cria o evento do botão iniciar
    document.querySelector('#btInicio').onclick = inicioJogo;
    document.body.style.backgroundImage = "url('./IMAGENS/Back_catarina_1.jpg')";
};
 
// *****************************************************************
// INICIO DO JOGO
//******************************************************************
 
const inicioJogo = () => {
    // Embaralhar as cartas
     
    for (let i = 0; i < cartas.length; i++) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }
 
    // Associar eventos às imagens
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) => {
        img.onclick = trataCliqueImagem;
        img.style.opacity = 1;
        img.src = fundo;
 
    });
  // Reinicia o estado do jogos
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
 
    pontos = 0;
       
    // Ajuste a interface
    document.querySelector('#btInicio').disabled = true;
    document.querySelector('#btInicio').style.backgroundColor = '#FE2EC8';
    document.querySelector('#matematica').style.backgroundColor = '#FE2EC8';  
    document.body.style.backgroundImage = "url('./IMAGENS/Back_catarina_2.jpg')";
    document.querySelector('.titulo').disabled = false;
    timerDoJogo.start();  
     
};
 
//**********************************************
// Processa o clique na imagem
//**********************************************
 
const trataCliqueImagem = (e) => {
  if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;
 
if(!temCartaVirada) {
    temCartaVirada = true;
    posicaoCartaVirada = p;
    valorCartaVirada = valor;
} else {
    if(valor == valorCartaVirada) {
    pontos++;
} else {
     
    const p0 = posicaoCartaVirada;
    cliquesTravados = true;
 
    setTimeout(() => {
        e.target.src = fundo;
        e.target.onclick = trataCliqueImagem;
        console.log(p0)
       let img = document.querySelector('#memoria #i' + p0);
       img.src = fundo;
       img.onclick = trataCliqueImagem;
       cliquesTravados = false;
    }, 1500);
 
}
 
temCartaVirada = false;
 posicaoCartaVirada = -1;
 valorCartaVirada = 0;
 }
 
   
 if(pontos == 6) {
    document.querySelector('#btInicio').disabled = false;
    document.querySelector('#btInicio').style.color = '#000';
    document.querySelector('#btInicio').style.backgroundColor = '#FF0000';
    document.querySelector('.titulo').textContent ='Parabéns Catarina!';
    document.querySelector('.titulo').style.backgroundColor ='#FF0000';  
    document.querySelector('#matematica').style.backgroundColor = '#FF0000';   
    document.body.style.backgroundImage = "url('./IMAGENS/Back_catarina_3.jpg')";
    timerDoJogo.stop(); 
}     

};

 
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// TIMER
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
 
// const tempo = new Timer('#timer');
 
function  Timer (e) {
    this.element = e;
    this.time = 0;
    this.control = null;
    this.start = () =>{
        this.time = 0;  
    this.control = setInterval(() =>{
        this.time++;
        const minutes = Math.trunc(this.time / 60);
        const seconds = this.time % 60;
        document.querySelector(this.element).innerHTML =
        (minutes < 10 ? '0' : ' ') + minutes + ':' + (seconds < 10 ? '0' : ' ') + seconds;
    }, 1000);
 
};
   
this.stop = ()  => {
    clearInterval(this.control);
    this.control = null;
};
 
}
 
