import { CategoriaPrato } from "../../domain/enums/CategoriaPrato";

import saladas from "../../assets/categorias/saladas.png";
import saladasAtivo from "../../assets/categorias/saladas-ativo.png";
import massas from "../../assets/categorias/massas.png";
import massasAtivo from "../../assets/categorias/massas-ativo.png";
import bebidas from "../../assets/categorias/bebidas.png";
import bebidasAtivo from "../../assets/categorias/bebidas-ativo.png";
import sobremessas from "../../assets/categorias/sobremessas.png";
import sobremessasAtivo from "../../assets/categorias/sobremessas-ativo.png";
import combos from "../../assets/categorias/combos.png";
import combosAtivo from "../../assets/categorias/combos-ativo.png";

type Props = {
  categoriaAtiva: CategoriaPrato;
  onSelecionar: (categoria: CategoriaPrato) => void;
};

const iconesCategoria = {
  [CategoriaPrato.SALADAS]: {
    normal: saladas,
    ativo: saladasAtivo,
  },

  [CategoriaPrato.MASSAS]: {
    normal: massas,
    ativo: massasAtivo,
  },

  [CategoriaPrato.BEBIDAS]: {
    normal: bebidas,
    ativo: bebidasAtivo,
  },

  [CategoriaPrato.SOBREMESAS]: {
    normal: sobremessas,
    ativo: sobremessasAtivo,
  },

  [CategoriaPrato.COMBOS]: {
    normal: combos,
    ativo: combosAtivo,
  },
};

export default function CategoryFilter({
  categoriaAtiva,
  onSelecionar,
}: Props) {
  return (
    <div className="category-filter">
      {Object.values(CategoriaPrato).map((categoria) => {
        const ativo = categoriaAtiva === categoria;

        return (
          <div
            className="category-card"
            key={categoria}
            onClick={() => onSelecionar(categoria)}
          >
            <img
              src={
                ativo
                  ? iconesCategoria[categoria].ativo
                  : iconesCategoria[categoria].normal
              } alt={categoria}
            />

            <button className={ativo ? "ativo" : ""}>{categoria}</button>
          </div>
        );
      })}
    </div>
  );
}
