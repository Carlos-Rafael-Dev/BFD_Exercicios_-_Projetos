const prompt = require("prompt-sync")();

let palavra = prompt("Digite uma palavra: ")
let reverso = ""

for (let i = palavra.length - 1; i >= 0; i--) {
    reverso += palavra[i];
}
console.log(reverso)