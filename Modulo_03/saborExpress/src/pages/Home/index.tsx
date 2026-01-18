import Button from "../../components/Button";
import { Prato } from "../../domain/entities/Prato";
import MenuItem from "../../components/MenuItem";
import { cardapio } from "../../data/cardapio";
import { usePedido } from "../../hooks/usePedido";
import Header from "../../components/Header";
import { useState } from "react";
import IngredientesModal from "../../components/IngredientesModal/IngredientesModal";
import { ItemPedido } from "../../domain/entities/ItemPedido";
import { CategoriaPrato } from "../../domain/enums/CategoriaPrato";
import CategoryFilter from "../../components/CategoryFilter";


export default function Home() {
  const { adicionarPrato } = usePedido();
  const { adicionarItem } = usePedido();

  const [modalAberto, setModalAberto] = useState(false);
  const [pratoSelecionado, setPratoSelecionado] = useState<Prato | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = 
  useState<CategoriaPrato>(CategoriaPrato.SALADAS);

  const cardapioFiltrado = cardapio.filter(prato => {
    return prato.getCategoria() === categoriaSelecionada;
  })

  function handleAddPrato(prato: Prato) {
    adicionarPrato(prato);
  }

  function handleVerIngredientes(prato: Prato) {
    setPratoSelecionado(prato);
    setModalAberto(true);
  }

  function handleSalvarPersonalizacao(pratoPersonalizado: Prato) {
    const item = new ItemPedido(
        pratoSelecionado!,
        pratoPersonalizado,
        1
    )

    adicionarItem(item);

    setModalAberto(false);
    setPratoSelecionado(null);
  }

  return (
    <>
      <Header />

      <section>
        <h1>Comida prática para sua rotina</h1>
        <p>Escolha, peça e aproveite sem complicação.</p>
        <Button>Ver cardápio</Button>
      </section>

      <section>
        <h2>Cardápio</h2>

        <CategoryFilter 
          categoriaAtiva={categoriaSelecionada}
          onSelecionar={setCategoriaSelecionada}
        />

        {cardapioFiltrado.map((prato) => (
          <MenuItem
            key={prato.getId()}
            prato={prato}
            onAdd={handleAddPrato}
            onVerIngredientes={handleVerIngredientes}
          />
        ))}
      </section>

      {modalAberto && pratoSelecionado && (
        <IngredientesModal
          prato={pratoSelecionado}
          aberto={modalAberto}
          onFechar={() => setModalAberto(false)}
          onSalvar={handleSalvarPersonalizacao}
        />
      )}
    </>
  );
}
