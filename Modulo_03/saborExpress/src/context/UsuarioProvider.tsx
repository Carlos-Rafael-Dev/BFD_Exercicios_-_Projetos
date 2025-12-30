import { useState, useEffect } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { Usuario } from "../domain/entities/Usuario";
import { Endereco } from "../domain/valueObjects/Endereco";

type Props = {
  children: React.ReactNode;
};

export function UsuarioProvider({ children }: Props) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function login(nome: string, telefone: string) {
    const novoUsuario = new Usuario(nome, telefone);
    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify({ nome, telefone }));
  }

  function definirEndereco(endereco: Endereco) {
    if (!usuario) return;

    const novoUsuario = new Usuario(
      usuario.getNome(),
      usuario.getTelefone(),
      endereco
    );

    setUsuario(novoUsuario);
    localStorage.setItem("endereco", JSON.stringify(endereco));
  }

  function logout() {
    setUsuario(null);
    localStorage.clear();
  }

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    const enderecoSalvo = localStorage.getItem("endereco");

    if (usuarioSalvo) {
      const { nome, telefone } = JSON.parse(usuarioSalvo);
      const endereco = enderecoSalvo
        ? Object.assign(new Endereco("", "", "", ""), JSON.parse(enderecoSalvo))
        : undefined;

      setUsuario(new Usuario(nome, telefone, endereco));
    }
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, login, definirEndereco, logout }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

// Persistencia simples
// Preparado para backend no futuro
