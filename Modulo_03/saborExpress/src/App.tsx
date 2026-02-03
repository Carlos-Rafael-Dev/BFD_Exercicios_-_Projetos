import FlowTicker from './components/FlowTicker/index.tsx';
import Header from './components/Header/index.tsx';
import Home from './pages/Home/index.tsx';
import PedidoPage from './pages/Pedido/index.tsx';

function App() {
  return (
    <>
      <Header />
      <h1>Sabor Express</h1>

      <Home />

      <FlowTicker />

      <PedidoPage />

    </>
  )
}

export default App;
