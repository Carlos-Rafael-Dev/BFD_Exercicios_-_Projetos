let numeros = [91, 55, 23, 96, 4]
let maior = numeros[0] //define o maior numero como o primeiro
let menor = numeros[0]

for (let i = 0; i < numeros.length; i++){
    if (numeros[i] > maior){
        maior = numeros[i];
    } 
    if (numeros[i] < menor){
        menor = numeros[i];
    } 
}

console.log("Maior número é: ", maior)
console.log("Menor número é: ", menor)