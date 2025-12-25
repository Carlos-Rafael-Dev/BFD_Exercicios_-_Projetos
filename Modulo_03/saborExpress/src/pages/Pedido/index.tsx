import Button from "../../components/Button";
import { usePedido } from "../../hooks/usePedido";


export default function PedidoPage() {
    const { pedido, total } = usePedido();

    return (
        <section>
            <h2>Carrinho</h2>

            <pre>{pedido.listarResumo()}</pre>

            <strong>Total: R$ {total.toFixed(2)}</strong>

            <Button>Finalizar pedido</Button>

        </section>
    );
}