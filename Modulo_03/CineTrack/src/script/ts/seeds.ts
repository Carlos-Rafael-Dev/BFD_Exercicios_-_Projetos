// Preenche usuários e catalogo inicial
import { Usuario, Filme, Serie } from "./models";
import { Genero, Plataforma } from "./types";
import { uid } from "./helpers";
import { CineTrack } from "./cineTrack";


export function seedUsuarios(sistema: CineTrack) {
  if (sistema.usuarios.length > 0) return;

  const usuariosSeed: Usuario[] = [
    new Usuario("Rafael", 30, "Ficção Cientifica" as Genero, "./assets/usuarios/rafael.jpeg"),
    new Usuario("Joel", 25, "Aventura" as Genero, "./assets/usuarios/joel.jpg"),
    new Usuario("Sonny", 22, "Animação" as Genero, "./assets/usuarios/default.png")
  ];

  usuariosSeed.forEach(u => sistema.usuarios.push(u));
  sistema.saveToStorage();
}


export function seedCatalogo(sistema: CineTrack) {
  if (sistema.catalogo.length > 0) return;

  const seeds: (Filme | Serie)[] = [
    new Filme(uid("t_"), "Toy Story", "Animação" as Genero, "Disney+" as Plataforma, 2000, "./assets/catalogo/animacao/TS1.jpg"),
    new Filme(uid("t_"), "Toy Story 2", "Animação" as Genero, "Disney+" as Plataforma, 2004, "./assets/catalogo/animacao/TS2.webp"),
    new Filme(uid("t_"), "Toy Story 3", "Animação" as Genero, "Disney+" as Plataforma, 2006, "./assets/catalogo/animacao/TS3.avif"),
    new Filme(uid("t_"), "Toy Story 4", "Animação" as Genero, "Disney+" as Plataforma, 2014, "./assets/catalogo/animacao/TS4.webp"),

    new Filme(uid("t_"), "John Wick", "Ação" as Genero, "Prime Video" as Plataforma, 2014, "./assets/catalogo/acao/JW1.jpg"),
    new Filme(uid("t_"), "John Wick 2", "Ação" as Genero, "Prime Video" as Plataforma, 2016, "./assets/catalogo/acao/JW2.webp"),
    new Filme(uid("t_"), "John Wick 3", "Ação" as Genero, "Prime Video" as Plataforma, 2020, "./assets/catalogo/acao/JW3.webp"),
    new Filme(uid("t_"), "John Wick 4", "Ação" as Genero, "Prime Video" as Plataforma, 2023, "./assets/catalogo/acao/JW4.webp"),

    new Filme(uid("t_"), "Harry Potter", "Aventura" as Genero, "Netflix" as Plataforma, 2000, "./assets/catalogo/aventura/HP1.jpg"),
    new Filme(uid("t_"), "Harry Potter 2", "Aventura" as Genero, "Netflix" as Plataforma, 2002, "./assets/catalogo/aventura/HP2.jpg"),
    new Filme(uid("t_"), "Harry Potter 3", "Aventura" as Genero, "Netflix" as Plataforma, 2004, "./assets/catalogo/aventura/HP3.jpg"),
    new Filme(uid("t_"), "Harry Potter 4", "Aventura" as Genero, "Netflix" as Plataforma, 2006, "./assets/catalogo/aventura/HP4.jpg"),

    new Filme(uid("t_"), "Todo Mundo em Pânico", "Comédia" as Genero, "Prime Video" as Plataforma, 2000, "./assets/catalogo/comedia/TD1.jpg"),
    new Filme(uid("t_"), "Todo Mundo em Pânico 2", "Comédia" as Genero, "Prime Video" as Plataforma, 2002, "./assets/catalogo/comedia/TD2.jpg"),
    new Filme(uid("t_"), "Todo Mundo em Pânico 3", "Comédia" as Genero, "Prime Video" as Plataforma, 2004, "./assets/catalogo/comedia/TD3.webp"),

    new Filme(uid("t_"), "Matriz", "Ficção Cientifica" as Genero, "HBO Max" as Plataforma, 2001, "./assets/catalogo/ficcao-cientifica/MA1.jpg"),
    new Filme(uid("t_"), "Matriz 2", "Ficção Cientifica" as Genero, "HBO Max" as Plataforma, 2003, "./assets/catalogo/ficcao-cientifica/MA2.jpg"),

    // exemplo de série (uso opcional)
    new Serie(uid("t_"), "Stranger Things", "Ficção Cientifica" as Genero, "Netflix" as Plataforma, 4, 34, 2016, "./assets/catalogo/series/stranger1.jpg")
  ];

  seeds.forEach(t => sistema.catalogo.push(t));
  sistema.saveToStorage();
}
