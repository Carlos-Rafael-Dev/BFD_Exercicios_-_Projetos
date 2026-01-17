import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { PedidoProvider } from "./context/PedidoProvider.tsx";
import { UsuarioProvider } from "./context/UsuarioProvider.tsx";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <PedidoProvider>
          <AppRoutes />
        </PedidoProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>
);
