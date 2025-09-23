var dataAtual = new Date()
const opcoes = {year: "numeric", month: "long", day: "numeric"};
const dataFormatada = "Hoje, " + dataAtual.toLocaleDateString("pt-BR", opcoes);
document.getElementById("data-atual").textContent = dataFormatada;

function contadorPedencias () {
    const pedente = document.querySelectorAll('.item input[type="checkbox"]:not(:checked)').length;

    document.getElementById("contador").textContent = pedente;
}

function addTarefa () {
    
    const tarefaInput = document.getElementById("caixaTexto");
    const texto = tarefaInput.value;
    
    if (texto === "") {
        return;
    } else {
        const listaContainer = document.querySelector(".listaTarefas");

        const lista = document.createElement("li");
        lista.className ="item";

        const id = "task" + Date.now();

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.addEventListener("click", contadorPedencias);

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
            setTimeout(() => {
                lista.remove(); 
                contadorPedencias();
            }, 120);
        });

        contadorPedencias();
    }
}

// Habilitar ENTER para adicionar tarefa
const tarefaInput = document.getElementById("caixaTexto");
tarefaInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTarefa();
    }
});

const btn = document.getElementById("darkModeBtn");
const icon = document.getElementById("icon");

function darkMode () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    icon.src = isDark ? "./assets/modo.png" : "./assets/modo-escuro.png";
    icon.alt = isDark ? "Ativar claro" : "Ativar escuro";
}