//Entidade e metodos Usuario
//Quem faz o pedido

import { Endereco } from "../valueObjects/Endereco";

export class Usuario {
    constructor(
        private nome: string,
        private telefone: string,
        private endereco?: Endereco
    ) {}

    getNome() {
        return this.nome;
    }

    getTelefone() {
        return this.telefone;
    }

    getEndereco() {
        return this.endereco;
    }

    definirEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }
}

//Usuario simples
//Extendido para endereço e login