const prompt = require("prompt-sync")();

let valorCompra = parseFloat(prompt("Digite o valor da compra: "));
if (valorCompra < 100) {
    console.log("Valor final da compra foi " + valorCompra);
} else if (valorCompra < 200) {
    console.log("Valor final da compra foi " + valorCompra*0.9);
} else {
    console.log("Valor final da compra foi " + valorCompra*0.8);
}