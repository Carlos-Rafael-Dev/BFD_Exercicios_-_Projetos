"use strict";

// ------- seleciona elementos no DOM --------
const img = document.getElementById("img");
const buttons = document.getElementById("buttons");

let colorIndex = 0;
let intervalId = null;

// lista de cores usada no ciclo automático
const colors = ["red", "yellow", "green"];

// ------ ações para cada botão -----
const turnOn = {
    off: () => {
        img.src = "./assets/desligado.png"; //muda imagem
        document.body.style.backgroundImage = "url('./assets/verde.gif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
      },
    red: () => {
        img.src = "./assets/vermelho.png"; //muda imagem
        document.body.style.backgroundImage = "url('./assets/traffic-stop.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
    },
    yellow: () => {
        img.src = "./assets/amarelo.png"; //muda imagem
        document.body.style.backgroundImage = "url('./assets/traffic-stop.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
    },
    green: () => {
        img.src = "./assets/verde.png"; //muda imagem
        document.body.style.backgroundImage = "url('./assets/verde.gif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
    },
    automatic: () => {
        if (intervalId !== null) return; // evita múltiplos intervalos
        intervalId = setInterval(changeColor, 1500); //muda cor a 1,5s
        updateActiveButton("automatic"); //marca botão automatico ativo
    }
};

// alterna índice de cor no array
const nextIndex = () => {
  colorIndex = (colorIndex + 1) % colors.length;
};

// muda para a próxima cor
const changeColor = () => {
  const color = colors[colorIndex]; //pega cor atual
  turnOn[color](); // aciona a função correspondente a cor
  updateActiveButton(color);
  nextIndex(); //passa para a próxima cor
};

// para modo automático
const stopAutomatic = () => {
  if (intervalId !== null) {
    clearInterval(intervalId); //interrompe o setinterval
    intervalId = null;
  }
  const autoBtn = buttons.querySelector("#automatic");
  if (autoBtn) autoBtn.classList.remove("active"); //desmarca botão automatico
};

// atualiza visual de botão ativo
const updateActiveButton = (id) => {
  buttons.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.id === id);
  });
};

// handler de clique nos botões
const trafficLight = (event) => {
  const btn = event.target.closest("button");
  if (!btn || !buttons.contains(btn)) return;

  const id = btn.id;
  if (!turnOn[id]) return;

  if (id === "automatic") {
    if (intervalId !== null) {
      stopAutomatic();
    } else {
      stopAutomatic();
      turnOn.automatic();
    }
    return;
  }

  stopAutomatic();
  turnOn[id]();
  updateActiveButton(id);
};

// associa listener
buttons.addEventListener("click", trafficLight);

// inicializa com desligado
turnOn.off();
updateActiveButton(""); //nenhum botão ativo