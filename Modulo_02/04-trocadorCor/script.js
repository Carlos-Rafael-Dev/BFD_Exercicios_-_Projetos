function mudarCor (){
    const botao = document.getElementById("botao");
    const caixa = document.getElementById("minhaCaixa");
    const cores = ["#ff5733", "#33ff57", "#3357ff", "f5ff33", "#ff33f5"];
    const indiceAleatorio = Math.floor(Math.random() * cores.length);
    const novaCor = cores[indiceAleatorio];
    caixa.style.backgroundColor = novaCor;
    botao.style.color = novaCor;
}