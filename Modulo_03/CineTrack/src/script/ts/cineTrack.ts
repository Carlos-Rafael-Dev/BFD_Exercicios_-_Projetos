// Contralador principal
import { Usuario, Titulo, Filme, Serie, RegistroDeVisualizacao } from "./models";
import { Status } from "./types";

export class CineTrack {
  usuarios: Usuario[] = [];
  catalogo: Titulo[] = [];
  registros: RegistroDeVisualizacao[] = [];

  saveToStorage() {
    localStorage.setItem(
      "cinetrack_data",
      JSON.stringify({
        usuarios: this.usuarios,
        catalogo: this.catalogo,
        registros: this.registros
      })
    );
  }

  loadFromStorage() {
    const raw = localStorage.getItem("cinetrack_data");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      this.usuarios = (parsed.usuarios || []).map((u: any) => {
        const user = new Usuario(u.nome, u.idade, u.generoFavorito, u.fotoBase64);
        user.favoritos = u.favoritos ?? [];
        user.dataCadastro = u.dataCadastro;
        return user;
      });

      this.catalogo = (parsed.catalogo || []).map((t: any) => {
        return t.tipo === "Série"
          ? new Serie(t.id, t.titulo, t.genero, t.plataforma, t.temporadas, t.episodios, t.anoLancamento, t.imagemBase64)
          : new Filme(t.id, t.titulo, t.genero, t.plataforma, t.anoLancamento, t.imagemBase64);
      });

      this.registros = (parsed.registros || []).map((r: any) => {
        return new RegistroDeVisualizacao(
          r.usuarioNome,
          r.tituloId,
          r.status,
          r.avaliacao,
          r.dataInicio,
          r.dataFim
        );
      });
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }

  adicionarUsuario(u: Usuario) {
    if (this.usuarios.find(x => x.nome === u.nome)) {
      throw new Error("Usuário já existe.");
    }
    this.usuarios.push(u);
    this.saveToStorage();
  }

  registrarTitulo(t: Titulo) {
    if (this.catalogo.some(x => x.titulo === t.titulo && x.plataforma === t.plataforma)) {
      throw new Error("Título já registrado.");
    }
    this.catalogo.push(t);
    this.saveToStorage();
  }

  buscarUsuario(nome: string) {
    return this.usuarios.find(u => u.nome === nome) || null;
  }

  buscarTituloPorId(id: string) {
    return this.catalogo.find(t => t.id === id) || null;
  }

  recomendarParaUsuario(usuarioNome: string): Titulo[] {
    const u = this.buscarUsuario(usuarioNome);
    if (!u) return [];

    const vistos = new Set(
      this.registros.filter(r => r.usuarioNome === usuarioNome).map(r => r.tituloId)
    );

    return this.catalogo.filter(
      t => t.genero === u.generoFavorito && !vistos.has(t.id)
    );
  }

  atualizarRegistro(
    usuarioNome: string,
    tituloId: string,
    novoStatus: Status,
    avaliacao?: number
  ) {
    let reg = this.registros.find(r => r.usuarioNome === usuarioNome && r.tituloId === tituloId);

    if (!reg) {
      reg = new RegistroDeVisualizacao(usuarioNome, tituloId, novoStatus, avaliacao);
      this.registros.push(reg);
    } else {
      reg.status = novoStatus;
      if (avaliacao !== undefined) reg.avaliacao = avaliacao;
    }

    if (novoStatus === "Assistindo" && !reg.dataInicio) {
      reg.dataInicio = new Date().toISOString();
    }
    if (novoStatus === "Concluído") {
      reg.dataFim = new Date().toISOString();
    }

    this.saveToStorage();
  }

  getMediaAvaliacoes(tituloId: string): number | null {
    const avaliados = this.registros.filter(r => r.tituloId === tituloId && r.avaliacao !== undefined);

    if (avaliados.length === 0) return null;

    const soma = avaliados.reduce((acc, r) => acc + (r.avaliacao || 0), 0);
    return soma / avaliados.length;
  }

  favoritarTitulo(usuarioNome: string, tituloId: string): void {
    const u = this.buscarUsuario(usuarioNome);
    if (!u) throw new Error("Usuário não encontrado.");
  
    const t = this.buscarTituloPorId(tituloId);
    if (!t) throw new Error("Título não encontrado.");
  
    if (!u.favoritos.includes(tituloId)) {
      u.favoritos.push(tituloId);
      this.saveToStorage();
    }
  }
}


