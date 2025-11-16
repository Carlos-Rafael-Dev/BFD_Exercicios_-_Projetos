// Modelos de classes
import { Genero, Status, TipoTitulo, Plataforma } from "./types";

export class Titulo {
  id: string;
  titulo: string;
  genero: Genero;
  plataforma: Plataforma;
  tipo: TipoTitulo;
  anoLancamento?: number;
  imagemBase64?: string | null;

  constructor(
    id: string,
    titulo: string,
    genero: Genero,
    plataforma: Plataforma,
    tipo: TipoTitulo,
    anoLancamento?: number,
    imagemBase64?: string | null
  ) {
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.plataforma = plataforma;
    this.tipo = tipo;
    this.anoLancamento = anoLancamento;
    this.imagemBase64 = imagemBase64 || null;
  }
}

export class Filme extends Titulo {
  constructor(
    id: string,
    titulo: string,
    genero: Genero,
    plataforma: Plataforma,
    anoLancamento?: number,
    imagemBase64?: string | null
  ) {
    super(id, titulo, genero, plataforma, "Filme", anoLancamento, imagemBase64);
  }
}

export class Serie extends Titulo {
  temporadas: number;
  episodios: number;

  constructor(
    id: string,
    titulo: string,
    genero: Genero,
    plataforma: Plataforma,
    temporadas: number,
    episodios: number,
    anoLancamento?: number,
    imagemBase64?: string | null
  ) {
    super(id, titulo, genero, plataforma, "Série", anoLancamento, imagemBase64);
    this.temporadas = temporadas;
    this.episodios = episodios;
  }
}

export class Usuario {
  nome: string;
  idade: number;
  generoFavorito: Genero;
  fotoBase64: string | null;
  favoritos: string[];
  dataCadastro: string;

  constructor(
    nome: string,
    idade: number,
    generoFavorito: Genero,
    fotoBase64?: string | null
  ) {
    this.nome = nome;
    this.idade = idade;
    this.generoFavorito = generoFavorito;
    this.fotoBase64 = fotoBase64 || null;
    this.favoritos = [];
    this.dataCadastro = new Date().toISOString();
  }
}

export class RegistroDeVisualizacao {
  usuarioNome: string;
  tituloId: string;
  status: Status;
  avaliacao?: number;
  dataInicio?: string;
  dataFim?: string;

  constructor(
    usuarioNome: string,
    tituloId: string,
    status: Status = "Quero ver",
    avaliacao?: number,
    dataInicio?: string,
    dataFim?: string
  ) {
    this.usuarioNome = usuarioNome;
    this.tituloId = tituloId;
    this.status = status;
    this.avaliacao = avaliacao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }
}
