// integrar a interface
import { CineTrack } from "./cineTrack";
import { seedUsuarios, seedCatalogo } from "./seeds";
import { mostrarCatalogo } from "./UI/mostrarCatalogo";
import { initPopupAvaliacao } from "./UI/popupAvaliacao";

const sistema = new CineTrack();
sistema.loadFromStorage();

seedUsuarios(sistema);
seedCatalogo(sistema);

// exemplo de estado:
let usuarioSelecionado: string | null = null;

// inicializa popup
const popup = initPopupAvaliacao(
  sistema,
  () => usuarioSelecionado,
  () => mostrarCatalogo(sistema, usuarioSelecionado, popup.open)
);

// sempre que trocar usuário:
function setUsuarioSelecionado(nome: string) {
  usuarioSelecionado = nome;
  mostrarCatalogo(sistema, usuarioSelecionado, popup.open);
}