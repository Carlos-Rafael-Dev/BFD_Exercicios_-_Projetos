//Serviço de mensagem WhatsApp
import { Pedido } from "../domain/entities/Pedido";

export class WhatsAppService {
    static gerarMensagem(pedido: Pedido): string {
        return `
    Olá! Gostaria de fazer o pedido:
    
    ${pedido.listarResumo()}

    total: R$ ${pedido.calcularTotal().toFixed(2)}
        `.trim();
    }

    static gerarLink(numero: string, mensagem: string): string {
        return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    }
}

//Serviço = integração externa