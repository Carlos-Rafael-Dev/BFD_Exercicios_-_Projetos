function imc (peso, altura) {
    let resultado = peso / (altura*altura);
    return resultado;
}

let calculo = imc (73, 1.7);

if (calculo < 18.5) {
    console.log("Abaixo do peso");
} else if (calculo >= 18.5 || calculo <= 24.9){
    console.log("Peso normal");
} else if (calculo >= 25 || calculo <= 29.9) {
    console.log ("Sobrepeso");
} else if (calculo >= 30) {
    console.log("Obesidade");
}
