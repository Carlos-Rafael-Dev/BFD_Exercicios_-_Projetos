//Entidade e metodos Pedido (coração do sistema)
//Retorna vários Pratos
//Carrinho + regras
import { StatusPedido } from "../enums/StatusPedido";
import { ItemPedido } from "./ItemPedido";
import type { ItemPedidoDTO } from "./ItemPedido";
import type { Prato } from "./Prato";

export type PedidoDTO = {
  itens: ItemPedidoDTO[];
};

export class Pedido {
  private itens: ItemPedido[] = [];
  private status: StatusPedido = StatusPedido.ABERTO;

  adicionarItem(item: ItemPedido) {
    this.itens.push(item);
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }

  calcularTotal(): number {
    return this.itens.reduce((total, item) => total + item.getTotal(), 0);
  }

  aumentarQuantidadeItem(index: number) {
    const item = this.itens[index];
    if (!item) return;

    item.aumentarQuantidade();
  }

  diminuirQuantidadeItem(index: number) {
    const item = this.itens[index];
    if (!item) return;

    item.diminuirQuantidade();

    // opcional: remover item se quantidade chegar a 0
    if (item.isVazio()) {
      this.removerItem(index);
    }
  }

  getItens(): readonly ItemPedido[] {
    return this.itens;
  }

  finalizarPedido() {
    this.status = StatusPedido.ENVIADO;
  }

  getStatus() {
    return this.status;
  }

  getResumoPedido(): string {
    return this.itens.map((item) => item.getDescricao()).join("\n");
  }

  pratoJaNoCarrinho(prato: Prato): number {
    return this.itens.findIndex(
      (item) => item.getPrato().getId() === prato.getId()
    );
  }

  adicionarOuIncrementar(item: ItemPedido): "ADICIONADO" | "ATUALIZADO" {
    const index = this.pratoJaNoCarrinho(item.getPrato());

    if (index >= 0) {
      this.itens[index].aumentarQuantidade();
      return "ATUALIZADO";
    }

    this.itens.push(item);
    return "ADICIONADO";
  }

  getQuantidadePorPrato(prato: Prato): number {
    const item = this.itens.find(
      (item) => item.getPrato().getId() === prato.getId()
    );

    return item ? item.getQuantidade() : 0;
  }

  toJSON(): PedidoDTO {
    return {
      itens: this.itens.map((item) => item.toJSON()),
    };
  }

  static fromJSON(json: PedidoDTO): Pedido {
    const pedido = new Pedido();
    pedido.itens = json.itens.map((item: any) => ItemPedido.fromJSON(item));
    return pedido;
  }
}

//Resolve lógica de carrinho
