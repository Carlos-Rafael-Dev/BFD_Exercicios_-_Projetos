//Exercicio 01
const prompt = require("prompt-sync")();

//Peça ao usuário para digitar a sua idade
let idade = Number(prompt("Digite sua idade: "))
//Definição de maioridade de 18 anos
const maioridade = 18
//exiba uma mensagem no console: se o usuario é permitido ou não tirar CNH
if (idade >= maioridade) {
    console.log("Você já pode tirar a sua CNH!"); 
} else {
    console.log("Você ainda não tem idade para tirar a CNH.");
}