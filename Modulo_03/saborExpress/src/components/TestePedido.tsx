import { ItemPedido } from "../domain/entities/ItemPedido";
import { Pedido } from "../domain/entities/Pedido";
import { Prato } from "../domain/entities/Prato";
import { CategoriaPrato } from "../domain/enums/CategoriaPrato";
import { useEffect } from 'react';

export default function TestePedido() {
  useEffect(() => {
    const prato = new Prato(
      '1',
      'Salada Fit Express',
      29.9,
      CategoriaPrato.SALADAS
    );

    const bebida = new Prato(
      '2',
      'Suco Natural',
      8.5,
      CategoriaPrato.BEBIDAS
    );

    const itemSalada = new ItemPedido(prato, 2);
    const itemBebida = new ItemPedido(bebida, 2);

    const pedido = new Pedido();

    pedido.adicionarItem(itemSalada);
    pedido.adicionarItem(itemBebida);

    console.log('Total do pedido:', pedido.calcularTotal().toFixed(2));
  }, []);

  return <h1>Teste Pedido</h1>;
}

  