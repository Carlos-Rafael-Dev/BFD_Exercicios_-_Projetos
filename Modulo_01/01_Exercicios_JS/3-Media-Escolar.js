//Exercicio 03
const prompt = require("prompt-sync")();

//Peça ao usuário para digitar três notas (por exemplo, de 0 a 10)
let n1, n2, n3, media;
n1 = Number(prompt("Digite uma nota (0 a 10): "))
n2 = Number(prompt("Digite uma nota (0 a 10): "))
n3 = Number(prompt("Digite uma nota (0 a 10): "))
media = (n1 + n2 + n3)/3 //a média dessas notas

//determine se o aluno está aprovado, em recuperação ou reprovado.
if (media >= 7) {
    console.log("Aprovado"); //Aprovado: Média maior ou igual a 7.
} else if (media >= 5) {
    console.log("Recuperação"); //Recuperação: Média maior ou igual a 5 e menor que 7.
} else if (media < 5) {
    console.log("Reprovado"); //Reprovado: Média menor que 5.
}