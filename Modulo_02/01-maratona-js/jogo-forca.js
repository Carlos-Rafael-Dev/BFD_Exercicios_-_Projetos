const prompt = require("prompt-sync")();

//definir lista com palavras
let palavras = [ "tecnologia", "javascript", "python", "html", "index" ];
let underline = "";


//programa escolhe aleatoriamente a palavra
const indiceAleatorio = Math.floor(Math.random() * palavras.length);
const palavraAleatoria = palavras[indiceAleatorio];

//transformar quantidade de letras em "_" 
for (let i = 0; i < palavraAleatoria.length; i++){
    underline += "_";
}

console.log(underline)

    //usuario digita uma letra
    let letraUsuario = prompt("Digite uma letra: ").toLowerCase()
    var resultado = ""
    //se estiver certo a letra é colocada
    //se não o usuario perde uma chance (5 vezes)
    for (let i = 0; i < palavraAleatoria.length; i++){
        let letra = palavraAleatoria[i].toLowerCase();
        
        if (letraUsuario === letra){
            resultado += letra;
        } else {
            resultado += "_";
        }
    }
    //jogo termina quando palavra é acertada ou perde