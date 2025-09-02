const prompt = require("prompt-sync")();

let temperatura = parseFloat(prompt("Digite a temperatura: "));
let escala = prompt("Escolha entre Celsius ou Fahnreinheir: (c/f) ").toLowerCase();
const celsiusFahreinheit = ((temperatura*1.8)+32).toFixed(2) 
const fahnreinheitCelsius = ((temperatura-32)/1.8).toFixed(2)

if (escala === "c") {
    console.log(celsiusFahreinheit + "º F")
} else if (escala === "f") {
    console.log(fahnreinheitCelsius + "º C")
} else {
    console.log("Digite 'c' ou 'f'")
}