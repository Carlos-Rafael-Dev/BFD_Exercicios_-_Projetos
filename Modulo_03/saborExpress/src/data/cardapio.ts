import { Combo } from "../domain/entities/Combo"
import { Prato } from "../domain/entities/Prato"
import { CategoriaPrato } from "../domain/enums/CategoriaPrato"
import { ComboDoDiaService } from "../services/ComboDoDiaService"

export const cardapio: Prato[] = [
    new Prato(
        "p1",
        "Salada Fit Express",
        "Leve e energizante para o dia a dia.",
        27.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        "p2",
        "Salada Mediterrânea",
        "Toque refrescante com sabor marcante.",
        29.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        "p3",
        "Salada Caesar Light",
        "Versão mais leve do clássico.",
        28.50,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        "p4",
        "Salada Veggie Power",
        "100% vegetal e rica em fibras.",
        26.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        "p5",
        "Salada Tropical",
        "Combina frutas e proteínas de forma equilibrada.",
        27.50,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        "p6",
        "Massa Integral com Frango ao Pesto",
        "Saúdavel e aromática.",
        32.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        "p7",
        "Fettucine de Abobrinha ao Molho de Tomate",
        "Baixo em carboidratos.",
        29.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        "p8",
        "Penne ao Molho de Iorgute e Ervas",
        "Cremoso, leve e suave.",
        31.50,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        "p9",
        "Tagliatelle ao Molho de Cogumelos",
        "Rico em sabor e proteínas vegetais.",
        33.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        "p10",
        "Espaguete Low Carb de Cenoura",
        "Alternativa leve e nutritiva.",
        28.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        "p11",
        "Suco Energia Verde",
        "Refrescante e revigorante.",
        12.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        "p12",
        "Suco Antioxidante Berry",
        "Ideal para imunidade.",
        14.50,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        "p13",
        "Smoothie Proteico de Banana",
        "Pós-treino leve.",
        15.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        "p14",
        "Chá Gelado de Hibisco com Limão",
        "Leve e aromático.",
        11.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        "p15",
        "Água Saborizada Express",
        "Hidratação com leveza.",
        9.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        "p16",
        "Mousse de Maracujá Fit",
        "Cremoso e equilibrado.",
        12.90,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        "p17",
        "Pudim de Chia e Frutas Vermelhas",
        "Rico em fibras.",
        13.90,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        "p18",
        "Brownie Integral de Cacau",
        "Sem lactose e leve.",
        14.50,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        "p19",
        "Creme Proteico de Amendoim",
        "Doce sem culpa.",
        13.50,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        "p20",
        "Salada de Frutas com Mel e Hortelã",
        "Refrescante e natural.",
        11.90,
        CategoriaPrato.SOBREMESAS
    ),
]

cardapio.push (
    new Combo (
        "c1",
        "Combo Dia Leve",
        "Ideal para almoço rápido e equilibrado.",
        32.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p3" || Prato.getId() === "p12")
    ),

    new Combo (
        "c2",
        "Combo Fitness",
        "Energia para quem treina.",
        45.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p6" || Prato.getId() === "p13")
    ),

    new Combo (
        "c3",
        "Combo Kids",
        "Porções suaves para crianças.",
        32.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p10" || Prato.getId() === "p12" || Prato.getId() === "p17")
    ),

    new Combo (
        "c4",
        "Combo Café da Manhã",
        "Prático para começar bem o dia.",
        27.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p13" || Prato.getId() === "p18")
    ),

    new Combo (
        "c5",
        "Combo Low Carb",
        "Foco em baixa ingestão de carboidratos.",
        48.50,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p4" || Prato.getId() === "p10" ||  Prato.getId() === "p15")
    ),

    new Combo (
        "c6",
        "Combo Sem Lactose",
        "Refeição leve sem lactose.",
        44.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p9" || Prato.getId() === "p17" ||  Prato.getId() === "p14")
    ),

    new Combo (
        "c7",
        "Combo Energia Express",
        "Refeição completa e revitalizante.",
        49.90,
        CategoriaPrato.COMBOS,
        cardapio.filter(Prato => Prato.getId() === "p9" || Prato.getId() === "p17" ||  Prato.getId() === "p14")
    ),

    ComboDoDiaService.gerar(cardapio)
)