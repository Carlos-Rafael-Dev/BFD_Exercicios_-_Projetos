import { Combo } from "../domain/entities/Combo";
import { ComboDoDiaService } from "../services/ComboDoDiaService";
import { cardapio } from "./Cardapio";

export const combos: Combo[] = [
    new Combo(
        1,
        "Combo Dia Leve",
        "Ideal para almoço rápido e equilibrado.",
        [
            cardapio[2],
            cardapio[11],
        ],
        55
    ),

    new Combo(
        2,
        "Combo Fitness",
        "Energia para quem treina.",
        [
            cardapio[5],
            cardapio[12],
        ],
        45.90
    ),

    new Combo(
        3,
        "Combo Kids",
        "Porções suaves para crianças.",
        [
            cardapio[9],
            cardapio[10],
            cardapio[16],
        ],
        32.90
    ),

    new Combo(
        4,
        "Combo Café da Manhã",
        "Prático para começar bem o dia.",
        [
            cardapio[12],
            cardapio[17],
        ],
        27.90
    ),

    new Combo(
        5,
        "Combo Low Carb",
        "Foco em baixa ingestão de carboidratos.",
        [
            cardapio[3],
            cardapio[6],
            cardapio[14],
        ],
        48.50
    ),

    new Combo (
        6,
        "Combo Sem Lactose",
        "Refeição leve sem lactose.",
        [
            cardapio[8],
            cardapio[16],
            cardapio[13],
        ],
        44.90
    ),

    new Combo (
        7,
        "Combo Energia Express",
        "Refeição completa e revitalizante.",
        [
            cardapio[7],
            cardapio[18],
            cardapio[10],
        ],
        49.90
    ),

    ComboDoDiaService.gerar(cardapio),

];