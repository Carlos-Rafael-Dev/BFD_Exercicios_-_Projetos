import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { usePedido } from "../../hooks/usePedido";
import CartItem from "../../components/CartItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PedidoPage({ isOpen, onClose }: Props) {
  const {
    pedido,
    total,
    aumentarQuantidade,
    diminuirQuantidade,
    removerPrato,
  } = usePedido();

  const navigate = useNavigate();

  const itens = pedido.getItens();

  function handleFinalizar() {
    navigate("/checkout");
  }

  return (
    <>
      {/*Overlay*/}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Painel lateral */}
      <aside className={`cart-panel ${isOpen ? "open" : ""}`}>
        <header className="cart-header">
          <h2>Carrinho ({itens.length})</h2>
          <button onClick={onClose}>✕</button>
        </header>

        {itens.length > 0 ? (
          <>
            {itens.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                index={index}
                onAdd={aumentarQuantidade}
                onRemove={diminuirQuantidade}
                onDelete={removerPrato}
              />
            ))}

            <div className="resumo">
              <p>Resumo</p>
              <strong>Total: R$ {total.toFixed(2)}</strong>
              <Button onClick={handleFinalizar}>Finalizar pedido</Button>
            </div>
          </>
        ) : (
          <p>Seu pedido ainda está vazio.</p>
        )}
      </aside>
    </>
  );
}
