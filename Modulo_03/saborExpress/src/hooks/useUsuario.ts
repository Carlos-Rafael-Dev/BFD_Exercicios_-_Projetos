import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

export function useUsuario() {
  return useContext(UsuarioContext);
}
