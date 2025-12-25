import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export function usePedido() {
    return useContext(PedidoContext);
}