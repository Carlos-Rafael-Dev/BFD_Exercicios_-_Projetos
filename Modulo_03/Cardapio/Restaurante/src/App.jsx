import React, { useState } from 'react'
import "./App.css";
import Categorias from './components/categorias';
import Cards from './components/Cards';
import Banner from './components/Banner';

function App() {
  // Hook
  // Variavel de Estado
  const [numCategoriaSelecionada, setNumCategoriaSelecionada] = useState(0);
  
  return (
    <div className='container'>
      <Banner />

      <Categorias 
        numCategoriaSelecionada={numCategoriaSelecionada}
        setNumCategoriaSelecionada={setNumCategoriaSelecionada}  
      />

      <Cards
        numCategoriaSelecionada={numCategoriaSelecionada}
      />

    </div>
  );
}

export default App