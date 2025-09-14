const produtos = [
    {nome: "Camiseta Branca", preco: 89.99, imagem: "/assets/camisa-branca.jpg", frete: "Frete grátis", descricao: "Camiseta Branca sem estampa. feita 100% de algodão importado"},
    {nome: "Calça Jeans Descolorida", preco: 199.99, imagem: "/assets/calça.jpeg", frete: "Frete grátis", descricao: "Calça Jeans Descolorida Wide Leg Cintura Alta Tecido Grosso Marmorizada Linha Premium"},
    {nome: "Meia Cano alto", preco: 24.99, imagem: "/assets/meia-alta.jpeg", frete: "Frete grátis", descricao: "Meia Poliamida Esportiva Academia Ciclismo Corrida Adulto"},
    {nome: "Vestido Florido Azul", preco: 89.99, imagem: "/assets/vestido-florido.jpg", frete: "Frete grátis", descricao: "Vestido midi feminino de manga comprida com estampa floral e gola V"},
    {nome: "Shorts Tactel", preco: 89.99, imagem: "/assets/short.jpeg", frete: "Frete grátis", descricao: "Bermuda Short Feminino Tactel Elastano Academia/Treino/Praia"},
    {nome: "Moletom Berserker", preco: 89.99, imagem: "/assets/moletom.jpg", frete: "Frete grátis", descricao: "Moletom Berserk Black Swordsman Guts"},
    {nome: "Jaqueta Jeans Oversized", preco: 249.90, imagem: "/assets/jaqueta.jpg", frete: "Frete grátis", descricao: "Jaqueta jeans oversized com lavagem clara e bolsos frontais."},
    {nome: "Tênis Branco Casual", preco: 299.99, imagem: "/assets/tenis.jpeg", frete: "Frete grátis", descricao: "Tênis casual branco unissex, leve, confortável e versátil."},
    {nome: "Saia Plissada Preta", preco: 119.99, imagem: "/assets/saia.jpeg", frete: "Frete grátis", descricao: "Saia midi plissada preta em tecido leve e elegante."},
    {nome: "Camisa Social Slim", preco: 159.90, imagem: "/assets/blusa.jpg", frete: "Frete grátis", descricao: "Camisa social slim fit feminina de algodão premium."},
    {nome: "Bolsa Tote Feminina", preco: 189.90, imagem: "/assets/bolsa.jpg", frete: "Frete grátis", descricao: "Bolsa tote feminina de couro sintético com alça reforçada."},
    {nome: "Boné Trucker Preto", preco: 79.90, imagem: "/assets/bone.jpg", frete: "Frete grátis", descricao: "Boné trucker preto básico com ajuste traseiro."}
]

const lista = document.getElementById("listaProdutos");

produtos.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.nome;

    const nome = document.createElement("h2");
    nome.textContent = item.nome;

    const preco = document.createElement("p");
    preco.textContent = "Preço R$ " + item.preco.toFixed(2);

    const botao = document.createElement("button");
    botao.textContent = "Comprar";
    botao.addEventListener("click", () => {
        let overlay = document.getElementById("overlay");
        overlay.innerHTML = `Você comprou o produto ${item.nome} - R$ ${item.preco}`;
        overlay.style.display = "flex";
        setTimeout(() => {overlay.style.display = "none";}, 3000);
    });

    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = item.descricao;

    const frete = document.createElement("p");
    frete.classList.add("frete");
    frete.textContent = item.frete;

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(descricao);
    card.appendChild(botao);
    card.appendChild(frete);
    
    lista.appendChild(card);
})