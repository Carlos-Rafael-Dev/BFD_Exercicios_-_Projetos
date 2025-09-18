var dataAtual = new Date()
const opcoes = {year: "numeric", month: "long", day: "numeric"};
const dataFormatada = "Hoje, " + dataAtual.toLocaleDateString("pt-BR", opcoes);
document.getElementById("data-atual").textContent = dataFormatada;

function contadorPedencias (){
    const pedente = document.querySelectorAll('.item input[type="checkbox"]:not(:checked)').length;

    document.getElementById("contador").textContent = pedente;
}

function contadorPedenciasExclusao() {
    const pedente = document.querySelectorAll('.item input[type="checkbox"]:not(:checked)').length;
    document.getElementById("contador").textContent = pedente -1;
}

function addTarefa () {
    const tarefaInput = document.getElementById("caixaTexto");
    const texto = tarefaInput.value;
    
    const listaContainer = document.querySelector(".listaTarefas");

    const lista = document.createElement("li");
    lista.className ="item";

    const id = "task" + Date.now();

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = texto;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete";

    lista.append(checkbox, label, button);
    listaContainer.appendChild(lista);

    tarefaInput.value = "";

    button.addEventListener("click", () => {
        setTimeout(() => lista.remove(), 120);
        contadorPedenciasExclusao();
    })

    checkbox.addEventListener("change", contadorPedencias);

    contadorPedencias();
}

