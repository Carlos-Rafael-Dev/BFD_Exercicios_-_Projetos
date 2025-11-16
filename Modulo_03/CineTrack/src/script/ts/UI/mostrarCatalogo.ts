// Mostrar catalogo
import { CineTrack } from "../cineTrack";
import { Titulo } from "../models";
import { byId } from "../helpers";

/**
 * Renderiza o catálogo agrupado por gênero.
 * Atualiza cards, notas, favoritos e eventos.
 */
export function mostrarCatalogo(
  sistema: CineTrack,
  usuarioSelecionado: string | null,
  openPopupAvaliacao: (titulo: Titulo) => void
) {
  const catalogoDiv = byId<HTMLDivElement>("catalogo");
  if (!catalogoDiv) return;

  catalogoDiv.innerHTML = "";

  // --- Agrupa títulos por gênero ---
  const agrupado: Record<string, Titulo[]> = {};
  sistema.catalogo.forEach((t) => {
    if (!agrupado[t.genero]) agrupado[t.genero] = [];
    agrupado[t.genero].push(t);
  });

  // Gêneros em ordem alfabética
  const generosOrdenados = Object.keys(agrupado).sort();

  generosOrdenados.forEach((genero) => {
    // Título da seção
    const h2 = document.createElement("h2");
    h2.textContent = genero;
    h2.style.margin = "20px 0 10px";
    catalogoDiv.appendChild(h2);

    // container de grid
    const grid = document.createElement("div");
    grid.className = "gridGenero";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(180px, 1fr))";
    grid.style.gap = "14px";

    agrupado[genero].forEach((t) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.background = "#1b1b1b";
      card.style.padding = "10px";
      card.style.borderRadius = "10px";
      card.style.color = "#fff";

      const ano = t.anoLancamento ? ` • ${t.anoLancamento}` : "";

      // imagem
      const capa = t.imagemBase64
        ? `<img src="${t.imagemBase64}" alt="${t.titulo}" style="width:100%;border-radius:8px;height:140px;object-fit:cover;margin-bottom:8px;">`
        : `<div style="width:100%;height:140px;background:#333;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#777;">
            Sem imagem
           </div>`;

      // nota do usuário
      let avaliacaoUsuario = "";
      if (usuarioSelecionado) {
        const reg = sistema.registros.find(
          (r) => r.usuarioNome === usuarioSelecionado && r.tituloId === t.id
        );
        if (reg?.avaliacao) {
          avaliacaoUsuario = `Nota de ${usuarioSelecionado}: ⭐ ${reg.avaliacao}/10`;
        }
      }

      // média geral
      const media = sistema.getMediaAvaliacoes(t.id);
      const mediaHtml =
        media !== null
          ? `<div style="color:#4fc3f7;margin-top:4px;">Média: ⭐ ${media.toFixed(
              1
            )}/10</div>`
          : "";

      card.innerHTML = `
        ${capa}
        <strong>${t.titulo}</strong>${ano}<br>
        <span style="color:#ccc">${t.genero} • ${t.plataforma}</span><br>
        <span style="color:#ccc">${t.tipo}</span>

        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          <button class="favBtn" data-id="${t.id}">Favoritar</button>
          <button class="verBtn" data-id="${t.id}">Assistindo</button>
          <button class="rateBtn" data-id="${t.id}">Avaliar</button>
        </div>

        <div id="nota_${t.id}" style="margin-top:6px;color:#ffd700;">
          ${avaliacaoUsuario}
        </div>

        ${mediaHtml}
      `;

      grid.appendChild(card);
    });

    catalogoDiv.appendChild(grid);
  });

  // ======== EVENTOS ========

  // botão Avaliar (popup)
  catalogoDiv.querySelectorAll(".rateBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!usuarioSelecionado) return alert("Selecione um usuário.");
      const id = (btn as HTMLButtonElement).dataset.id!;
      const titulo = sistema.buscarTituloPorId(id);
      if (titulo) openPopupAvaliacao(titulo);
    });
  });

  // favoritar
  catalogoDiv.querySelectorAll(".favBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!usuarioSelecionado) return alert("Selecione um usuário.");
      const id = (btn as HTMLButtonElement).dataset.id!;
      sistema.favoritarTitulo(usuarioSelecionado, id);
      alert("Favorito adicionado!");
    });
  });

  // marcar como assistindo
  catalogoDiv.querySelectorAll(".verBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!usuarioSelecionado) return alert("Selecione um usuário.");
      const id = (btn as HTMLButtonElement).dataset.id!;
      sistema.atualizarRegistro(usuarioSelecionado, id, "Assistindo");
      alert("Marcado como assistindo.");
    });
  });
}
