/* ================= SALADAS ================= */
import { Ingrediente } from "../domain/valueObjects/Ingrediente";

import alfaceImg from "../assets/ingredientes/alface.png"
import tomateCerejaImg from "../assets/ingredientes/tomate-cereja.png"
import frangoGrelhadoImg from "../assets/ingredientes/frango-grelhado.png"
import pepinoImg from "../assets/ingredientes/pepino.png"
import azeitonaImg from "../assets/ingredientes/azeitona.webp"
import queijoFetaImg from "../assets/ingredientes/queijo-feta.png"
import alfaceAmericana from "../assets/ingredientes/alface-americana.png"
import molhoCaesarImg from "../assets/ingredientes/molho-caesar.png"
import graoDeBicoImg from "../assets/ingredientes/grao-de-bico.png"
import cenouraRaladaImg from "../assets/ingredientes/cenoura-ralada.png"
import abacateImg from "../assets/ingredientes/abacate.png"
import mangaImg from "../assets/ingredientes/manga.png"
import peitoDePeruImg from "../assets/ingredientes/peito-de-peru.png"
import massaIntegralImg from "../assets/ingredientes/massa-integral.png"
import molhoPestoImg from "../assets/ingredientes/molho-pesto.png"
import abobrinhaImg from "../assets/ingredientes/abobrinha.png"
import molhoDeTomateImg from "../assets/ingredientes/molho-de-tomate.png"
import penneIntegralImg from "../assets/ingredientes/penne-integral.png"
import molhoIogurteImg from "../assets/ingredientes/molho-iogurte.png"
import tagliatelleImg from "../assets/ingredientes/tagliatelle.png"
import cogumeloImg from "../assets/ingredientes/cogumelo.png"
import molhoLeveImg from "../assets/ingredientes/molho-branco.png"
import couveImg from "../assets/ingredientes/couve.png"
import macaImg from "../assets/ingredientes/maca.png"
import frutasVermelhasImg from "../assets/ingredientes/frutas-vermelhas.png"
import bananaImg from "../assets/ingredientes/banana.png"
import wheyImg from "../assets/ingredientes/whey.png"
import hibiscoImg from "../assets/ingredientes/hibisco.png"
import limaoImg from "../assets/ingredientes/limao.png"
import aguaImg from "../assets/ingredientes/agua.png"
import hortelaImg from "../assets/ingredientes/hortela.png"
import maracujaImg from "../assets/ingredientes/maracuja.png"
import chiaImg from "../assets/ingredientes/chia.png"
import cacauImg from "../assets/ingredientes/cacau.png"
import amendoimImg from "../assets/ingredientes/amendoim.png"
import melImg from "../assets/ingredientes/mel.png"
import ovoCozidoImg from "../assets/ingredientes/ovos-cozido.png"
import queijoParmesaoImg from "../assets/ingredientes/queijo-parmesao.png"
import croutonsIntegralImg from "../assets/ingredientes/croutons-integral.png"
import sementeDeAboboraImg from "../assets/ingredientes/semente-abobora.png"
import sementeDeGirassolImg from "../assets/ingredientes/semente-girassol.png"
import castanhaImg from "../assets/ingredientes/castanha.png"
import molhoMostardaImg from "../assets/ingredientes/molho-mostarda.png"
import azeiteOlivaImg from "../assets/ingredientes/azeite.png"
import tofuGrelhadoImg from "../assets/ingredientes/tofu-grelhado.png"
import nozesImg from "../assets/ingredientes/nozes.png"

export const INGREDIENTES_BASE = {
  alface: new Ingrediente(
    "i1",
    "Alface",
    "80g",
    12,
    alfaceImg,
    false,
    true
  ),

  tomateCereja: new Ingrediente(
    "i2",
    "Tomate Cereja",
    "60g",
    18,
    tomateCerejaImg,
    false,
    true
  ),

  frangoGrelhado: new Ingrediente(
    "i3",
    "Frango Grelhado",
    "100g",
    165,
    frangoGrelhadoImg,
    true,
    true
  ),

  pepino: new Ingrediente(
    "i4",
    "Pepino",
    "70g",
    12,
    pepinoImg,
    false,
    true
  ),

  azeitona: new Ingrediente(
    "i5",
    "Azeitona",
    "30g",
    45,
    azeitonaImg,
    false,
    true
  ),

  queijoFeta: new Ingrediente(
    "i6",
    "Queijo Feta",
    "50g",
    132,
    queijoFetaImg,
    false,
    true
  ),

  alfaceAmericana: new Ingrediente(
    "i7",
    "Alface Americana",
    "90g",
    14,
    alfaceAmericana,
    false,
    true
  ),

  molhoCaesar: new Ingrediente(
    "i9",
    "Molho Caesar Light",
    "30ml",
    60,
    molhoCaesarImg,
    false,
    true
  ),

  graoDeBico: new Ingrediente(
    "i10",
    "Grão-de-bico",
    "100g",
    164,
    graoDeBicoImg,
    false,
    true
  ),

  cenouraRalada: new Ingrediente(
    "i11",
    "Cenoura Ralada",
    "50g",
    21,
    cenouraRaladaImg,
    false,
    true
  ),

  abacate: new Ingrediente(
    "i12",
    "Abacate",
    "60g",
    96,
    abacateImg,
    false,
    true
  ),

  manga: new Ingrediente(
    "i13",
    "Manga",
    "70g",
    42,
    mangaImg,
    false,
    true
  ),

  peitoDePeru: new Ingrediente(
    "i15",
    "Peito de Peru",
    "90g",
    120,
    peitoDePeruImg,
    false,
    true
  ),

  massaIntegral: new Ingrediente(
    "i16",
    "Massa Integral",
    "120g",
    174,
    massaIntegralImg,
    true,
    true
  ),

  molhoPesto: new Ingrediente(
    "i18",
    "Molho Pesto",
    "30g",
    90,
    molhoPestoImg,
    false,
    true
  ),

  abobrinha: new Ingrediente(
    "i19",
    "Abobrinha",
    "150g",
    25,
    abobrinhaImg,
    false,
    true
  ),

  molhoDeTomate: new Ingrediente(
    "i20",
    "Molho de Tomate",
    "80g",
    40,
    molhoDeTomateImg,
    true,
    true
  ),

  penneIntegral: new Ingrediente(
    "i21",
    "Penne Integral",
    "120g",
    180,
    penneIntegralImg,
    true,
    true
  ),

  molhoDeIogurte: new Ingrediente(
    "i22",
    "Molho de Iogurte",
    "60g",
    55,
    molhoIogurteImg,
    false,
    true
  ),

  tagliatelle: new Ingrediente(
    "i23",
    "Tagliatelle",
    "130g",
    190,
    tagliatelleImg,
    true,
    true
  ),

  cogumelo: new Ingrediente(
    "i24",
    "Cogumelos",
    "100g",
    22,
    cogumeloImg,
    false,
    true
  ),

  molhoBranco: new Ingrediente(
    "i26",
    "Molho Leve",
    "50g",
    45,
    molhoLeveImg,
    false,
    true
  ),

  couve: new Ingrediente(
    "i27",
    "Couve",
    "40g",
    10,
    couveImg,
    false,
    true
  ),

  maca: new Ingrediente(
    "i28",
    "Maçã",
    "100g",
    52,
    macaImg,
    false,
    true
  ),

  frutasVermelhas: new Ingrediente(
    "i29",
    "Frutas Vermelhas",
    "120g",
    55,
    frutasVermelhasImg,
    true,
    true
  ),

  banana: new Ingrediente(
    "i30",
    "Banana",
    "120g",
    105,
    bananaImg,
    false,
    true
  ),

  whey: new Ingrediente(
    "i31",
    "Whey Protein",
    "30g",
    120,
    wheyImg,
    false,
    true
  ),

  hibisco: new Ingrediente(
    "i32",
    "Hibisco",
    "10g",
    5,
    hibiscoImg,
    true,
    true
  ),

  limao: new Ingrediente(
    "i33",
    "Limão",
    "30g",
    9,
    limaoImg,
    false,
    true
  ),

  agua: new Ingrediente(
    "i34",
    "Água",
    "300ml",
    0,
    aguaImg,
    true,
    true
  ),

  hortela: new Ingrediente(
    "i35",
    "Hortelã",
    "5g",
    2,
    hortelaImg,
    false,
    true
  ),

  maracuja: new Ingrediente(
    "i36",
    "Maracujá",
    "100g",
    68,
    maracujaImg,
    false,
    true
  ),

  chia: new Ingrediente(
    "i37",
    "Chia",
    "30g",
    146,
    chiaImg,
    true,
    true
  ),

  cacau: new Ingrediente(
    "i39",
    "Cacau",
    "40g",
    90,
    cacauImg,
    true,
    true
  ),

  amendoim: new Ingrediente(
    "i40",
    "Amendoim",
    "80g",
    470,
    amendoimImg,
    true,
    true
  ),

  mel: new Ingrediente(
    "i42",
    "Mel",
    "20g",
    64,
    melImg,
    false,
    true
  ),

  ovosCozido: new Ingrediente(
    "e1",
    "Ovo Cozido",
    "1 unidade",
    78,
    ovoCozidoImg,
    false,
    true
  ),

  queijoParmesao: new Ingrediente(
    "e2",
    "Queijo Parmesão",
    "20g",
    86,
    queijoParmesaoImg,
    false,
    true
  ),

  croutonsIntegral: new Ingrediente(
    "e3",
    "Croutons Integrais",
    "30g",
    120,
    croutonsIntegralImg,
    false,
    true
  ),

  sementeDeAbobora: new Ingrediente(
    "e4",
    "Sementes de Abóbora",
    "20g",
    110,
    sementeDeAboboraImg,
    false,
    true
  ),

  sementeDeGirassol: new Ingrediente(
    "e5",
    "Sementes de Girassol",
    "20g",
    118,
    sementeDeGirassolImg,
    false,
    true
  ),

  castanha: new Ingrediente(
    "e6",
    "Castanha de Caju",
    "25g",
    138,
    castanhaImg,
    false,
    true
  ),

  nozes: new Ingrediente(
    "e7",
    "Nozes",
    "20g",
    130,
    nozesImg,
    false,
    true
  ),

  molhoMostarda: new Ingrediente(
    "e8",
    "Molho Mostarda e Mel",
    "30ml",
    70,
    molhoMostardaImg,
    false,
    true
  ),

  azeiteOliva: new Ingrediente(
    "e10",
    "Azeite de Oliva Extra Virgem",
    "10ml",
    90,
    azeiteOlivaImg,
    false,
    true
  ),

  tofuGrelhado: new Ingrediente(
    "e12",
    "Tofu Grelhado",
    "80g",
    76,
    tofuGrelhadoImg,
    false,
    true
  ),
};
