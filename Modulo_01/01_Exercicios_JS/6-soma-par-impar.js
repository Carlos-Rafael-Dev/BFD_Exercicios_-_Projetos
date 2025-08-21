const prompt = require("prompt-sync")();

//peça para o usuário um número qualquer
let numero = Number(prompt("Digite um valor: "));
//condição para descobrir se é par ou impar
if (numero % 2 == 0) { 
    console.log(numero + 5); //se for par soma +5
} else {
    console.log(numero + 8); //ser impar soma +8
}