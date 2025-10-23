import React from 'react'
import { pratosPrincipais, sobremesas, bebidas } from '../assets/cardapio';
import Card from './Card'

const Cards = ({numCategoriaSelecionada}) => {
    const itensCategoria = [pratosPrincipais, sobremesas, bebidas];
    const categoriaSelecionada = itensCategoria[numCategoriaSelecionada];

  return (
    <div className="cards">
        {categoriaSelecionada.map((item) => (
        <Card
            titulo={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            imagem={item.imagem}
        />
    ))}
    </div>
  )
}

export default Cards