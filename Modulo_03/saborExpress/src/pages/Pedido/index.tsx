import Button from "../../components/Button";
import { usePedido } from "../../hooks/usePedido";


export default function PedidoPage() {
    const { pedido, total, finalizarPedido } = usePedido();

    return (
        <section>
            <h2>Carrinho</h2>

            {pedido.listarResumo() ? (
                <>
                    <pre>{pedido.listarResumo()}</pre>

                    <strong>Total: R$ {total.toFixed(2)}</strong>

                    <Button onClick={finalizarPedido}>
                        Finalizar pedido
                    </Button>
                </>
            ) : (
                <p>Seu pedido ainda está vazio.</p>
            )}
        </section>
    );
}