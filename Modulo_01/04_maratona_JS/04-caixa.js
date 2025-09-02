const prompt = require("prompt-sync")();

let valorSaque = parseFloat(prompt("valor de saque: "));
let notas = [100, 50, 20, 10]

if (valorSaque === notas) {
    console.log(valorSaque/notas);
}
