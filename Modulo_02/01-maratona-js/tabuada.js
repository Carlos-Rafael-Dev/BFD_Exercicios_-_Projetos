const prompt = require("prompt-sync")();

let numero = Number(prompt("Digite um número: "));
let tabuada = 11

for (let i = 0; i < tabuada; i++){
    console.log(`${numero} x ${i} = ${numero*i}`);
}
