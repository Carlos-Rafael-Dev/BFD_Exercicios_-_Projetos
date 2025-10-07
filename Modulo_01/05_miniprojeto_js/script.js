// --- DATA ATUAL ---
var dataAtual = new Date();
const opcoes = { year: "numeric", month: "long", day: "numeric" };
const dataFormatada = "Hoje, " + dataAtual.toLocaleDateString("pt-BR", opcoes);
document.getElementById("data-atual").textContent = dataFormatada;


// --- CONTADOR DE PENDÊNCIAS ---
function contadorPendencias() {
    const pendente = document.querySelectorAll('.item input[type="checkbox"]:not(:checked)').length;
    document.getElementById("contador").textContent = pendente;
}


// --- SALVAR NO LOCALSTORAGE ---
function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll(".item").forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const label = item.querySelector("label");
        tarefas.push({
            texto: label.textContent,
            checked: checkbox.checked
        });
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// --- CARREGAR DO LOCALSTORAGE ---
function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefasSalvas.forEach(tarefa => {
        criarTarefa(tarefa.texto, tarefa.checked);
    });
    contadorPendencias();
}


// --- CRIAR TAREFA (FUNÇÃO BASE) ---
function criarTarefa(texto, checked = false) {
    const listaContainer = document.querySelector(".listaTarefas");

    const lista = document.createElement("li");
    lista.className = "item";

    const id = "task" + Date.now();

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.checked = checked;
    checkbox.addEventListener("click", () => {
        contadorPendencias();
        salvarTarefas();
    });

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = texto;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete";

    button.addEventListener("click", () => {
        lista.remove();
        contadorPendencias();
        salvarTarefas();
    });

    lista.append(checkbox, label, button);
    listaContainer.appendChild(lista);
}


// --- ADICIONAR NOVA TAREFA (USUÁRIO) ---
function addTarefa() {
    const tarefaInput = document.getElementById("caixaTexto");
    const texto = tarefaInput.value;
    const prioridade = document.getElementById("prioridade").value;

    if (texto === "") return;

    criarTarefa(`${texto} (${prioridade})`);
    tarefaInput.value = "";
    contadorPendencias();
    salvarTarefas();
}


// --- ENTER PARA ADICIONAR ---
const tarefaInput = document.getElementById("caixaTexto");
tarefaInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTarefa();
    }
});


// --- DARK MODE ---
const btn = document.getElementById("darkModeBtn");
const icon = document.getElementById("icon");

function darkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    icon.src = isDark ? "./assets/modo-escuro.png" : "./assets/modo.png";
    icon.alt = isDark ? "Ativar claro" : "Ativar escuro";

    // salva modo escuro no localStorage
    localStorage.setItem("darkMode", isDark);
}


// --- CARREGAR MODO ESCURO SALVO ---
window.addEventListener("load", () => {
    const isDark = JSON.parse(localStorage.getItem("darkMode"));
    if (isDark) {
        document.body.classList.add("dark-mode");
        icon.src = "./assets/modo-escuro.png";
    }
    carregarTarefas();
});
