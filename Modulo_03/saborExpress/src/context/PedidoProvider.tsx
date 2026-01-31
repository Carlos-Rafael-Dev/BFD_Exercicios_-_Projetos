import { useEffect, useState } from "react";
import { PedidoContext } from "./PedidoContext";
import { Pedido } from "../domain/entities/Pedido";
import { Prato } from "../domain/entities/Prato";
import { ItemPedido } from "../domain/entities/ItemPedido";
import { WhatsAppService } from "../services/WhatsAppService";
import { useUsuario } from "../hooks/useUsuario";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

type Props = {
  children: React.ReactNode;
};

export function PedidoProvider({ children }: Props) {
  const navigate = useNavigate();
  const { usuario, adicionarPedido } = useUsuario();

  const { showToast } = useToast();

  type UltimaAcao =
    | { tipo: "ADICIONADO"; prato: string }
    | { tipo: "ATUALIZADO"; prato: string }
    | { tipo: "PERSONALIZADO"; prato: string }
    | null;

  const [ultimaAcao, setUltimaAcao] = useState<UltimaAcao>(null);

  const [pedido, setPedido] = useState(() => {
    const salvo = localStorage.getItem("pedido");
    if (!salvo || salvo === "undefined") {
      return new Pedido();
    }
    try {
      return Pedido.fromJSON(JSON.parse(salvo));
    } catch {
      return new Pedido();
    }
  });

  const TELEFONE_RESTAURANTE = "5583987929627";

  function adicionarOuIncrementar(prato: Prato) {
    setPedido((prev) => {
      const novoPedido = Pedido.fromJSON(prev.toJSON());

      const item = new ItemPedido(prato, prato);
      const resultado = novoPedido.adicionarOuIncrementar(item);

      setUltimaAcao({
        tipo: resultado,
        prato: prato.nome,
      });

      return novoPedido;
    });
  }

  function adicionarItem(item: ItemPedido) {
    setPedido((prev) => {
      const novoPedido = Pedido.fromJSON(prev.toJSON());
      novoPedido.adicionarItem(item);
      return novoPedido;
    });

    setUltimaAcao({
      tipo: "PERSONALIZADO",
      prato: item.personalizado.nome,
    });
  }

  function removerPrato(index: number) {
    setPedido((prev) => {
      const novoPedido = Pedido.fromJSON(prev.toJSON());
      novoPedido.removerItem(index);
      return novoPedido;
    });
  }

  function aumentarQuantidade(index: number) {
    setPedido((prev) => {
      const novoPedido = Pedido.fromJSON(prev.toJSON());
      novoPedido.aumentarQuantidadeItem(index);
      return novoPedido;
    });
  }

  function diminuirQuantidade(index: number) {
    setPedido((prev) => {
      const novoPedido = Pedido.fromJSON(prev.toJSON());
      novoPedido.diminuirQuantidadeItem(index);
      return novoPedido;
    });
  }

  function pratoJaNoCarrinho(prato: Prato): boolean {
    return pedido.pratoJaNoCarrinho(prato) >= 0;
  }

  function quantidadeNoCarrinho(prato: Prato): number {
    return pedido.getQuantidadePorPrato(prato);
  }

  function finalizarPedido() {
    if (!usuario) {
      navigate("/login");
      return;
    }

    adicionarPedido(pedido.toJSON());

    const mensagem = WhatsAppService.gerarMensagem(pedido, usuario);
    const link = WhatsAppService.gerarLink(TELEFONE_RESTAURANTE, mensagem);

    window.open(link, "_blank");
    setPedido(new Pedido());
    localStorage.removeItem("pedido");
  }

  useEffect(() => {
    if (!ultimaAcao) return;

    const { tipo, prato } = ultimaAcao;

    if (tipo === "ATUALIZADO") {
      showToast("Atualizado no carrinho");
    }

    if (tipo === "ADICIONADO") {
      showToast(`${prato} adicionado ao carrinho`);
    }

    if (tipo === "PERSONALIZADO") {
      showToast(`${prato} personalizado adicionado ao carrinho`);
    }

    setUltimaAcao(null);
  }, [ultimaAcao]);

  useEffect(() => {
    localStorage.setItem("pedido", JSON.stringify(pedido.toJSON()));
  }, [pedido]);

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        adicionarOuIncrementar,
        pratoJaNoCarrinho,
        quantidadeNoCarrinho,
        adicionarItem,
        removerPrato,
        finalizarPedido,
        aumentarQuantidade,
        diminuirQuantidade,
        total: pedido.calcularTotal(),
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
