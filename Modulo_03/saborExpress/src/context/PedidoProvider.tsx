import { useEffect, useState } from "react";
import { PedidoContext } from "./PedidoContext";
import { Pedido } from "../domain/entities/Pedido";
import { Prato } from "../domain/entities/Prato";
import { ItemPedido } from "../domain/entities/ItemPedido";


type Props = {
    children: React.ReactNode;
};

export function PedidoProvider({ children }: Props) {
    const [pedido, setPedido] = useState(() => {
        const salvo = localStorage.getItem("pedido");
        return salvo ? Pedido.fromJSON(JSON.parse(salvo)) : new Pedido();
    });

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

    useEffect(() => {
        localStorage.setItem("pedido", JSON.stringify(pedido.toJSON()));
        }, [pedido]);

    return (
        <PedidoContext.Provider
            value={{
                pedido,
                adicionarPrato,
                removerPrato,
                total: pedido.calcularTotal(),
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
}