const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const textoCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("id-capitulo");
const qtdCapitulo = 10;

let tocando = false;
let capituloAtual = 1;

function tocarFaixa () {
    tocando = true;
    audio.play();
    botaoPlayPause.classList.add("tocando");
}

function pausarFaixa () {
    console.log("clicou");
    tocando = false;
    audio.pause();
    botaoPlayPause.classList.remove("tocando");
}

function tocarOuPausar () {
    if (tocando === true) {
        pausarFaixa();
    } else {
        tocarFaixa();
    }   
}

function proximoCapitulo () {
    pausarFaixa();

    if (capituloAtual < qtdCapitulo) {
        capituloAtual = capituloAtual + 1;
    } else {
        capituloAtual = 1;
    }

    audio.src = `./audios/${capituloAtual}.mp3`;
    textoCapitulo.innerHTML = `Capitulo ${capituloAtual}`;
}

function capituloAnterior () {
    pausarFaixa();

    if (capituloAnterior === 1) {
        capituloAtual = qtdCapitulo;
    } else {
        capituloAtual = capituloAtual - 1;
    }

    audio.src = `./audios/${capituloAtual}.mp3`;
    textoCapitulo.innerHTML = `Capitulo ${capituloAtual}`;
}

botaoPlayPause.addEventListener("click", tocarOuPausar)
botaoProximoCapitulo.addEventListener("click", proximoCapitulo)
botaoCapituloAnterior.addEventListener("click", capituloAnterior)
