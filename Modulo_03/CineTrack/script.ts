// script.ts

// ---------- Tipos / Enums ----------
type Genero = "Ação" | "Comédia" | "Drama" | "Ficção" | "Terror" | "Romance";
type Plataforma = "Netflix" | "Prime Video" | "Disney+" | "HBO Max";
type Tipo = "Filme" | "Série";
type Status = "Quero ver" | "Assistindo" | "Concluído";

// ---------- Modelos ----------
class Titulo {
  constructor(
    public id: string,
    public titulo: string,
    public genero: Genero,
    public plataforma: Plataforma,
    public tipo: Tipo,
    public anoLancamento?: number,
    public imagemBase64?: string
  ) {}
}

class Filme extends Titulo {
  // possíveis atributos no futuro (diretor, duração etc.)
  constructor(
    id: string,
    titulo: string,
    genero: Genero,
    plataforma: Plataforma,
    ano?: number,
    imagemBase64?: string
  ) {
    super(id, titulo, genero, plataforma, "Filme", ano, imagemBase64);
  }
}

class Serie extends Titulo {
  constructor(
    id: string,
    titulo: string,
    genero: Genero,
    plataforma: Plataforma,
    public temporadas: number,
    public episodios: number,
    ano?: number,
    imagemBase64?: string
  ) {
    super(id, titulo, genero, plataforma, "Série", ano, imagemBase64);
  }
}

// Registro para armazenar o status/avaliacao por usuário-título
class RegistroDeVisualizacao {
  constructor(
    public usuarioNome: string, // referência simples por nome (ou poderia ser id)
    public tituloId: string,
    public status: Status = "Quero ver",
    public avaliacao?: number, // opcional 1..10
    public dataInicio?: string,
    public dataFim?: string
  ) {}
}

class Usuario {
  public favoritos: string[] = []; // lista de ids de títulos
  public dataCadastro: string;

  constructor(
    public nome: string,
    public idade: number,
    public generoFavorito: Genero
  ) {
    this.dataCadastro = new Date().toISOString();
  }
}

// ---------- Sistema (controladora) ----------
class CineTrack {
  usuarios: Usuario[] = [];
  catalogo: Titulo[] = [];
  registros: RegistroDeVisualizacao[] = [];

  // Persistência em localStorage
  saveToStorage() {
    const raw = {
      usuarios: this.usuarios,
      catalogo: this.catalogo,
      registros: this.registros
    };
    localStorage.setItem("cinetrack_data", JSON.stringify(raw));
  }

  loadFromStorage() {
    const raw = localStorage.getItem("cinetrack_data");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      // reconstruir objetos:
      this.usuarios = (parsed.usuarios || []).map((u: any) =>
        Object.assign(new Usuario(u.nome, u.idade, u.generoFavorito), {
          favoritos: u.favoritos || [],
          dataCadastro: u.dataCadastro || new Date().toISOString()
        })
      );

      this.catalogo = (parsed.catalogo || []).map((t: any) => {
        if (t.tipo === "Série") {
          return Object.assign(
            new Serie(t.id, t.titulo, t.genero, t.plataforma, t.temporadas || 1, t.episodios || 1, t.anoLancamento),
            t
          );
        } else {
          return Object.assign(new Filme(t.id, t.titulo, t.genero, t.plataforma, t.anoLancamento), t);
        }
      });

      this.registros = (parsed.registros || []).map((r: any) =>
        Object.assign(new RegistroDeVisualizacao(r.usuarioNome, r.tituloId, r.status, r.avaliacao, r.dataInicio, r.dataFim), r)
      );
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }

  adicionarUsuario(u: Usuario) {
    // evitar duplicados por nome
    if (this.usuarios.find(x => x.nome === u.nome)) throw new Error("Usuário já existe (mesmo nome).");
    this.usuarios.push(u);
    this.saveToStorage();
  }

  registrarTitulo(t: Titulo) {
    if (this.catalogo.find(x => x.titulo === t.titulo && x.plataforma === t.plataforma)) {
      throw new Error("Título já cadastrado nessa plataforma.");
    }
    this.catalogo.push(t);
    this.saveToStorage();
  }

  buscarUsuario(nome: string): Usuario | undefined {
    return this.usuarios.find(u => u.nome === nome);
  }

  buscarTituloPorId(id: string): Titulo | undefined {
    return this.catalogo.find(t => t.id === id);
  }

  // retorna títulos cujo gênero = generoFavorito e que o usuário ainda não avaliou/registrou (ou que tenha status "Quero ver")
  recomendarParaUsuario(usuarioNome: string): Titulo[] {
    const u = this.buscarUsuario(usuarioNome);
    if (!u) return [];

    const jaRegistradosIds = new Set(
      this.registros.filter(r => r.usuarioNome === usuarioNome).map(r => r.tituloId)
    );

    return this.catalogo.filter(t => t.genero === u.generoFavorito && !jaRegistradosIds.has(t.id));
  }

  adicionarRegistro(r: RegistroDeVisualizacao) {
    this.registros.push(r);
    this.saveToStorage();
  }

  atualizarRegistro(usuarioNome: string, tituloId: string, novoStatus: Status, avaliacao?: number) {
    const reg = this.registros.find(r => r.usuarioNome === usuarioNome && r.tituloId === tituloId);
    if (reg) {
      reg.status = novoStatus;
      if (avaliacao !== undefined) reg.avaliacao = avaliacao;
      if (novoStatus === "Assistindo" && !reg.dataInicio) reg.dataInicio = new Date().toISOString();
      if (novoStatus === "Concluído") reg.dataFim = new Date().toISOString();
      this.saveToStorage();
    } else {
      const novo = new RegistroDeVisualizacao(usuarioNome, tituloId, novoStatus, avaliacao);
      if (novoStatus === "Assistindo") novo.dataInicio = new Date().toISOString();
      if (novoStatus === "Concluído") novo.dataFim = new Date().toISOString();
      this.adicionarRegistro(novo);
    }
  }

  favoritarTitulo(usuarioNome: string, tituloId: string) {
    const u = this.buscarUsuario(usuarioNome);
    if (!u) throw new Error("Usuário não encontrado.");
    if (!u.favoritos.includes(tituloId)) {
      u.favoritos.push(tituloId);
      this.saveToStorage();
    }
  }

  listarAssistindo(usuarioNome: string): { titulo: Titulo; registro: RegistroDeVisualizacao }[] {
    return this.registros
      .filter(r => r.usuarioNome === usuarioNome && r.status === "Assistindo")
      .map(r => {
        const t = this.buscarTituloPorId(r.tituloId)!;
        return { titulo: t, registro: r };
      });
  }
}

// ---------- Instância global ----------
const sistema = new CineTrack();
sistema.loadFromStorage();

// ---------- Utilidades (UI helpers) ----------
function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function byId<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T | null;
}

// ---------- inicializa funcionalidade dependendo da página ----------
window.addEventListener("DOMContentLoaded", () => {
  // Home (index.html)
  const selectUsuario = byId<HTMLSelectElement>("selectUsuario");
  const btnVerFavoritos = byId<HTMLButtonElement>("btnVerFavoritos");
  const btnVerAssistindo = byId<HTMLButtonElement>("btnVerAssistindo");
  const btnRecomendar = byId<HTMLButtonElement>("btnRecomendar");
  const outputRecomendacao = byId<HTMLPreElement>("outputRecomendacao");
  const catalogoDiv = byId<HTMLDivElement>("catalogo");

  if (selectUsuario && catalogoDiv) {
    // popular select de usuarios
    function popularUsuariosSelect() {
      selectUsuario.innerHTML = `<option value="">-- selecione --</option>`;
      sistema.usuarios.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.nome;
        opt.text = `${u.nome} (${u.generoFavorito})`;
        selectUsuario.add(opt);
      });
    }

    function mostrarCatalogo() {
      catalogoDiv.innerHTML = "";
      sistema.catalogo.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        const tipo = t.tipo;
        const ano = t.anoLancamento ? ` • ${t.anoLancamento}` : "";
        const extra = t.tipo === "Série" ? `<div class="small">Série</div>` : `<div class="small">Filme</div>`;
        card.innerHTML = `
          ${imagem}
          <strong>${t.titulo}</strong>${ano}
          <div class="small">${t.genero} • ${t.plataforma}</div>
          <div class="small">${t.tipo}</div>
          <div style="margin-top:8px;">
            <button data-id="${t.id}" class="favBtn">Favoritar</button>
            <button data-id="${t.id}" class="verBtn">Marcar Assistindo</button>
          </div>
        `;
        catalogoDiv.appendChild(card);
      });

      // listeners dos botões dentro das cards
      catalogoDiv.querySelectorAll<HTMLButtonElement>(".favBtn").forEach(b => {
        b.onclick = () => {
          const id = b.dataset.id!;
          const nomeUsuario = selectUsuario.value;
          if (!nomeUsuario) { alert("Selecione um usuário primeiro."); return; }
          try {
            sistema.favoritarTitulo(nomeUsuario, id);
            alert("Favorito adicionado!");
          } catch (e: any) {
            alert("Erro: " + e.message);
          }
        };
      });

      catalogoDiv.querySelectorAll<HTMLButtonElement>(".verBtn").forEach(b => {
        b.onclick = () => {
          const id = b.dataset.id!;
          const nomeUsuario = selectUsuario.value;
          if (!nomeUsuario) { alert("Selecione um usuário primeiro."); return; }
          sistema.atualizarRegistro(nomeUsuario, id, "Assistindo");
          alert("Marcado como Assistindo.");
        };
      });
    }

    popularUsuariosSelect();
    mostrarCatalogo();

    // ao mudar usuário
    selectUsuario.onchange = () => {
      // nada por enquanto; poderia atualizar painel
    };

    // Ver favoritos
    if (btnVerFavoritos && outputRecomendacao) {
      btnVerFavoritos.onclick = () => {
        const nome = selectUsuario.value;
        if (!nome) { outputRecomendacao.textContent = "Selecione um usuário."; return; }
        const usuario = sistema.buscarUsuario(nome)!;
        if (usuario.favoritos.length === 0) {
          outputRecomendacao.textContent = `${nome} não possui favoritos.`;
          return;
        }
        const linhas = usuario.favoritos.map(id => {
          const t = sistema.buscarTituloPorId(id);
          return t ? `- ${t.titulo} (${t.tipo}) — ${t.plataforma}` : `- (título removido)`;
        });
        outputRecomendacao.textContent = `Favoritos de ${nome}:\n` + linhas.join("\n");
      };
    }

    // Ver assistindo
    if (btnVerAssistindo && outputRecomendacao) {
      btnVerAssistindo.onclick = () => {
        const nome = selectUsuario.value;
        if (!nome) { outputRecomendacao.textContent = "Selecione um usuário."; return; }
        const lista = sistema.listarAssistindo(nome);
        if (lista.length === 0) {
          outputRecomendacao.textContent = `${nome} não está assistindo nada no momento.`;
          return;
        }
        outputRecomendacao.textContent = `O que ${nome} está assistindo:\n` + lista.map(l => `- ${l.titulo.titulo} (${l.titulo.tipo})`).join("\n");
      };
    }

    // Recomendar
    if (btnRecomendar && outputRecomendacao) {
      btnRecomendar.onclick = () => {
        const nome = selectUsuario.value;
        if (!nome) { outputRecomendacao.textContent = "Selecione um usuário."; return; }
        const recs = sistema.recomendarParaUsuario(nome);
        if (recs.length === 0) {
          outputRecomendacao.textContent = "Sem recomendações novas para esse usuário.";
          return;
        }
        outputRecomendacao.textContent = `Recomendações para ${nome} (gênero favorito: ${(sistema.buscarUsuario(nome) as Usuario).generoFavorito}):\n` + recs.map(r => `- ${r.titulo} (${r.plataforma})`).join("\n");
      };
    }
  }

  // Página: cadastrar-usuario.html
  const formUsuario = byId<HTMLFormElement>("formUsuario");
  const output = byId<HTMLPreElement>("output");
  if (formUsuario && output) {
    formUsuario.onsubmit = (ev) => {
      ev.preventDefault();
      const nome = (byId<HTMLInputElement>("nome")!).value.trim();
      const idade = Number((byId<HTMLInputElement>("idade")!).value);
      const genero = (byId<HTMLSelectElement>("generoFavorito")!).value as Genero;

      if (!nome) { output.textContent = "Nome é obrigatório."; return; }
      try {
        const u = new Usuario(nome, idade, genero);
        sistema.adicionarUsuario(u);
        output.textContent = `✅ Usuário "${nome}" adicionado com sucesso.`;
      } catch (err: any) {
        output.textContent = `❌ Erro: ${err.message}`;
      }
    };
  }

  // Página: cadastrar-titulo.html
  const formTitulo = byId<HTMLFormElement>("formTitulo");
  const outputTitulo = byId<HTMLPreElement>("outputTitulo");
  const tipoSelect = byId<HTMLSelectElement>("tipo");
  if (tipoSelect) {
    tipoSelect.onchange = () => {
      const show = tipoSelect.value === "Série";
      const extras = byId<HTMLDivElement>("extrasSerie")!;
      extras.style.display = show ? "block" : "none";
    };
  }

  if (formTitulo && outputTitulo) {
    const imagemFileInput = byId<HTMLInputElement>("imagemFile");
    const preview = byId<HTMLImageElement>("previewImagem");
    let imagemBase64Temp: string | undefined;
  
    // Mostrar prévia ao escolher imagem
    if (imagemFileInput && preview) {
      imagemFileInput.addEventListener("change", () => {
        const file = imagemFileInput.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imagemBase64Temp = e.target?.result as string;
            preview.src = imagemBase64Temp;
            preview.style.display = "block";
          };
          reader.readAsDataURL(file);
        }
      });
    }
  
    formTitulo.onsubmit = (ev) => {
      ev.preventDefault();
      const tituloTxt = (byId<HTMLInputElement>("titulo")!).value.trim();
      const tipo = (byId<HTMLSelectElement>("tipo")!).value as Tipo;
      const genero = (byId<HTMLSelectElement>("genero")!).value as Genero;
      const plataforma = (byId<HTMLSelectElement>("plataforma")!).value as Plataforma;
      const ano = Number((byId<HTMLInputElement>("ano")!).value) || undefined;
  
      if (!tituloTxt) {
        outputTitulo.textContent = "Título é obrigatório.";
        return;
      }
  
      try {
        const id = uid("t_");
        if (tipo === "Série") {
          const temp = Number((byId<HTMLInputElement>("temporadas")!).value) || 1;
          const epis = Number((byId<HTMLInputElement>("episodios")!).value) || 1;
          const s = new Serie(id, tituloTxt, genero, plataforma, temp, epis, ano, imagemBase64Temp);
          sistema.registrarTitulo(s);
        } else {
          const f = new Filme(id, tituloTxt, genero, plataforma, ano, imagemBase64Temp);
          sistema.registrarTitulo(f);
        }
        outputTitulo.textContent = `✅ "${tituloTxt}" adicionado ao catálogo.`;
        formTitulo.reset();
        preview.style.display = "none";
        imagemBase64Temp = undefined;
      } catch (err: any) {
        outputTitulo.textContent = `❌ Erro: ${err.message}`;
      }
    };
  }
});
