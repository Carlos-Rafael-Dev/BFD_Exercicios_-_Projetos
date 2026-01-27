import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuario";
import { usePedido } from "../../hooks/usePedido";
import Button from "../../components/Button";

export default function Checkout() {
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const { pedido, finalizarPedido } = usePedido();

  const pedidoVazio = pedido.calcularTotal() === 0;

  if (!usuario?.getEndereco()) {
    return <Navigate to="/endereco" replace />;
  }

  function handleFinalizar() {
    if (pedidoVazio) return;

    finalizarPedido();
    navigate("/usuario");
  }

  return (
    <>
      <section>
        <h2>Confirmar pedido</h2>

        {pedido.getItens().map((item, index) => {
          const descricao = item.getDescricao();

          return (
            <div key={index}>
              <strong>{descricao.nome}</strong>
              {descricao.observacao && <p>{descricao.observacao}</p>}
              <p>Quantidade: {item.getQuantidade()}</p>
              <p>Subtotal: R$ {item.getTotal().toFixed(2)}</p>
            </div>
          );
        })}

        <p>Total: R$ {pedido.calcularTotal().toFixed(2)}</p>
      </section>

      <div>
        <h3>Endereço de entrega</h3>
        <p>{usuario.getEndereco()?.formatar()}</p>
      </div>

      <div>
        <NavLink to="/carrinho">Voltar ao carrinho</NavLink>

        <NavLink to="/endereco">Alterar endereço</NavLink>
      </div>

      <Button onClick={handleFinalizar} disabled={pedidoVazio}>
        Enviar Pedido
      </Button>

      {pedidoVazio && (
        <p>Seu carrinho está vazio. Adiocione itens para continuar.</p>
      )}
    </>
  );
}
