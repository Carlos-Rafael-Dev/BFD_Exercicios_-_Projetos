//Serviço de mensagem WhatsApp
import { Pedido } from "../domain/entities/Pedido";
import { Usuario } from "../domain/entities/Usuario";

export class WhatsAppService {
  static gerarMensagem(pedido: Pedido, usuario: Usuario): string {
    const itensFormatados = pedido
      .getItens()
      .map((item) => {
        const descricao = item.getDescricao();

        let linha = `- ${descricao.nome} (x${item.getQuantidade()})`;

        if (descricao.observacao) {
          linha += `\n obs: ${descricao.observacao}`;
        }

        return linha;
      })
      .join("\n");

    return `
🛎️ *Novo Pedido*
    
Olá! 
👤 Cliente: ${usuario.getNome()}
📞 Telefone: ${usuario.getTelefone()}
📍 Endereço: ${usuario.getEndereco()?.formatar()}
    
🧾 *Itens do pedido*
${itensFormatados}

💰 total: R$ ${pedido.calcularTotal().toFixed(2)}

*Formas de pagamento aceitas:*
- 💸 Pix
- 💳 Cartão de crédito
- 💳 Cartão de débito
- 💵 Dinheiro

Por favor, informe a forma de pagamento.

Obrigado(a)!
        `.trim();
  }

  static gerarLink(numero: string, mensagem: string): string {
    const texto = encodeURIComponent(mensagem.normalize("NFC"));
    return `https://api.whatsapp.com/send?phone=${numero}&text=${texto}`;
  }
}

//Serviço = integração externa
