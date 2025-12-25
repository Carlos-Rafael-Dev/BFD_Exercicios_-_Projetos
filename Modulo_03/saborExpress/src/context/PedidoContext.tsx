import { createContext } from "react";
import type { Pedido } from "../domain/entities/Pedido";
import type { Prato } from "../domain/entities/Prato";

export type PedidoContextType = {
    pedido: Pedido;
    adicionarPrato: (prato: Prato) => void;
    removerPrato: (index: number) => void;
    total: number;
};

export const PedidoContext = createContext<PedidoContextType>(
    {} as PedidoContextType
);