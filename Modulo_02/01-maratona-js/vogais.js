const prompt = require("prompt-sync")();

let palavra = prompt("Digite uma palavra: ")
let vogais = "aeiou"
let contador = 0

for (let i = 0; i < palavra.length; i++){
    let letra = palavra[i].toLowerCase();
    if (vogais.includes(letra)){
        contador++;
    }
}

console.log(contador)
