"use strict"

// Definição de variaveis
const lampada = document.getElementById("lampada")
const ligar = document.getElementById("ligar")
const desligar = document.getElementById("desligar")
const piscar = document.getElementById("piscar")

// Variável para armazenar o intervalo
let idInterval

// ----------- Funções -----------

// Esta função verifica se a lâmpada está quebrada.
function isLampadaQuebrada() {
    return lampada.src.includes("quebrada")
}

// Esta função liga a lâmpada.
function ligarLampada() {
    if (!isLampadaQuebrada()) {
        lampada.src = "ligada.jpg" //muda imagem
        document.body.style.backgroundColor = "yellow" //muda a cor do fundo
    }
}

// Esta função desliga a lâmpada.
function desligarLampada() {
    if (!isLampadaQuebrada()) {
        lampada.src = "desligada.jpg" //muda imagem
        document.body.style.backgroundColor = "black" //muda a cor do fundo
    }
}

// Esta função quebra a lâmpada.
function quebrarLampada() {
    lampada.src = "quebrada.jpg" //muda imagem
    pararPiscar()
    document.body.style.backgroundColor = "gray" //muda a cor do fundo
}

//função usada para 'piscarLampada'.
function trocarImagem() {
    if (lampada.src.includes("desligada")) {
        ligarLampada()
    } else {
        desligarLampada() 
    }
}

// Esta função inicia o pisca-pisca.
function piscarLampada() {
    idInterval = setInterval(trocarImagem, 600) //definir intervalo e chama função trocarImagem
    piscar.textContent = "Parar" //muda o texto do botão piscar
}

// Esta função para o pisca-pisca.
function pararPiscar() {
    // limpar intervalo
    clearInterval(idInterval)
    piscar.textContent = "Piscar" //muda texto do botão
}

// ----------- Eventos -----------

ligar.addEventListener("click", ligarLampada) //evento no botão ligar

desligar.addEventListener("click", desligarLampada) //evento no botão desligar

piscar.addEventListener("click", () => {
    //condição para ligar ou desligar o pisca-pisca ao clicar
    if (piscar.textContent === "Piscar") {
        piscarLampada()
    } else {
        pararPiscar()
    }
})

//quando o mouse passar sobre a imagem
lampada.addEventListener("mouseover", ligarLampada)

//quando o mouse não passar sobre a imagem
lampada.addEventListener("mouseout", desligarLampada)

//clique duplo quebra a lampada
lampada.addEventListener("dblclick", quebrarLampada)