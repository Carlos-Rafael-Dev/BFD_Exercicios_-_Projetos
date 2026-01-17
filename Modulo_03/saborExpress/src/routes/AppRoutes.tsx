import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PedidoPage from "../pages/Pedido";
import EnderecoPage from "../pages/Endereco";

import { RotaPrivada } from "./RotaPrivada";
import Checkout from "../pages/Checkout";
import UsuarioPage from "../pages/User";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrinho" element={<PedidoPage />} />
      <Route path="/usuario" element={<UsuarioPage />} />

      {/* Rotas protegidas */}
      <Route
        path="/endereco"
        element={
          <RotaPrivada>
            <EnderecoPage />
          </RotaPrivada>
        }
      />

      <Route
        path="/checkout"
        element={
          <RotaPrivada>
            <Checkout />
          </RotaPrivada>
        }
      />
    </Routes>
  );
}
