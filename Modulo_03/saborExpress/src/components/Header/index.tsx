import { NavLink } from "react-router-dom";
import sacolaIcon from "../../assets/bolsa-de-compras.png";

export default function Header() {
  return (
    <div className="header">
      <img src="../public/Logotipo-restaurante-cor.png" alt="logotipo" />
      <nav className="navbar">
        <a href="#">Cardápio</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>
      <NavLink to='/carrinho'>
        <button className="shopping-cart">
          <img src={sacolaIcon} alt="Carrinho" />
        </button>
      </NavLink>
    </div>
  );
}
