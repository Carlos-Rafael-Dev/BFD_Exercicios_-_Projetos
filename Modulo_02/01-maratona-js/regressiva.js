const prompt = require("prompt-sync")();

let numero = Number(prompt("Digite um numero: "));

for (let i = numero; i >= 0; i--) {
    console.log(i);
}