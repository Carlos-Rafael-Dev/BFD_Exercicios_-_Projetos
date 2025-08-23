const prompt = require("prompt-sync")();
//ler valores de a, b e c
let a = parseFloat(prompt("Digite valor de a: "))
let b = parseFloat(prompt("Digite valor de b: "))
let c = parseFloat(prompt("Digite valor de c: "))
//condicional para somar a+b e comparar c
if (a + b > c) {
    console.log("A soma a + b é " + (a + b) + " logo é maior que " + c)
} else if (a + b == c){
    console.log("A soma a + b é " + (a + b) + " logo é igual a " + c)
} else {
    console.log("A soma a + b é " + (a + b) + " logo é menor que " + c)
}
