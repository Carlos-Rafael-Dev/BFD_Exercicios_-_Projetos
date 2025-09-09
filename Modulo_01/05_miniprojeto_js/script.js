var dataAtual = new Date()
const opcoes = {year: "numeric", month: "long", day: "numeric"};
const dataFormatada = "Hoje, " + dataAtual.toLocaleDateString("pt-BR", opcoes);
document.getElementById("data-atual").textContent = dataFormatada;