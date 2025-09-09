const prompt = require("prompt-sync")();

let numero = Number(prompt("Digite um número: "));

for (let i = 0; i < 1; i++){
    if (numero % 2 === 1){
        console.log(numero + " é primo");
    }
}