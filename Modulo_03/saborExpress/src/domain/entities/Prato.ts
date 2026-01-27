//Entidade Prato
//Representa um item do cardápio
import { CategoriaPrato } from "../enums/CategoriaPrato";
import { Ingrediente } from "../valueObjects/Ingrediente";

export type PratoDTO = {
  id: string;
  imagem: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaPrato;
  ingredientes: Ingrediente[];
};

export class Prato {
  constructor(
    public readonly id: string,
    public imagem: string,
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: CategoriaPrato,
    public ingredientes: Ingrediente[]
  ) {}

  getId() {
    return this.id;
  }

  getImagem() {
    return this.imagem;
  }

  getNome() {
    return this.nome;
  }

  getDescricao() {
    return this.descricao;
  }

  getPreco(): number {
    return this.preco;
  }

  getCategoria() {
    return this.categoria;
  }

  getIngredientes(): Ingrediente[] {
    return [...this.ingredientes];
  }

  calcularKcalTotal(): number {
    return this.ingredientes
      .filter((i) => i.selecionado)
      .reduce((total, i) => total + i.kcal, 0);
  }

  totalIngredientesSelecionados(): number {
    return this.ingredientes.filter((i) => i.selecionado).length;
  }

  clonar(): Prato {
    return new Prato(
      this.id,
      this.imagem,
      this.nome,
      this.descricao,
      this.preco,
      this.categoria,
      this.ingredientes.map((ingrediente) => ingrediente.clonar())
    );
  }

  toggleIngrediente(ingredienteId: string): Prato {
    const ingredientesAtualizados = this.ingredientes.map((ingrediente) =>
      ingrediente.id === ingredienteId
        ? new Ingrediente(
            ingrediente.id,
            ingrediente.nome,
            ingrediente.quantidade,
            ingrediente.kcal,
            ingrediente.imagem,
            ingrediente.obrigatorio,
            !ingrediente.selecionado
          )
        : ingrediente.clonar()
    );

    return new Prato(
      this.id,
      this.imagem,
      this.nome,
      this.descricao,
      this.preco,
      this.categoria,
      ingredientesAtualizados
    );
  }

  ingredientesRemovidos(pratoOriginal: Prato): string[] {
    return pratoOriginal.ingredientes
      .filter(
        (orig) =>
          orig.selecionado &&
          !this.ingredientes.find((i) => i.id === orig.id)?.selecionado
      )
      .map((i) => i.nome);
  }

  static fromJSON(json: PratoDTO): Prato {
    return new Prato(
      json.id,
      json.imagem,
      json.nome,
      json.descricao,
      Number(json.preco),
      json.categoria,
      json.ingredientes
    );
  }

  toJSON(): PratoDTO {
    return {
      id: this.id,
      imagem: this.imagem,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      categoria: this.categoria,
      ingredientes: this.ingredientes,
    };
  }
}

//Encapsulado: ninguem mexe diretamente nos dados
