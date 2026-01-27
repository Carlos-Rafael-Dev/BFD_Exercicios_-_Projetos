import type { CategoriaPrato } from "../enums/CategoriaPrato";
import type { Ingrediente } from "../valueObjects/Ingrediente";
import { Prato } from "./Prato";
import type { PratoDTO } from "./Prato";

export type ComboDTO = PratoDTO & {
  pratos: PratoDTO[];
  percentualDesconto: number;
};

export class Combo extends Prato {
  constructor(
    id: string,
    imagem: string,
    nome: string,
    descricao: string,
    categoria: CategoriaPrato,
    ingrediente: Ingrediente[],
    private pratos: Prato[],
    private percentualDesconto: number = 0.1
  ) {
    super(id, imagem, nome, descricao, 0, categoria, ingrediente);

    if (pratos.length === 0) {
      throw new Error("Um combo deve possuir ao menos um prato.");
    }
  }

  getPratos(): Prato[] {
    return [...this.pratos];
  }

  // Preço original (soma dos pratos)
  getPrecoOriginal(): number {
    return this.pratos.reduce((total, prato) => total + prato.getPreco(), 0);
  }

  override getPreco(): number {
    const precoComDesconto =
      this.getPrecoOriginal() * (1 - this.percentualDesconto);

    return Number(precoComDesconto.toFixed(2));
  }

  // Valor economizado no combo
  getDesconto(): number {
    return this.getPrecoOriginal() - this.getPreco();
  }

  clonarComPratos(pratosPersonalizados: Prato[]): Combo {
    return new Combo(
      this.getId(),
      this.getImagem(),
      this.getNome(),
      this.getDescricao(),
      this.getCategoria(),
      [], // ingredientes do combo são derivados
      pratosPersonalizados,
      this.percentualDesconto
    );
  }

  getResumoPersonalizacao(original: Combo): string {
    const linhas: string[] = [];

    this.pratos.forEach((pratoPersonalizado) => {
      const pratoOriginal = original
        .getPratos()
        .find((p) => p.getId() === pratoPersonalizado.getId());

      if (!pratoOriginal) return;

      const removidos = pratoPersonalizado.ingredientesRemovidos(pratoOriginal);

      if (removidos.length > 0) {
        linhas.push(`${pratoPersonalizado.nome} (sem ${removidos.join(", ")})`);
      }
    });

    return linhas.join("; ");
  }

  override toJSON(): ComboDTO {
    return {
      id: this.getId(),
      imagem: this.getImagem(),
      nome: this.getNome(),
      descricao: this.getDescricao(),
      preco: this.getPreco(), // 🔴 obrigatório (mesmo sendo calculado)
      categoria: this.getCategoria(),
      ingredientes: [], // combos não têm ingredientes próprios
      percentualDesconto: this.percentualDesconto,
      pratos: this.pratos.map((p) => p.toJSON()),
    };
  }

  static fromJSON(json: any): Combo {
    return new Combo(
      json.id,
      json.imagem,
      json.nome,
      json.descricao,
      json.categoria,
      [], // ingredientes do combo são derivados
      json.pratos.map((p: any) => Prato.fromJSON(p)),
      json.percentualDesconto
    );
  }
}
