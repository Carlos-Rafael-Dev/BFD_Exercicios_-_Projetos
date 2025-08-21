//Exercicio 02
const prompt = require("prompt-sync")();

// Peça ao usuário para digitar dois números diferentes
let primeiroNumero = Number(prompt("Digite um número: "));
let segundoNumero = Number(prompt("Digite outro número: "));

//verifique qual dos dois números é o maior
if (primeiroNumero > segundoNumero) {
    console.log("O maior número é: " + primeiroNumero);
} else {
    console.log("O maior número é: " + segundoNumero);
}