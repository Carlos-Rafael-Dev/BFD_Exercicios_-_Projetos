//Entidade Prato
//Representa um item do cardápio
import { CategoriaPrato } from "../enums/CategoriaPrato";

export class Prato {
    constructor(
        private readonly id: string,
        private nome: string,
        private descricao: string,
        private preco: number,
        private categoria: CategoriaPrato
    ) {}

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getDescricao() {
        return this.descricao;
    }

    getPreco() {
        return this.preco;
    }

    getCategoria() {
        return this.categoria;
    }

    static fromJSON(json: any): Prato {
        return new Prato(
            json.id,
            json.nome,
            json.descricao,
            json.preco,
            json.categoria
        );
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            preco: this.preco,
            categoria: this.categoria
        };
    }
}

//Encapsulado: ninguem mexe diretamente nos dados
