import { Combo } from "../domain/entities/Combo"
import { Prato } from "../domain/entities/Prato"
import { CategoriaPrato } from "../domain/enums/CategoriaPrato"
import { ComboDoDiaService } from "../services/ComboDoDiaService"
import { INGREDIENTES_BASE } from "./listaDeIngredientes"

import saladaFitImg from '../assets/saladas/express.jpg'
import saladaMediterraneaImg from '../assets/saladas/mediterranea.jpg'
import saladaCaesarImg from '../assets/saladas/caesar.jpg'
import saladaVeggiePowerImg from '../assets/saladas/veggie.jpg'
import saladaTropicalImg from '../assets/saladas/tropical.webp'

import massaIntegralImg from '../assets/massas/integral.jpg'
import massaFettucineImg from '../assets/massas/fettuccine.jpg'
import massaPenneImg from '../assets/massas/penne.jpg'
import massaTagliatelleImg from '../assets/massas/Tagliatelle.jpg'
import massaEspagueteLowCarbImg from '../assets/massas/lowcarb.jpg'

import sucoEnergiaVerdeImg from '../assets/sucos/verde.jpg'
import sucoAntioxidanteBerryImg from '../assets/sucos/berry.jpg'
import sucoSmoothieBananaImg from '../assets/sucos/smoothie.jpg'
import sucoChaGeladoHibiscoImg from '../assets/sucos/tea-hibisco.jpg'
import sucoAguaSaborizadaImg from '../assets/sucos/agua-saborizada.jpg'

import sobremessaMouseImg from '../assets/sobremessas/mouse-maracuja.jpg'
import sobremessaPudimImg from '../assets/sobremessas/pudim-chia.jpg'
import sobremessaBrownieImg from '../assets/sobremessas/brownie.jpg'
import sobremessaCremeAmendoimImg from '../assets/sobremessas/creme-amendoim.jpg'
import sobremessaSaladaFrutasImg from '../assets/sobremessas/salada-frutas.jpg'
import { Ingrediente } from "../domain/valueObjects/Ingrediente"


export const cardapio: Prato[] = [
    new Prato(
        "p1",
        saladaFitImg,
        "Salada Fit Express",
        "Leve e energizante para o dia a dia.",
        27.90,
        CategoriaPrato.SALADAS,
        [
            INGREDIENTES_BASE.frangoGrelhado,
            INGREDIENTES_BASE.ovosCozido,
            INGREDIENTES_BASE.tomateCereja,
            INGREDIENTES_BASE.queijoFeta
        ]
    ),

    new Prato (
        "p2",
        saladaMediterraneaImg,
        "Salada Mediterrânea",
        "Toque refrescante com sabor marcante.",
        29.90,
        CategoriaPrato.SALADAS,
        [
            INGREDIENTES_BASE.azeiteOliva,
            INGREDIENTES_BASE.alface,
            INGREDIENTES_BASE.azeitona
        ]
    ),

    new Prato (
        "p3",
        saladaCaesarImg,
        "Salada Caesar Light",
        "Versão mais leve do clássico.",
        28.50,
        CategoriaPrato.SALADAS,
        [
            INGREDIENTES_BASE.molhoCaesar,
            INGREDIENTES_BASE.frangoGrelhado,
            INGREDIENTES_BASE.alfaceAmericana
        ]
    ),

    new Prato (
        "p4",
        saladaVeggiePowerImg,
        "Salada Veggie Power",
        "100% vegetal e rica em fibras.",
        26.90,
        CategoriaPrato.SALADAS,
        [
            INGREDIENTES_BASE.abobrinha,
            INGREDIENTES_BASE.tomateCereja,
            INGREDIENTES_BASE.alfaceAmericana,
            INGREDIENTES_BASE.couve
        ]
    ),

    new Prato (
        "p5",
        saladaTropicalImg,
        "Salada Tropical",
        "Combina frutas e proteínas de forma equilibrada.",
        27.50,
        CategoriaPrato.SALADAS,
        [
            INGREDIENTES_BASE.abacate,
            INGREDIENTES_BASE.manga,
            INGREDIENTES_BASE.peitoDePeru
        ]
    ),

    new Prato (
        "p6",
        massaIntegralImg,
        "Massa Integral com Frango ao Pesto",
        "Saúdavel e aromática.",
        32.90,
        CategoriaPrato.MASSAS,
        [
            INGREDIENTES_BASE.massaIntegral,
            INGREDIENTES_BASE.frangoGrelhado,
            INGREDIENTES_BASE.molhoPesto
        ]
    ),

    new Prato (
        "p7",
        massaFettucineImg,
        "Fettucine de Abobrinha ao Molho de Tomate",
        "Baixo em carboidratos.",
        29.90,
        CategoriaPrato.MASSAS,
        [
            INGREDIENTES_BASE.massaIntegral,
            INGREDIENTES_BASE.molhoDeTomate,
            INGREDIENTES_BASE.abobrinha
        ]
    ),

    new Prato (
        "p8",
        massaPenneImg,
        "Penne ao Molho de Iorgute e Ervas",
        "Cremoso, leve e suave.",
        31.50,
        CategoriaPrato.MASSAS,
        [
            INGREDIENTES_BASE.penneIntegral,
            INGREDIENTES_BASE.molhoDeIogurte
        ]
    ),

    new Prato (
        "p9",
        massaTagliatelleImg,
        "Tagliatelle ao Molho de Cogumelos",
        "Rico em sabor e proteínas vegetais.",
        33.90,
        CategoriaPrato.MASSAS,
        [
            INGREDIENTES_BASE.tagliatelle,
            INGREDIENTES_BASE.cogumelo
        ]
    ),

    new Prato (
        "p10",
        massaEspagueteLowCarbImg,
        "Espaguete Low Carb de Cenoura",
        "Alternativa leve e nutritiva.",
        28.90,
        CategoriaPrato.MASSAS,
        [
            INGREDIENTES_BASE.massaIntegral,
            INGREDIENTES_BASE.cenouraRalada
        ]
    ),

    new Prato (
        "p11",
        sucoEnergiaVerdeImg,
        "Suco Energia Verde",
        "Refrescante e revigorante.",
        12.90,
        CategoriaPrato.BEBIDAS,
        [
            INGREDIENTES_BASE.couve,
            INGREDIENTES_BASE.limao,
            INGREDIENTES_BASE.agua
        ]
    ),

    new Prato (
        "p12",
        sucoAntioxidanteBerryImg,
        "Suco Antioxidante Berry",
        "Ideal para imunidade.",
        14.50,
        CategoriaPrato.BEBIDAS,
        [
            INGREDIENTES_BASE.frutasVermelhas,
            INGREDIENTES_BASE.agua
        ]
    ),

    new Prato (
        "p13",
        sucoSmoothieBananaImg,
        "Smoothie Proteico de Banana",
        "Pós-treino leve.",
        15.90,
        CategoriaPrato.BEBIDAS,
        [
            INGREDIENTES_BASE.whey,
            INGREDIENTES_BASE.banana,
            INGREDIENTES_BASE.agua
        ]
    ),

    new Prato (
        "p14",
        sucoChaGeladoHibiscoImg,
        "Chá Gelado de Hibisco com Limão",
        "Leve e aromático.",
        11.90,
        CategoriaPrato.BEBIDAS,
        [
            INGREDIENTES_BASE.hibisco,
            INGREDIENTES_BASE.limao,
            INGREDIENTES_BASE.agua
        ]
    ),

    new Prato (
        "p15",
        sucoAguaSaborizadaImg,
        "Água Saborizada Express",
        "Hidratação com leveza.",
        9.90,
        CategoriaPrato.BEBIDAS,
        [
            INGREDIENTES_BASE.agua,
            INGREDIENTES_BASE.limao,
            INGREDIENTES_BASE.hortela
        ]
    ),

    new Prato (
        "p16",
        sobremessaMouseImg,
        "Mousse de Maracujá Fit",
        "Cremoso e equilibrado.",
        12.90,
        CategoriaPrato.SOBREMESAS,
        [
            INGREDIENTES_BASE.maracuja,
        ]
    ),

    new Prato (
        "p17",
        sobremessaPudimImg,
        "Pudim de Chia e Frutas Vermelhas",
        "Rico em fibras.",
        13.90,
        CategoriaPrato.SOBREMESAS,
        [
            INGREDIENTES_BASE.chia,
            INGREDIENTES_BASE.frutasVermelhas
        ]
    ),

    new Prato (
        "p18",
        sobremessaBrownieImg,
        "Brownie Integral de Cacau",
        "Sem lactose e leve.",
        14.50,
        CategoriaPrato.SOBREMESAS,
        [
            INGREDIENTES_BASE.cacau
        ]
    ),

    new Prato (
        "p19",
        sobremessaCremeAmendoimImg,
        "Creme Proteico de Amendoim",
        "Doce sem culpa.",
        13.50,
        CategoriaPrato.SOBREMESAS,
        [
            INGREDIENTES_BASE.amendoim,
            INGREDIENTES_BASE.whey
        ]
    ),

    new Prato (
        "p20",
        sobremessaSaladaFrutasImg,
        "Salada de Frutas com Mel e Hortelã",
        "Refrescante e natural.",
        11.90,
        CategoriaPrato.SOBREMESAS,
        [
            INGREDIENTES_BASE.abacate,
            INGREDIENTES_BASE.banana,
            INGREDIENTES_BASE.maca,
            INGREDIENTES_BASE.manga,
            INGREDIENTES_BASE.hortela,
            INGREDIENTES_BASE.mel
        ]
    ),
]

cardapio.push (
    new Combo (
        "c1",
        massaIntegralImg,
        "Combo Dia Leve",
        "Ideal para almoço rápido e equilibrado.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p3" || Prato.getId() === "p12")
    ),

    new Combo (
        "c2",
        saladaFitImg,
        "Combo Fitness",
        "Energia para quem treina.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p6" || Prato.getId() === "p13")
    ),

    new Combo (
        "c3",
        massaPenneImg,
        "Combo Kids",
        "Porções suaves para crianças.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p10" || Prato.getId() === "p12" || Prato.getId() === "p17")
    ),

    new Combo (
        "c4",
        sucoSmoothieBananaImg,
        "Combo Café da Manhã",
        "Prático para começar bem o dia.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p13" || Prato.getId() === "p18")
    ),

    new Combo (
        "c5",
        massaEspagueteLowCarbImg,
        "Combo Low Carb",
        "Foco em baixa ingestão de carboidratos.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p4" || Prato.getId() === "p10" ||  Prato.getId() === "p15")
    ),

    new Combo (
        "c6",
        sobremessaBrownieImg,
        "Combo Sem Lactose",
        "Refeição leve sem lactose.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p9" || Prato.getId() === "p17" ||  Prato.getId() === "p14")
    ),

    new Combo (
        "c7",
        sucoEnergiaVerdeImg,
        "Combo Energia Express",
        "Refeição completa e revitalizante.",
        CategoriaPrato.COMBOS,
        [],
        cardapio.filter(Prato => Prato.getId() === "p9" || Prato.getId() === "p17" ||  Prato.getId() === "p14")
    ),

    ComboDoDiaService.gerar(cardapio)
)