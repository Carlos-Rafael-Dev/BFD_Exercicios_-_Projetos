import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { PedidoProvider } from './context/PedidoProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </StrictMode>,
);
