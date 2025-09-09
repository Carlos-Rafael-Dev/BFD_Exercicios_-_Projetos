const prompt = require("prompt-sync")();

let palavra = prompt("Digite uma palavra: ")
let reverso = ""

for (let i = 0; i < palavra.length; i++){
    reverso += palavra[i]
}

if (reverso === palavra){
    console.log("É polindromo");
} else {
    console.log("Não é polindromo");
}