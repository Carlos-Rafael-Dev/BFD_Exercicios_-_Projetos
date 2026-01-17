import { createContext } from "react";
import type { Pedido } from "../domain/entities/Pedido";
import type { Prato } from "../domain/entities/Prato";
import type { ItemPedido } from "../domain/entities/ItemPedido";

export type PedidoContextType = {
  pedido: Pedido;
  adicionarPrato: (prato: Prato) => void;
  adicionarItem: (item: ItemPedido) => void;
  removerPrato: (index: number) => void;
  finalizarPedido: () => void;
  total: number;
};

export const PedidoContext = createContext<PedidoContextType>(
  {} as PedidoContextType
);
