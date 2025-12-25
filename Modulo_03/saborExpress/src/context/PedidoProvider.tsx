import { useEffect, useState } from "react";
import { PedidoContext } from "./PedidoContext";
import { Pedido } from "../domain/entities/Pedido";
import { Prato } from "../domain/entities/Prato";
import { ItemPedido } from "../domain/entities/ItemPedido";
import { WhatsAppService } from "../services/WhatsAppService";


type Props = {
    children: React.ReactNode;
};

export function PedidoProvider({ children }: Props) {
    const [pedido, setPedido] = useState(() => {
        const salvo = localStorage.getItem("pedido");
        return salvo ? Pedido.fromJSON(JSON.parse(salvo)) : new Pedido();
    });

    const TELEFONE_RESTAURANTE = '5583987929627'

    function adicionarPrato(prato: Prato) {
        setPedido(prev => {
            const novoPedido = Pedido.fromJSON(prev.toJSON());
            novoPedido.adicionarItem(new ItemPedido(prato));
            return novoPedido;
        });
    }

    function removerPrato(index: number) {
        setPedido(prev => {
            const novoPedido = Pedido.fromJSON(prev.toJSON());
            novoPedido.removerItem(index);
            return novoPedido;
        });
    }

    function finalizarPedido() {
        const mensagem = WhatsAppService.gerarMensagem(pedido);
        const link = WhatsAppService.gerarLink(
            TELEFONE_RESTAURANTE,
            mensagem
        );

        window.open(link, "_blank");
        setPedido(new Pedido());
    }

    useEffect(() => {
        localStorage.setItem("pedido", JSON.stringify(pedido.toJSON()));
        }, [pedido]);

    return (
        <PedidoContext.Provider
            value={{
                pedido,
                adicionarPrato,
                removerPrato,
                finalizarPedido,
                total: pedido.calcularTotal(),
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
}