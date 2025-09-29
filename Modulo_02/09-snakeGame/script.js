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
    alert("Fim de jogo! Pressione OK para tentar novamente");
    location.reload();
}

const mudarDirecao = event => {

    if(event.key === "ArrowUp" && velocidadeY !== 1){
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (event.key === "ArrowDown" && velocidadeY !== -1){
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (event.key === "ArrowLeft" && velocidadeX !== 1){
        velocidadeX = -1
        velocidadeY = 0
    }
    else if (event.key === "ArrowRight" && velocidadeX !== -1){
        velocidadeX = 1;
        velocidadeY = 0;
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

    for(let i = 0; i < corpoCobra.length; i++) {
        const segmentoX = corpoCobra[i][0];
        const segmentoY = corpoCobra[i][1];

        const classeSegmento = i === 0 ? "head" : "head";
        html += `<div class="${classeSegmento}" style="grid-area: ${segmentoY} / ${segmentoX}"></div>`;
        
        if (i !== 0 && cobraX === segmentoX && cobraY === segmentoY){
            jogoAcabou = true;
        }

        tabuleiro.innerHTML = html;
    }
}

atualizarPosicaoComida();
idIntervalo = setInterval(() => iniciarJogo(), 300);
document.addEventListener("keyup", mudarDirecao)
