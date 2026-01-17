import { createContext } from "react";
import type { Usuario } from "../domain/entities/Usuario";
import { Endereco } from "../domain/valueObjects/Endereco";
import type { PedidoDTO } from "../domain/entities/Pedido";

export type UsuarioContextType = {
  usuario: Usuario | null;
  historicoPedidos: PedidoDTO[];
  login: (nome: string, telefone: string) => void;
  definirEndereco: (endereco: Endereco) => void;
  adicionarPedido: (pedido: PedidoDTO) => void;
  logout: () => void;
};

export const UsuarioContext = createContext<UsuarioContextType>(
  {} as UsuarioContextType
);
