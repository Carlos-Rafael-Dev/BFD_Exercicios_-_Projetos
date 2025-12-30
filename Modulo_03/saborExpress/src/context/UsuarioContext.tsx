import { createContext } from "react";
import type { Usuario } from "../domain/entities/Usuario";
import { Endereco } from "../domain/valueObjects/Endereco";

export type UsuarioContextType = {
  usuario: Usuario | null;
  login: (nome: string, telefone: string) => void;
  definirEndereco: (endereco: Endereco) => void;
  logout: () => void;
};

export const UsuarioContext = createContext<UsuarioContextType>(
  {} as UsuarioContextType
);
