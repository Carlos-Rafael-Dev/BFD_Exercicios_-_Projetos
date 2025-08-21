//Exercicio 05
const prompt = require("prompt-sync")();

//Peça ao usuário para digitar um valor de temperatura em Celsius.
let celsius = Number(prompt("Digite um valor de temperatura Celsius: "))

//converta essa temperatura para Fahrenheit usando a fórmula F=C∗1.8+32
let fahrenheit = (celsius*1.8)+32

//use uma condicional para classificar a temperatura
if (fahrenheit > 86) {
    console.log("Temperatura alta!"); //Se Fahrenheit for maior que 86
} else if (fahrenheit <= 86) {
    console.log("Temperatura agradável!"); //Se Fahrenheit for menor ou igual a 86
}