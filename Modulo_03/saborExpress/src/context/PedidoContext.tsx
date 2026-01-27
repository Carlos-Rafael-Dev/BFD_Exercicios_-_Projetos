import { createContext } from "react";
import type { Pedido } from "../domain/entities/Pedido";
import type { Prato } from "../domain/entities/Prato";
import type { ItemPedido } from "../domain/entities/ItemPedido";

export type PedidoContextType = {
  pedido: Pedido;
  adicionarOuIncrementar: (prato: Prato) => void;
  pratoJaNoCarrinho: (prato: Prato) => boolean;
  quantidadeNoCarrinho: (prato: Prato) => number;
  adicionarItem: (item: ItemPedido) => void;
  removerPrato: (index: number) => void;
  finalizarPedido: () => void;
  aumentarQuantidade: (index: number) => void;
  diminuirQuantidade: (index: number) => void;
  total: number;
};

export const PedidoContext = createContext<PedidoContextType>(
  {} as PedidoContextType
);
