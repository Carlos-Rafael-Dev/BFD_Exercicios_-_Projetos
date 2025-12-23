//Entidade Prato
//Representa um item do cardápio
import { CategoriaPrato } from "../enums/CategoriaPrato";

export class Prato {
    constructor(
        private readonly id: string,
        private nome: string,
        private preco: number,
        private categoria: CategoriaPrato
    ) {}

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }

    getCategoria() {
        return this.categoria;
    }
}

//Encapsulado: ninguem mexe diretamente nos dados
