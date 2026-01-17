import { Combo } from "../domain/entities/Combo";
import { Prato } from "../domain/entities/Prato";
import { CategoriaPrato } from "../domain/enums/CategoriaPrato";
import comboDiaImg from "../assets/combos/combo-dia.jpeg";

export class ComboDoDiaService {
    static gerar(pratosDisponiveis: Prato[]): Combo {
  
      const principais = pratosDisponiveis.filter(
        p => p.getCategoria() === CategoriaPrato.MASSAS
      );
  
      const bebidas = pratosDisponiveis.filter(
        p => p.getCategoria() === CategoriaPrato.BEBIDAS
      );
  
      if (!principais.length || !bebidas.length) {
        throw new Error("É necessário ao menos uma massa e uma bebida.");
      }
  
      const hoje = new Date().toISOString().split("T")[0];
  
      const seedMassa = this.hash(`${hoje}-massa`);
      const seedBebida = this.hash(`${hoje}-bebida`);
  
      const massa = this.sortear(principais, seedMassa);
      const bebida = this.sortear(bebidas, seedBebida);
  
      return new Combo(
        `combo-${hoje}`,
        comboDiaImg,
        "Combo do Dia",
        "Combo especial sorteado automaticamente.",
        CategoriaPrato.COMBOS,
        [],
        [massa, bebida],
        0.1 // 10% de desconto
      );
    }
  
    // ---------- helpers -----------------
  
    private static sortear(pratos: Prato[], seed: number): Prato {
      let random = this.pseudoRandom(seed);
      const index = Math.abs(random) % pratos.length;
      return pratos[index];
    }
  
    private static pseudoRandom(seed: number): number {
      return (seed * 9301 + 49297) % 233280;
    }
  
    private static hash(valor: string): number {
      let hash = 0;
      for (let i = 0; i < valor.length; i++) {
        hash = (hash << 5) - hash + valor.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    }
  }
  