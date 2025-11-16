// Popup de avaliação
import { CineTrack } from "../cineTrack";
import { Titulo } from "../models";
import { byId } from "../helpers";

/**
 * Inicializa o popup de avaliação.
 * @param sistema instância do CineTrack
 * @param getUsuarioSelecionado função que retorna o nome do usuário atualmente selecionado (ou null)
 * @param onAfterSave callback opcional executado depois de salvar (ex.: mostrarCatalogo)
 */
export function initPopupAvaliacao(
  sistema: CineTrack,
  getUsuarioSelecionado: () => string | null,
  onAfterSave?: () => void
) {
  const container = byId<HTMLDivElement>("popupAvaliacao");
  const popupTitulo = byId<HTMLHeadingElement>("popupTitulo");
  const popupTituloInfo = byId<HTMLDivElement>("popupTituloInfo");
  const notaInput = byId<HTMLInputElement>("notaInput");
  const btnCancelar = byId<HTMLButtonElement>("btnCancelarAvaliacao");
  const btnSalvar = byId<HTMLButtonElement>("btnSalvarAvaliacao");
  // referência ao título que está sendo avaliado
  let tituloParaAvaliar: Titulo | null = null;

  function open(titulo: Titulo) {
    tituloParaAvaliar = titulo;
    popupTitulo.textContent = "Avaliar título";
    popupTituloInfo.textContent = `${titulo.titulo} • ${titulo.genero} • ${titulo.plataforma}`;
    notaInput.value = "10";
    container.style.display = "flex";
    container.setAttribute("aria-hidden", "false");
    // foco acessível
    notaInput.focus();
  }

  function close() {
    tituloParaAvaliar = null;
    container.style.display = "none";
    container.setAttribute("aria-hidden", "true");
  }

  btnCancelar?.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });

  // fechar ao clicar no backdrop
  const backdrop = byId<HTMLDivElement>("popupAvaliacao__backdrop");
  backdrop?.addEventListener("click", () => close());

  btnSalvar?.addEventListener("click", (e) => {
    e.preventDefault();
    const usuario = getUsuarioSelecionado();
    if (!usuario) {
      alert("Selecione um usuário antes de avaliar.");
      return;
    }
    if (!tituloParaAvaliar) {
      alert("Título inválido.");
      return;
    }

    const raw = Number(notaInput.value);
    if (!Number.isFinite(raw) || raw < 1 || raw > 10) {
      alert("Informe uma nota entre 1 e 10.");
      return;
    }
    const nota = Math.round(raw);

    // salva/atualiza o registro no sistema (status Concluído por padrão ao avaliar)
    sistema.atualizarRegistro(usuario, tituloParaAvaliar.id, "Concluído", nota);

    // callback para re-renderizar catálogo/UI
    if (onAfterSave) onAfterSave();

    close();
  });

  return {
    open
  };
}
