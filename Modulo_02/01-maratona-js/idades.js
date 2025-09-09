const prompt = require("prompt-sync")();
var idade = [];

for (let i = 1; i < 6; i++){
    idade.push(Number(prompt("Digite a idade " + i + ": ")));
}

const soma = idade.reduce((acc, curr) => acc + curr, 0 );
const media = soma / 5

console.log(media)