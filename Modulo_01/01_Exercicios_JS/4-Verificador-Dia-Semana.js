//Exercicio 04
const prompt = require("prompt-sync")();

//Peça ao usuário para digitar um número de 1 a 7
let numero = Number(prompt("Digite um número de 1 a 7: "));

//Com base no número, exiba o nome do dia da semana correspondente
switch (numero) {
    case 1:
        console.log("Domingo");
        break;
    case 2:
        console.log("Segunda-feira");
        break;
    case 3:
        console.log("Terça-feira");
        break;
    case 4:
        console.log("Quarta-feira");
        break;
    case 5:
        console.log("Quinta-feira");
        break;
    case 6:
        console.log("Sexta-feira");
        break;
    case 7:
        console.log("Sábado");
        break;

    default: //informa ao usuário que a opção é inválida
        console.log("Número inválido!");
}
