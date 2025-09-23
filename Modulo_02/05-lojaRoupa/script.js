const produtos = [
    {nome: "Camiseta Branca", 
    preco: 89.99, 
    imagem: "./assets/camisa-branca.jpg", 
    frete: "Frete grátis", 
    descricao: "Camiseta Branca sem estampa. feita 100% de algodão importado"},

    {nome: "Calça Jeans Descolorida", 
    preco: 199.99, 
    imagem: "./assets/calça.jpeg", 
    frete: "Frete grátis", 
    descricao: "Calça Jeans Descolorida Wide Leg Cintura Alta Tecido Grosso Marmorizada Linha Premium"},

    {nome: "Meia Cano alto", 
    preco: 24.99, 
    imagem: "./assets/meia-alta.jpeg", 
    frete: "Frete grátis", 
    descricao: "Meia Poliamida Esportiva Academia Ciclismo Corrida Adulto"},

    {nome: "Vestido Florido Azul", 
    preco: 89.99, 
    imagem: "./assets/vestido-florido.jpg", 
    frete: "Frete grátis", 
    descricao: "Vestido midi feminino de manga comprida com estampa floral e gola V"},
    
    {nome: "Shorts Tactel", 
    preco: 89.99, 
    imagem: "./assets/short.jpeg", 
    frete: "Frete grátis", 
    descricao: "Bermuda Short Feminino Tactel Elastano Academia/Treino/Praia"},
    
    {nome: "Moletom Berserker", 
    preco: 89.99, 
    imagem: "./assets/moletom.jpg", 
    frete: "Frete grátis", 
    descricao: "Moletom Berserk Black Swordsman Guts"},
    
    {nome: "Jaqueta Jeans Oversized", 
    preco: 249.90, 
    imagem: "./assets/jaqueta.jpg", 
    frete: "Frete grátis", 
    descricao: "Jaqueta jeans oversized com lavagem clara e bolsos frontais."},
    
    {nome: "Tênis Branco Casual", 
    preco: 299.99, 
    imagem: "./assets/tenis.jpeg", 
    frete: "Frete grátis", 
    descricao: "Tênis casual branco unissex, leve, confortável e versátil."},
    
    {nome: "Saia Plissada Preta", 
    preco: 119.99, 
    imagem: "./assets/saia.jpeg", 
    frete: "Frete grátis", 
    descricao: "Saia midi plissada preta em tecido leve e elegante."},
    
    {nome: "Camisa Social Slim", 
    preco: 159.90, 
    imagem: "./assets/blusa.jpg", 
    frete: "Frete grátis", 
    descricao: "Camisa social slim fit feminina de algodão premium."},
    
    {nome: "Bolsa Tote Feminina", 
    preco: 189.90, 
    imagem: "./assets/bolsa.jpg", 
    frete: "Frete grátis", 
    descricao: "Bolsa tote feminina de couro sintético com alça reforçada."},
    
    {nome: "Boné Trucker Preto", 
    preco: 79.90, 
    imagem: "./assets/bone.jpg", 
    frete: "Frete grátis", 
    descricao: "Boné trucker preto básico com ajuste traseiro."}
]

// Array do carrinho
const carrinho = [];

const lista = document.getElementById("listaProdutos");
const totalCarrinho = document.getElementById("total-carrinho");

// Renderizar lista de produtos disponiveis
produtos.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.nome;

    const nome = document.createElement("h2");
    nome.textContent = item.nome;

    const preco = document.createElement("p");
    preco.textContent = "Preço R$ " + item.preco.toFixed(2).replace(".", ",");

    const botao = document.createElement("button");
    botao.textContent = "Comprar";
    botao.addEventListener("click", () => addCart(item));
    
    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = item.descricao;

    const frete = document.createElement("p");
    frete.classList.add("frete");
    frete.textContent = item.frete;

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(preco);
    card.appendChild(botao);
    card.appendChild(frete);
    
    lista.appendChild(card);
})

// Abrir carrinho
const abrirCart = document.getElementById("carrinho");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");

function openSidebar () {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeSidebar () {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
}

abrirCart.addEventListener("click", openSidebar);
closeCart.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Adiciona produto no carrinho
function addCart(item) {

    const listaCart = document.getElementById("cartLista");

    const produtoExiste = carrinho.find(prod => prod.nome === item.nome);

    if (produtoExiste) {
        produtoExiste.quantidade++;
        atualizarCarrinho();
        return;
    }

    carrinho.push({ ...item, quantidade: 1 });
    
    atualizarCarrinho();

}

function atualizarCarrinho () {
    const listaCart = document.getElementById("cartLista");
    listaCart.innerHTML = "";

    carrinho.forEach((produto, index) => {
 
        const cardCart = document.createElement("div");
        cardCart.classList.add("cartItem");

        //imagem
        const imgCart = document.createElement("img");
        imgCart.src = produto.imagem;
        imgCart.alt = produto.nome;

        //Nome do produto
        const produtoCart = document.createElement("p");
        produtoCart.classList.add("produto");
        produtoCart.textContent = produto.nome;

        //Quantidade
        let quantidade = 1;
        const quantidadeDiv = document.createElement("div");
        quantidadeDiv.classList.add("quantity");

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.addEventListener("click", () => {
            if (produto.quantidade > 1) {
                produto.quantidade--;
            } else {
                carrinho.splice(index, -1);
            }
            atualizarCarrinho();
        });

        const spanQtd = document.createElement("span");
        spanQtd.textContent = produto.quantidade;

        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.addEventListener("click", () => {
            produto.quantidade++;
            atualizarCarrinho();
        });

        quantidadeDiv.appendChild(btnMenos);
        quantidadeDiv.appendChild(spanQtd);
        quantidadeDiv.appendChild(btnMais);

        //preço
        const precoCart = document.createElement("p");
        precoCart.classList.add("p");
        precoCart.textContent = "R$ " + (produto.preco * produto.quantidade).toFixed(2).replace(".", ",");

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener("click", () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        //Monta o card
        cardCart.appendChild(imgCart);
        cardCart.appendChild(produtoCart);
        cardCart.appendChild(quantidadeDiv);
        cardCart.appendChild(precoCart);
        cardCart.appendChild(btnRemover);

        listaCart.appendChild(cardCart);

});

    calcularTotal();
}

function calcularTotal () {
    const total = carrinho.reduce((soma, produto) => soma + (produto.preco * produto.quantidade), 0);
    const quantidadeTotal = carrinho.reduce((soma, produto) => soma + produto.quantidade, 0);   

    const summaryDiv = document.getElementById("total-carrinho");
    summaryDiv.innerHTML = "";

    if (carrinho.length === 0) {
        summaryDiv.innerHTML = "<p> Seu carrinho está vazio. </p>";
        return;
    }

    const cardSummary = document.createElement("div");
    cardSummary.classList.add("resumo");

    const textSummary = document.createElement("span");
    textSummary.textContent = "Resumo";

    const subtotalSummary = document.createElement("p");
    subtotalSummary.textContent = "Subtotal: (" + quantidadeTotal + " itens): R$ " + total.toFixed(2).replace(".", ",");

    const freteSummary = document.createElement("p");
    freteSummary.textContent = "Frete: grátis";

    const totalSummary = document.createElement("span");
    totalSummary.classList = "totalCalculado";
    totalSummary.textContent = "Total: R$ " + total.toFixed(2).replace(".",",");

    const btnSummary = document.createElement("button");
    btnSummary.classList.add("checkout");
    btnSummary.textContent = "Finalizar Compra";

    cardSummary.appendChild(textSummary);
    cardSummary.appendChild(subtotalSummary);
    cardSummary.appendChild(freteSummary);
    cardSummary.appendChild(totalSummary);
    cardSummary.appendChild(btnSummary);
    
    summaryDiv.appendChild(cardSummary);

    document.getElementById("carrinho").textContent = `🛒 Cart (${quantidadeTotal})`;
}
