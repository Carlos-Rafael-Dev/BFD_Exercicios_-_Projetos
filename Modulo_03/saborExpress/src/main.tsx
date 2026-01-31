import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { PedidoProvider } from "./context/PedidoProvider.tsx";
import { UsuarioProvider } from "./context/UsuarioProvider.tsx";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <UsuarioProvider>
          <PedidoProvider>
            <AppRoutes />
          </PedidoProvider>
        </UsuarioProvider>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
