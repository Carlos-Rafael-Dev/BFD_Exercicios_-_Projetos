"use strict"

// Mapeamento dos elementos HTML para variáveis JavaScript
// Usamos "const" para variáveis que não terão seu valor alterado, como os elementos da página.
const lampada = document.getElementById("lampada")
const ligar = document.getElementById("ligar")
const desligar = document.getElementById("desligar")
const piscar = document.getElementById("piscar")

// Variável para armazenar o ID do setInterval, que é o temporizador que faz a lâmpada piscar.
// Usamos "let" porque esse valor pode mudar.
let idInterval

// --- Funções de Lógica e Ação ---

// Esta função verifica se a lâmpada está quebrada.
// É uma "função de validação" que retorna true ou false.
function isLampadaQuebrada() {
    // O método 'includes()' verifica se uma string existe em outra.
    // Se o caminho da imagem da lâmpada contém a palavra "quebrada", retorna true.
    return lampada.src.includes("quebrada")
}

// Esta função liga a lâmpada.
function ligarLampada() {
    // '!' significa "NÃO". Ou seja: "Se a lâmpada NÃO está quebrada..."
    if (!isLampadaQuebrada()) {
        // ...muda a imagem para a lâmpada ligada.
        lampada.src = "ligada.jpg"
    }
}

// Esta função desliga a lâmpada.
function desligarLampada() {
    if (!isLampadaQuebrada()) {
        // Se a lâmpada não está quebrada, muda a imagem para a lâmpada desligada.
        lampada.src = "desligada.jpg"
    }
}

// Esta função quebra a lâmpada.
function quebrarLampada() {
    // Muda a imagem para a lâmpada quebrada.
    lampada.src = "quebrada.jpg"
    // Quando a lâmpada quebra, a função 'pararPiscar' é chamada para garantir que o pisca-pisca pare.
    pararPiscar()
}

// Esta função alterna a imagem entre ligada e desligada.
// É usada na função 'piscarLampada'.
function trocarImagem() {
    // Se o caminho da imagem inclui "desligada", a lâmpada está desligada.
    if (lampada.src.includes("desligada")) {
        ligarLampada() // Chama a função para ligar.
    } else {
        desligarLampada() // Caso contrário, chama a função para desligar.
    }
}

// Esta função inicia o pisca-pisca.
function piscarLampada() {
    // 'idInterval' recebe o ID do temporizador.
    // 'setInterval' chama a função 'trocarImagem' a cada 1000 milissegundos (1 segundo).
    idInterval = setInterval(trocarImagem, 1000)
    // O texto do botão Piscar muda para "Parar".
    piscar.textContent = "Parar"
}

// Esta função para o pisca-pisca.
function pararPiscar() {
    // 'clearInterval' usa o ID do temporizador para pará-lo.
    clearInterval(idInterval)
    // O texto do botão Piscar volta a ser "Piscar".
    piscar.textContent = "Piscar"
}

// --- Event Listeners (Ações dos Botões e do Mouse) ---

// 'addEventListener' associa uma ação a um evento (como um clique ou um movimento do mouse).

// Quando o botão 'ligar' é clicado, a função 'ligarLampada' é executada.
ligar.addEventListener("click", ligarLampada)

// Quando o botão 'desligar' é clicado, a função 'desligarLampada' é executada.
desligar.addEventListener("click", desligarLampada)

// Quando o botão 'piscar' é clicado, a função 'piscarLampada' é executada.
// Observação: Para a função piscar, é interessante usar um botão "inteligente" que alterna entre "Piscar" e "Parar".
// Para isso, vamos mudar o 'EventListener' do piscar para:
piscar.addEventListener("click", () => {
    // A 'arrow function' permite ter uma pequena lógica aqui.
    if (piscar.textContent === "Piscar") {
        piscarLampada()
    } else {
        pararPiscar()
    }
})

// Quando o mouse passa sobre a imagem da lâmpada, a função 'ligarLampada' é executada.
lampada.addEventListener("mouseover", ligarLampada)

// Quando o mouse sai da imagem, a função 'desligarLampada' é executada.
lampada.addEventListener("mouseout", desligarLampada)

// Quando o usuário dá um clique duplo na imagem, a função 'quebrarLampada' é executada.
lampada.addEventListener("dblclick", quebrarLampada)