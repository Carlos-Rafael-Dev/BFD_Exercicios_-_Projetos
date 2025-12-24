import { Prato } from "../domain/entities/Prato"
import { CategoriaPrato } from "../domain/enums/CategoriaPrato"

export const cardapio: Prato[] = [
    new Prato(
        1,
        "Salada Fit Express",
        "Leve e energizante para o dia a dia.",
        27.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        2,
        "Salada Mediterrânea",
        "Toque refrescante com sabor marcante.",
        29.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        3,
        "Salada Caesar Light",
        "Versão mais leve do clássico.",
        28.50,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        4,
        "Salada Veggie Power",
        "100% vegetal e rica em fibras.",
        26.90,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        5,
        "Salada Tropical",
        "Combina frutas e proteínas de forma equilibrada.",
        27.50,
        CategoriaPrato.SALADAS
    ),

    new Prato (
        6,
        "Massa Integral com Frango ao Pesto",
        "Saúdavel e aromática.",
        32.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        7,
        "Fettucine de Abobrinha ao Molho de Tomate",
        "Baixo em carboidratos.",
        29.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        8,
        "Penne ao Molho de Iorgute e Ervas",
        "Cremoso, leve e suave.",
        31.50,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        9,
        "Tagliatelle ao Molho de Cogumelos",
        "Rico em sabor e proteínas vegetais.",
        33.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        10,
        "Espaguete Low Carb de Cenoura",
        "Alternativa leve e nutritiva.",
        28.90,
        CategoriaPrato.MASSAS
    ),

    new Prato (
        11,
        "Suco Energia Verde",
        "Refrescante e revigorante.",
        12.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        12,
        "Suco Antioxidante Berry",
        "Ideal para imunidade.",
        14.50,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        13,
        "Smoothie Proteico de Banana",
        "Pós-treino leve.",
        15.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        14,
        "Chá Gelado de Hibisco com Limão",
        "Leve e aromático.",
        11.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        15,
        "Água Saborizada Express",
        "Hidratação com leveza.",
        9.90,
        CategoriaPrato.BEBIDAS
    ),

    new Prato (
        16,
        "Mousse de Maracujá Fit",
        "Cremoso e equilibrado.",
        12.90,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        17,
        "Pudim de Chia e Frutas Vermelhas",
        "Rico em fibras.",
        13.90,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        18,
        "Brownie Integral de Cacau",
        "Sem lactose e leve.",
        14.50,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        19,
        "Creme Proteico de Amendoim",
        "Doce sem culpa.",
        13.50,
        CategoriaPrato.SOBREMESAS
    ),

    new Prato (
        20,
        "Salada de Frutas com Mel e Hortelã",
        "Refrescante e natural.",
        11.90,
        CategoriaPrato.SOBREMESAS
    )
]