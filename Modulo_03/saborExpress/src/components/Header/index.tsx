import sacolaIcon from "../../assets/bolsa-de-compras.png";
import { useState } from "react";
import PedidoPage from "../../pages/Pedido";
import { usePedido } from "../../hooks/usePedido";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);

  const { pedido } = usePedido();
  const quantidadeItens = pedido.getItens().length;

  return (
    <div className="header">
      <img src="../public/Logotipo-restaurante-cor.png" alt="logotipo" />
      <nav className="navbar">
        <a href="#">Cardápio</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>

      <button className="shopping-cart" onClick={() => setCartOpen(true)}>
        <img src={sacolaIcon} alt="Carrinho" />

      {quantidadeItens > 0 && (
        <span className="cart-badge">
          {quantidadeItens}
        </span>
      )}
        
      </button>

      <PedidoPage isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
