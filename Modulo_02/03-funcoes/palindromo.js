function palindromo (palavra) {
    let reverso = ""

    for (let i = palavra.length - 1; i >= 0; i--) {
        reverso += palavra[i];
    }

    return reverso;
}

let palavra = "arara";
let palavraInvertida = palindromo(palavra);

if (palavraInvertida === palavra) {
    console.log(`A palavra ${palavra} é palindromo`);
} else {
    console.log(`A palavra ${palavra} não é palindromo`);
}