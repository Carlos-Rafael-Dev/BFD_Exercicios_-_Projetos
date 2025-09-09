const prompt = require("prompt-sync")();

let numero = Number(prompt("Digite um numero: "));
let fatorial = []

for (var i = numero; i >= 1; i--){
    fatorial.push(i)
}

const resultado = fatorial.reduce((acc, curr) => acc * curr, 1);

console.log(resultado)