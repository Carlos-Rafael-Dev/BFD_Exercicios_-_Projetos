//Serviço de mensagem WhatsApp
import { Pedido } from "../domain/entities/Pedido";

export class WhatsAppService {
    static gerarMensagem(pedido: Pedido): string {
        return `
*Novo Pedido*
    
Olá! 
Gostaria de fazer o pedido:
    
*Itens do pedido*
${pedido.listarResumo()}

total: R$ ${pedido.calcularTotal().toFixed(2)}

*Formas de pagamento aceitas:*
- Pix
- Cartão de crédito
- Cartão de débito
- Dinheiro

Por favor, informe a forma de pagamento.

Obrigado(a)!
        `.trim();
    }

    static gerarLink(numero: string, mensagem: string): string {
        
        return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    }
}

//Serviço = integração externa