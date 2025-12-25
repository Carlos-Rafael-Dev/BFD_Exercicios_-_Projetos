//Entidade e metodos Pedido (coração do sistema)
//Carrinho + regras
import { StatusPedido } from "../enums/StatusPedido";
import { ItemPedido } from "./ItemPedido";

export class Pedido {
    private itens: ItemPedido[] = [];
    private status: StatusPedido = StatusPedido.ABERTO;

    adicionarItem(item: ItemPedido) {
        this.itens.push(item);
    }

    removerItem(index: number) {
        this.itens.splice(index, 1);
    }

    calcularTotal(): number {
        return this.itens.reduce((total, item) => total + item.getTotal(), 0);
    }

    listarResumo(): string {
        return this.itens.map(item => item.getResumo()).join('\n');
    }

    finalizarPedido() {
        this.status = StatusPedido.ENVIADO;
    }

    getStatus() {
        return this.status;
    }

    toJSON() {
        return {
            itens: this.itens.map(item => item.toJSON())
        }
    }

    static fromJSON(json: any): Pedido {
        const pedido = new Pedido();
        pedido.itens = json.itens.map((item: any) =>
            ItemPedido.fromJSON(item)
        );
        return pedido;
    }
}

//Resolve lógica de carrinho