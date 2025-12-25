import { Combo } from "../domain/entities/Combo";
import { Prato } from "../domain/entities/Prato";
import { CategoriaPrato } from "../domain/enums/CategoriaPrato";

export class ComboDoDiaService {
    static gerar(pratosDisponiveis: Prato[]): Combo {

        const principais = pratosDisponiveis.filter(
            p => p.getCategoria() === CategoriaPrato.MASSAS
        );

        const bebidas = pratosDisponiveis.filter(
            p => p.getCategoria() === CategoriaPrato.BEBIDAS
        );

        if (principais.length === 0 || bebidas.length === 0) {
            throw new Error("É necessário ao menos uma massa e uma bebida para criar um combo.");
        }

        const hoje = new Date().toISOString().split("T")[0];
        const seedNumber = this.hash(hoje);
        const seed = `c${seedNumber}`;

        const massa = this.sortearPratos(principais, seedNumber, 1)[0];
        const bebida = this.sortearPratos(bebidas, seedNumber + 1, 1)[0];

        const pratosSorteados = [massa, bebida];

        const precoOriginal = pratosSorteados.reduce(
            (total, prato) => total + prato.getPreco(),
            0
        );

        const precoCombo = Number((precoOriginal * 0.9).toFixed(2));

        return new Combo(
            seed,
            "Combo do Dia",
            "Combo especial sorteado automaticamente.",
            precoCombo,
            CategoriaPrato.COMBOS,
            pratosSorteados,
        );
    }

    // ---------- private helpers --------------

    private static sortearPratos (
        pratos: Prato[],
        seed: number,
        quantidade: number,
    ): Prato[] {
        const copia = [...pratos];
        const resultado: Prato[] = [];

        let random = seed;

        for (let i = 0; i < quantidade; i++) {
            random = this.pseudoRandom(random);
            const index = random % copia.length;
            resultado.push(copia.splice(index, 1)[0]);
        }
        return resultado;
    }

    private static pseudoRandom (seed: number): number {
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