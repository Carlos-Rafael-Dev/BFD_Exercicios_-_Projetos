const prompt = require("prompt-sync")();
let palavras = [ "tecnologia", "javascript", "python", "html", "index" ];
//programa escolhe aleatoriamente a palavra
const indiceAleatorio = Math.floor(Math.random() * palavras.length);
const palavraAleatoria = palavras[indiceAleatorio];

let underline = "_".repeat(palavraAleatoria.length);
console.log(underline);

let letraUsuario = prompt("Digite uma letra: ").toLowerCase();
let chance = 5

let progresso = "";
let acerto = true

// percorre a palavra
for (let i = 0; i < palavraAleatoria.length; i++) {

    let letra = palavraAleatoria[i].toLowerCase();

    if (letraUsuario === letra) {
        progresso += letra; // mostra a letra certa
    } else {
        i += underline[i]   // mostra "_" no lugar da letra não revelada
    }
}


