//Entidade e metodos Usuario
//Quem faz o pedido
export class Usuario {
    constructor(
        private nome: string,
        private telefone: string
    ) {}

    getNome() {
        return this.nome;
    }

    getTelefone() {
        return this.telefone;
    }
}

//Usuario simples
//Extender para endereço e login