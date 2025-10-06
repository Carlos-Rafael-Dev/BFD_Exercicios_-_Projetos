//-------------seletor de DOM-----------------------
const tabuleiro = document.querySelector(".play-board");
const elementoPontuacao = document.querySelector(".score");
const elementoRecorde = document.querySelector(".high-score");
const controles = document.querySelectorAll(".controls i"); //setas do controle

//-------------definição de variaveis-----------------
let jogoAcabou = false;
let comidaX, comidaY; //posição da comida
let cobraX = 5, cobraY = 5; //posição da cobra
let velocidadeX = 0, velocidadeY = 0; //vetor de movimento
let corpoCobra = []; //alimenta o corpo
let idIntervalo; //intervalo de tempo
let pontuacao = 0;
let direcaoAtual = "direita";

let recorde = localStorage.getItem("high-score") || 0; //guardar o recorde
elementoRecorde.innerText = `High score: ${recorde}`;

//----------------FUNÇÕES----------------------

// sortear comida
const atualizarPosicaoComida = () => {
 comidaX = Math.floor(Math.random() * 30) + 1;
 comidaY = Math.floor(Math.random() * 30) + 1;
}

// fim do jogo
const lidarComFimDeJogo = () => {
    clearInterval(idIntervalo);

    // pausa a música de fundo
    const musica = document.getElementById("musica-fundo");
    musica.pause();
  
    // toca som de game over
    const somGameover = document.getElementById("som-gameover");
    somGameover.currentTime = 0;
    somGameover.play();
  
    // aguarda o som terminar antes de recarregar
    setTimeout(() => {
      alert("Fim de jogo! Pressione OK para tentar novamente");
      location.reload();
    }, 2000); // 2 segundos para o som tocar antes do reload
  };

const mudarDirecao = event => {

    if(event.key === "ArrowUp" && velocidadeY !== 1){
        velocidadeX = 0;
        velocidadeY = -1;
        direcaoAtual = "cima";
    }
    else if (event.key === "ArrowDown" && velocidadeY !== -1){
        velocidadeX = 0;
        velocidadeY = 1;
        direcaoAtual = "baixo";
    }
    else if (event.key === "ArrowLeft" && velocidadeX !== 1){
        velocidadeX = -1
        velocidadeY = 0
        direcaoAtual = "esquerda";
    }
    else if (event.key === "ArrowRight" && velocidadeX !== -1){
        velocidadeX = 1;
        velocidadeY = 0;
        direcaoAtual = "direita";
    }
}

controles.forEach(botao => {
    botao.addEventListener("click", () => {
        mudarDirecao({key: botao.dataset.key});
    });  
});

const iniciarJogo = () => {
    if(jogoAcabou) return lidarComFimDeJogo();

    if(cobraX === comidaX && cobraY === comidaY){
        atualizarPosicaoComida();
        corpoCobra.push([comidaX, comidaY]);

        //tocar som ao comer comida
        const efeito = document.getElementById("efeito-comida");
        efeito.currentTime = 0; // garante que reinicia sempre
        efeito.play();
        
        pontuacao++
        recorde = pontuacao >= recorde ? pontuacao : recorde;
        localStorage.setItem("high-score", recorde);

        elementoPontuacao.innerText = `Score: ${pontuacao}`;
        elementoRecorde.innerText = `High score: ${recorde}`;
    }

    cobraX += velocidadeX;
    cobraY += velocidadeY;

    for(let i = corpoCobra.length - 1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];
    }
    corpoCobra[0] = [cobraX, cobraY];

    let html = `<div class="food" style="grid-area: ${comidaY} / ${comidaX}"></div>`;

    if(cobraX <= 0 || cobraX > 30 || cobraY <= 0 || cobraY > 30){
        return jogoAcabou = true;
    }

        for (let i = 0; i < corpoCobra.length; i++) {
            const segX = corpoCobra[i][0];
            const segY = corpoCobra[i][1];
            if (i === 0) {
              // Cabeça com rotação
              html += `<div class="head ${direcaoAtual}" style="grid-area: ${segY} / ${segX}"></div>`;
            } 
            else {
              html += `<div class="body-snake" style="grid-area: ${segY} / ${segX}"></div>`;
            }
            
            if (i !== 0 && cobraX === segX && cobraY === segY){
                jogoAcabou = true;
          }

        tabuleiro.innerHTML = html;
    }
}

atualizarPosicaoComida();
idIntervalo = setInterval(() => iniciarJogo(), 300);
document.addEventListener("keyup", mudarDirecao)

//------------------MUSICA -------------------------
const musica = document.getElementById("musica-fundo");
const botaoMusica = document.getElementById("toggle-music");

// Estado inicial
let musicaAtiva = false;

botaoMusica.addEventListener("click", () => {
  if (musicaAtiva) {
    musica.pause();
    botaoMusica.classList.add("off");
  } else {
    musica.play();
    botaoMusica.classList.remove("off");
  }
  musicaAtiva = !musicaAtiva;
});

// ======== Tela de carregamento ========
window.addEventListener("load", () => {
    const loader = document.getElementById("loading-screen");
    // Espera um pouco para garantir que tudo carregou e a animação de fadeOut rode
    setTimeout(() => loader.style.display = "none", 2200);
  });
  
