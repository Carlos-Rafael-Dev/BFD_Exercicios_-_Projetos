import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { usePedido } from "../../hooks/usePedido";

export default function PedidoPage() {
  const { pedido, total } = usePedido();
  const navigate = useNavigate();

  function handleFinalizar() {
    navigate("/checkout");
  }

  return (
    <section>
      <h2>Carrinho</h2>

      {pedido.listarResumo() ? (
        <>
          <pre>{pedido.listarResumo()}</pre>

          <strong>Total: R$ {total.toFixed(2)}</strong>

          <Button onClick={handleFinalizar}>Finalizar pedido</Button>
        </>
      ) : (
        <p>Seu pedido ainda está vazio.</p>
      )}
    </section>
  );
}
