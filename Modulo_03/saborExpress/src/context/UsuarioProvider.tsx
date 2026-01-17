import { useState, useEffect } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { Usuario } from "../domain/entities/Usuario";
import { Endereco } from "../domain/valueObjects/Endereco";
import type { PedidoDTO } from "../domain/entities/Pedido";

type Props = {
  children: React.ReactNode;
};

export function UsuarioProvider({ children }: Props) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [historicoPedidos, setHistoricoPedidos] = useState<PedidoDTO[]>([]);

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

  function adicionarPedido(pedido: PedidoDTO) {
    const novosPedidos = [...historicoPedidos, pedido];
    setHistoricoPedidos(novosPedidos);
    localStorage.setItem("historicoPedidos", JSON.stringify(novosPedidos));
  }

  function logout() {
    setUsuario(null);
    localStorage.clear();
  }

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    const enderecoSalvo = localStorage.getItem("endereco");
    const pedidosSalvos = localStorage.getItem("historicoPedidos");

    if (usuarioSalvo) {
      const { nome, telefone } = JSON.parse(usuarioSalvo);
      const endereco = enderecoSalvo
        ? Object.assign(new Endereco("", "", "", ""), JSON.parse(enderecoSalvo))
        : undefined;

      setUsuario(new Usuario(nome, telefone, endereco));
    }

    if (pedidosSalvos) {
      setHistoricoPedidos(JSON.parse(pedidosSalvos));
    }

  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, historicoPedidos, login, definirEndereco, adicionarPedido, logout }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

// Persistencia simples
// Preparado para backend no futuro
