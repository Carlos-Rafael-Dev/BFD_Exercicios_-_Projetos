class usuario {
    nome: string;
    idade: number;
    genero_favorito: [];
    email: string;
    senha: string;

    cadastrarUsuario(){

    }
    assistirFilme(){

    }
    avaliarFilme(){

    }
}


class filme {
    id_filme: number;
    nome: string;
    duracao: string;
    avaliacao: number;
    genero: ["Aventura", "Animação", "Ação", "Comédia", "Ficção-cientifica", "Terror" ];
    url_imagem: string;

    cadastrarFilme(){
        const catalogo = [{
            id_filme: 1,
            nome: "Harry Potter 01", 
            duracao: "93min",
            avaliacao: [],
            genero: this.genero[0],
            url_imagem: "/Catalogo/Aventura/HP1.jpg"},

            {
            id_filme: 2,
            nome: "Harry Potter 02", 
            duracao: "93min",
            avaliacao: [],
            genero: this.genero[0],
            url_imagem: "/Catalogo/Aventura/HP2.jpg"},
            
            {
            id_filme: 3,
            nome: "Harry Potter 03", 
            duracao: "93min",
            avaliacao: [],
            genero: this.genero[0],
            url_imagem: "/Catalogo/Aventura/HP3.jpg"},


        
        
        ]
        }

    exibirCatalogo(){
    }
}

class status {
    status: ["Quero ver", "Assistindo", "Concluído"];

    classificarStatus(){}
}

class recomendacao {
    gerarRecomendacao(){}
}
