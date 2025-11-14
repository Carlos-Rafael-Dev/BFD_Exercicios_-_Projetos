// script.ts
// ---------- Modelos ----------
class Titulo {
    constructor(id, titulo, genero, plataforma, tipo, anoLancamento, imagemBase64) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.plataforma = plataforma;
        this.tipo = tipo;
        this.anoLancamento = anoLancamento;
        this.imagemBase64 = imagemBase64;
    }
}

class Filme extends Titulo {
    // possíveis atributos no futuro (diretor, duração etc.)
    constructor(id, titulo, genero, plataforma, ano, imagemBase64) {
        super(id, titulo, genero, plataforma, "Filme", ano, imagemBase64);
    }
}

class Serie extends Titulo {
    constructor(id, titulo, genero, plataforma, temporadas, episodios, ano, imagemBase64) {
        super(id, titulo, genero, plataforma, "Série", ano, imagemBase64);
        this.temporadas = temporadas;
        this.episodios = episodios;
    }
}

// Registro para armazenar o status/avaliacao por usuário-título
class RegistroDeVisualizacao {
    constructor(usuarioNome, // referência simples por nome (ou poderia ser id)
    tituloId, status = "Quero ver", avaliacao, // opcional 1..10
    dataInicio, dataFim) {
        this.usuarioNome = usuarioNome;
        this.tituloId = tituloId;
        this.status = status;
        this.avaliacao = avaliacao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}

class Usuario {
    constructor(nome, idade, generoFavorito, fotoBase64) {
        this.nome = nome;
        this.idade = idade;
        this.generoFavorito = generoFavorito;
        this.fotoBase64 = fotoBase64 || null;
        this.favoritos = []; // lista de ids de títulos
        this.dataCadastro = new Date().toISOString();
    }
}

// ---------- Sistema (controladora) ----------
class CineTrack {
    constructor() {
        this.usuarios = [];
        this.catalogo = [];
        this.registros = [];
    }

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
        if (!raw)
            return;
        try {
            const parsed = JSON.parse(raw);
            // reconstruir objetos:
            this.usuarios = (parsed.usuarios || []).map((u) => Object.assign(new Usuario(u.nome, u.idade, u.generoFavorito, u.fotoBase64), {
                favoritos: u.favoritos || [],
                dataCadastro: u.dataCadastro || new Date().toISOString()
            }));
            this.catalogo = (parsed.catalogo || []).map((t) => {
                if (t.tipo === "Série") {
                    return Object.assign(new Serie(t.id, t.titulo, t.genero, t.plataforma, t.temporadas || 1, t.episodios || 1, t.anoLancamento), t);
                }
                else {
                    return Object.assign(new Filme(t.id, t.titulo, t.genero, t.plataforma, t.anoLancamento), t);
                }
            });
            this.registros = (parsed.registros || []).map((r) => Object.assign(new RegistroDeVisualizacao(r.usuarioNome, r.tituloId, r.status, r.avaliacao, r.dataInicio, r.dataFim), r));
        }
        catch (e) {
            console.error("Erro ao carregar dados:", e);
        }
    }

    adicionarUsuario(u) {
        // evitar duplicados por nome
        if (this.usuarios.find(x => x.nome === u.nome))
            throw new Error("Usuário já existe (mesmo nome).");
        this.usuarios.push(u);
        this.saveToStorage();
    }

    registrarTitulo(t) {
        if (this.catalogo.find(x => x.titulo === t.titulo && x.plataforma === t.plataforma)) {
            throw new Error("Título já cadastrado nessa plataforma.");
        }
        this.catalogo.push(t);
        this.saveToStorage();
    }

    buscarUsuario(nome) {
        return this.usuarios.find(u => u.nome === nome);
    }

    buscarTituloPorId(id) {
        return this.catalogo.find(t => t.id === id);
    }

    // retorna títulos cujo gênero = generoFavorito e que o usuário ainda não avaliou/registrou (ou que tenha status "Quero ver")
    recomendarParaUsuario(usuarioNome) {
        const u = this.buscarUsuario(usuarioNome);
        if (!u)
            return [];
        const jaRegistradosIds = new Set(this.registros.filter(r => r.usuarioNome === usuarioNome).map(r => r.tituloId));
        return this.catalogo.filter(t => t.genero === u.generoFavorito && !jaRegistradosIds.has(t.id));
    }

    adicionarRegistro(r) {
        this.registros.push(r);
        this.saveToStorage();
    }

    atualizarRegistro(usuarioNome, tituloId, novoStatus, avaliacao) {
        const reg = this.registros.find(r => r.usuarioNome === usuarioNome && r.tituloId === tituloId);
        if (reg) {
            reg.status = novoStatus;
            if (avaliacao !== undefined)
                reg.avaliacao = avaliacao;
            if (novoStatus === "Assistindo" && !reg.dataInicio)
                reg.dataInicio = new Date().toISOString();
            if (novoStatus === "Concluído")
                reg.dataFim = new Date().toISOString();
            this.saveToStorage();
        }
        else {
            const novo = new RegistroDeVisualizacao(usuarioNome, tituloId, novoStatus, avaliacao);
            if (novoStatus === "Assistindo")
                novo.dataInicio = new Date().toISOString();
            if (novoStatus === "Concluído")
                novo.dataFim = new Date().toISOString();
            this.adicionarRegistro(novo);
        }
    }

    favoritarTitulo(usuarioNome, tituloId) {
        const u = this.buscarUsuario(usuarioNome);
        if (!u)
            throw new Error("Usuário não encontrado.");
        if (!u.favoritos.includes(tituloId)) {
            u.favoritos.push(tituloId);
            this.saveToStorage();
        }
    }

    listarAssistindo(usuarioNome) {
        return this.registros
            .filter(r => r.usuarioNome === usuarioNome && r.status === "Assistindo")
            .map(r => {
            const t = this.buscarTituloPorId(r.tituloId);
            return { titulo: t, registro: r };
        });
    }
}

// ---------- Instância global ----------
const sistema = new CineTrack();
sistema.loadFromStorage();
seedUsuarios();
seedCatalogo();

// ---------- Utilidades (UI helpers) ----------
function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}
function byId(id) {
    return document.getElementById(id);
}

// ---------- Usuários pré-cadastrados ----------
function seedUsuarios() {
    // Se já existir algum usuário, não faz nada
    if (sistema.usuarios.length > 0) return;

    const usuariosSeed = [
        new Usuario(
            "Rafael",
            30,
            "Ficção Cientifica",
            "./assets/usuarios/rafael.jpeg"
        ),
        new Usuario(
            "Joel",
            25,
            "Aventura",
            "./assets/usuarios/joel.jpg"
        ),
        new Usuario(
            "Sonny",
            22,
            "Animação",
            "./assets/usuarios/default.png"
        )
    ];

    usuariosSeed.forEach(u => sistema.usuarios.push(u));

    sistema.saveToStorage();
}


// ---------- Catálogo pré-cadastrado ----------
function seedCatalogo() {
    // Se já existir algo no catálogo, não sobrescreve
    if (sistema.catalogo.length > 0) return;

    const seeds = [
        new Filme(uid("t_"), "Toy Story", "Animação", "Disney+", 2000, "./assets/catalogo/animacao/TS1.jpg"),
        new Filme(uid("t_"), "Toy Story 2", "Animação", "Disney+", 2004, "./assets/catalogo/animacao/TS2.webp"),
        new Filme(uid("t_"), "Toy Story 3", "Animação", "Disney+", 2006, "./assets/catalogo/animacao/TS3.avif"),
        new Filme(uid("t_"), "Toy Story 4", "Animação", "Disney+", 2014, "./assets/catalogo/animacao/TS4.webp"),
        new Filme(uid("t_"), "John Wick", "Ação", "Prime Video", 2014, "./assets/catalogo/acao/JW1.jpg"),
        new Filme(uid("t_"), "John Wick 2", "Ação", "Prime Video", 2016, "./assets/catalogo/acao/JW2.webp"),
        new Filme(uid("t_"), "John Wick 3", "Ação", "Prime Video", 2020, "./assets/catalogo/acao/JW3.webp"),
        new Filme(uid("t_"), "John Wick 4", "Ação", "Prime Video", 2023, "./assets/catalogo/acao/JW4.webp"),
        new Filme(uid("t_"), "Harry Potter", "Aventura", "Netflix", 2000, "./assets/catalogo/aventura/HP1.jpg"),
        new Filme(uid("t_"), "Harry Potter 2", "Aventura", "Netflix", 2002, "./assets/catalogo/aventura/HP2.jpg"),
        new Filme(uid("t_"), "Harry Potter 3", "Aventura", "Netflix", 2004, "./assets/catalogo/aventura/HP3.jpg"),
        new Filme(uid("t_"), "Harry Potter 4", "Aventura", "Netflix", 2006, "./assets/catalogo/aventura/HP4.jpg"),
        new Filme(uid("t_"), "Todo Mundo em Pânico", "Comédia", "Prime Video", 2000, "./assets/catalogo/comedia/TD1.jpg"),
        new Filme(uid("t_"), "Todo Mundo em Pânico 2", "Comédia", "Prime Video", 2002, "./assets/catalogo/comedia/TD2.jpg"),
        new Filme(uid("t_"), "Todo Mundo em Pânico 3", "Comédia", "Prime Video", 2004, "./assets/catalogo/comedia/TD3.webp"),
        new Filme(uid("t_"), "Todo Mundo em Pânico 4", "Comédia", "Prime Video", 2006, "./assets/catalogo/comedia/TD4.webp"),
        new Filme(uid("t_"), "Todo Mundo em Pânico 5", "Comédia", "Prime Video", 2008, "./assets/catalogo/comedia/TD5.jpg"),
        new Filme(uid("t_"), "Matriz", "Ficção Cientifica", "HBO Max", 2001, "./assets/catalogo/ficcao-cientifica/MA1.jpg"),
        new Filme(uid("t_"), "Matriz 2", "Ficção Cientifica", "HBO Max", 2003, "./assets/catalogo/ficcao-cientifica/MA2.jpg"),
        new Filme(uid("t_"), "Para Todos os Garotos que já amei", "Romance", "Netflix", 2013, "./assets/catalogo/romance/GA1.webp"),
        new Filme(uid("t_"), "Para Todos os Garotos que já amei 2", "Romance", "Netflix", 2016, "./assets/catalogo/romance/GA2.jpg"),
        new Filme(uid("t_"), "Para Todos os Garotos que já amei 3", "Romance", "Netflix", 2018, "./assets/catalogo/romance/GA3.jpg"),
        new Filme(uid("t_"), "Invocação do mal", "Terror", "HBO Max", 2017, "./assets/catalogo/terror/IM1.jpg"),
        new Filme(uid("t_"), "Invocação do mal 2", "Terror", "HBO Max", 2019, "./assets/catalogo/terror/IM2.webp"),
        new Filme(uid("t_"), "Invocação do mal 3", "Terror", "HBO Max", 2020, "./assets/catalogo/terror/IM3.jpg"),
    ];

    seeds.forEach(t => sistema.catalogo.push(t));
    sistema.saveToStorage();
}

// ---------- inicializa funcionalidade dependendo da página ----------
window.addEventListener("DOMContentLoaded", () => {
    // elementos da home
    const listaUsuariosDiv = byId("listaUsuarios");
    const usuarioAtualDiv = byId("usuarioAtual");
    const fotoUsuarioSelecionado = byId("fotoUsuarioSelecionado");
    const catalogoDiv = byId("catalogo");
    const outputRecomendacao = byId("outputRecomendacao");

    const btnVerFavoritos = byId("btnVerFavoritos");
    const btnVerAssistindo = byId("btnVerAssistindo");
    const btnRecomendar = byId("btnRecomendar");

    // fallback: se não existir listaUsuarios, tenta usar select antigo (compatibilidade)
    const selectUsuario = byId("selectUsuario");

    // estado
    let usuarioSelecionado = null;

    // função que atualiza a UI quando um usuário é selecionado
    function setUsuarioSelecionado(nome) {
        usuarioSelecionado = nome;
        //limpar output ao trocar usuario
        if (outputRecomendacao) outputRecomendacao.textContent = "";
        const u = sistema.buscarUsuario(nome);
        if (u) {
            usuarioAtualDiv && (usuarioAtualDiv.innerHTML = `<strong>Usuário selecionado:</strong> ${u.nome} (${u.generoFavorito})`);
            if (fotoUsuarioSelecionado) {
                if (u.fotoBase64) {
                    fotoUsuarioSelecionado.src = u.fotoBase64;
                    fotoUsuarioSelecionado.style.display = "block";
                } else {
                    fotoUsuarioSelecionado.style.display = "none";
                }
            }

            // destaca o card ativo (se estiver usando cards)
            if (listaUsuariosDiv) {
                listaUsuariosDiv.querySelectorAll(".user-card").forEach(c => {
                    c.style.border = "2px solid transparent";
                });
                const ativo = listaUsuariosDiv.querySelector(`[data-nome="${CSS.escape(u.nome)}"]`);
                if (ativo) ativo.style.border = "4px solid #4caf50";
            }
        } else {
            usuarioAtualDiv && (usuarioAtualDiv.textContent = "");
            if (fotoUsuarioSelecionado) fotoUsuarioSelecionado.style.display = "none";
        }
    }

    // renderizar usuários como cards
    function mostrarUsuariosComoCards() {
        // se não existir o container, tenta popular o select (compatibilidade)
        if (!listaUsuariosDiv) {
            if (selectUsuario) {
                selectUsuario.innerHTML = `<option value="">-- selecione --</option>`;
                sistema.usuarios.forEach(u => {
                    const opt = document.createElement("option");
                    opt.value = u.nome;
                    opt.text = `${u.nome} (${u.generoFavorito})`;
                    selectUsuario.add(opt);
                });
            }
            return;
        }

        listaUsuariosDiv.innerHTML = "";
        sistema.usuarios.forEach(u => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.setAttribute("data-nome", u.nome);
            card.style.width = "150px";
            card.style.padding = "10px";
            card.style.borderRadius = "10px";
            card.style.background = "#222";
            card.style.cursor = "pointer";
            card.style.textAlign = "center";
            card.style.border = "2px solid transparent";
            card.style.transition = "0.15s";
            card.style.boxSizing = "border-box";

            const fotoHtml = u.fotoBase64
                ? `<img src="${u.fotoBase64}" style="width:100%; height:110px; object-fit:cover; border-radius:8px;">`
                : `<div style="width:100%; height:110px; background:#444; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#aaa;">Sem foto</div>`;

            card.innerHTML = `
                ${fotoHtml}
                <div style="margin-top:8px; font-weight:bold; color:#fff;">${u.nome}</div>
                <div style="font-size:13px; color:#ccc;">${u.generoFavorito}</div>
            `;

            card.onclick = () => {
                setUsuarioSelecionado(u.nome);
            };

            listaUsuariosDiv.appendChild(card);
        });

        // se já existia usuário selecionado no estado, reaplica o destaque
        if (usuarioSelecionado) setUsuarioSelecionado(usuarioSelecionado);
    }

    // mostrar catálogo (agrupado por gênero) - adaptado para usar usuarioSelecionado
    function mostrarCatalogo() {
        if (!catalogoDiv) return;
        catalogoDiv.innerHTML = "";

        // agrupa por gênero
        const porGenero = {};
        sistema.catalogo.forEach(t => {
            if (!porGenero[t.genero]) porGenero[t.genero] = [];
            porGenero[t.genero].push(t);
        });

        Object.keys(porGenero).sort().forEach(genero => {
            const h2 = document.createElement("h2");
            h2.textContent = genero;
            h2.style.margin = "18px 0 8px";
            catalogoDiv.appendChild(h2);

            const container = document.createElement("div");
            container.className = "gridGenero";
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(auto-fill, minmax(180px, 1fr))";
            container.style.gap = "12px";

            porGenero[genero].forEach(t => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.background = "#1b1b1b";
                card.style.padding = "8px";
                card.style.borderRadius = "8px";
                card.style.color = "#fff";

                const ano = t.anoLancamento ? ` • ${t.anoLancamento}` : "";
                const imagem = t.imagemBase64
                  ? `<img src="${t.imagemBase64}" alt="${t.titulo}" style="width:100%;border-radius:6px;margin-bottom:6px;height:120px;object-fit:cover;">`
                  : `<div style="width:100%;height:140px;background:#333;border-radius:6px;margin-bottom:6px;display:flex;align-items:center;justify-content:center;color:#777;">Sem imagem</div>`;

                card.innerHTML = `
                    ${imagem}
                    <strong style="display:block;">${t.titulo}</strong>${ano}
                    <div class="small" style="color:#ccc;">${t.genero} • ${t.plataforma}</div>
                    <div class="small" style="color:#ccc;">${t.tipo}</div>
                    <div style="margin-top:8px;">
                        <button data-id="${t.id}" class="favBtn">Favoritar</button>
                        <button data-id="${t.id}" class="verBtn">Assistindo</button>
                        <button data-id="${t.id}" class="rateBtn">Avaliar</button>
                    </div>
                    <div class="avaliacaoUsuario" id="nota_${t.id}" style="margin-top:5px; color:#ffd700;"></div>
                `;

                container.appendChild(card);

                // Exibir avaliação do usuário no card
                if (usuarioSelecionado) {
                    const reg = sistema.registros.find(
                        r => r.usuarioNome === usuarioSelecionado && r.tituloId === t.id
                    );

                    if (reg && reg.avaliacao) {
                        card.querySelector(`#nota_${t.id}`).textContent =
                            `Sua nota: ⭐ ${reg.avaliacao}/10`;
                    }
                }
            });

            catalogoDiv.appendChild(container);
        });

        // Registrar eventos dos botões APÓS criar os cards
        catalogoDiv.querySelectorAll(".rateBtn").forEach(btn => {
            btn.onclick = () => {
                if (!usuarioSelecionado) {
                    alert("Selecione um usuário.");
                    return;
                }
                const id = btn.dataset.id;
                const titulo = sistema.buscarTituloPorId(id);
                abrirPopupAvaliacao(titulo);
            };
        });

        // listeners dos botões dentro das cards
        catalogoDiv.querySelectorAll(".favBtn").forEach(b => {
            b.onclick = () => {
                const id = b.dataset.id;
                if (!usuarioSelecionado) {
                    alert("Selecione um usuário primeiro.");
                    return;
                }
                try {
                    sistema.favoritarTitulo(usuarioSelecionado, id);
                    alert("Favorito adicionado!");
                    // opcional: atualizar UI
                } catch (e) {
                    alert("Erro: " + e.message);
                }
            };
        });

        catalogoDiv.querySelectorAll(".verBtn").forEach(b => {
            b.onclick = () => {
                const id = b.dataset.id;
                if (!usuarioSelecionado) {
                    alert("Selecione um usuário primeiro.");
                    return;
                }
                sistema.atualizarRegistro(usuarioSelecionado, id, "Assistindo");
                alert("Marcado como Assistindo.");
            };
        });   
    }

    // handlers dos botões (usar usuarioSelecionado)
    if (btnVerFavoritos) {
        btnVerFavoritos.onclick = () => {
            if (!usuarioSelecionado) {
                outputRecomendacao && (outputRecomendacao.textContent = "Selecione um usuário.");
                return;
            }
            const usuario = sistema.buscarUsuario(usuarioSelecionado);
            if (!usuario || usuario.favoritos.length === 0) {
                outputRecomendacao && (outputRecomendacao.textContent = `${usuarioSelecionado} não possui favoritos.`);
                return;
            }
            const linhas = usuario.favoritos.map(id => {
                const t = sistema.buscarTituloPorId(id);
                return t ? `- ${t.titulo} (${t.tipo}) — ${t.plataforma}` : `- (título removido)`;
            });
            outputRecomendacao && (outputRecomendacao.textContent = `Favoritos de ${usuarioSelecionado}:\n` + linhas.join("\n"));
        };
    }

    if (btnVerAssistindo) {
        btnVerAssistindo.onclick = () => {
            if (!usuarioSelecionado) {
                outputRecomendacao && (outputRecomendacao.textContent = "Selecione um usuário.");
                return;
            }
            const lista = sistema.listarAssistindo(usuarioSelecionado);
            if (lista.length === 0) {
                outputRecomendacao && (outputRecomendacao.textContent = `${usuarioSelecionado} não está assistindo nada no momento.`);
                return;
            }
            outputRecomendacao && (outputRecomendacao.textContent = `O que ${usuarioSelecionado} está assistindo:\n` + lista.map(l => `- ${l.titulo.titulo} (${l.titulo.tipo})`).join("\n"));
        };
    }

    if (btnRecomendar) {
        btnRecomendar.onclick = () => {
            if (!usuarioSelecionado) {
                outputRecomendacao && (outputRecomendacao.textContent = "Selecione um usuário.");
                return;
            }
            const recs = sistema.recomendarParaUsuario(usuarioSelecionado);
            if (recs.length === 0) {
                outputRecomendacao && (outputRecomendacao.textContent = "Sem recomendações novas para esse usuário.");
                return;
            }
            outputRecomendacao && (outputRecomendacao.textContent = `Recomendações para ${usuarioSelecionado} (gênero favorito: ${sistema.buscarUsuario(usuarioSelecionado).generoFavorito}):\n` + recs.map(r => `- ${r.titulo} (${r.plataforma})`).join("\n"));
        };
    }

    // inicialização: renderiza usuários e catálogo
    mostrarUsuariosComoCards();
    mostrarCatalogo();

    // se houver select antigo e quiser manter compatibilidade, atualiza usuarioSelecionado quando ele mudar
    if (selectUsuario) {
        selectUsuario.onchange = () => {
            if (selectUsuario.value) setUsuarioSelecionado(selectUsuario.value);
        };
    }

    // -------- Sistema de avaliacao popup ---------
    const popup = byId("popupAvaliacao");
    const popupTitulo = byId("popupTitulo");
    const notaInput = byId("notaInput");
    const btnCancelarAvaliacao = byId("btnCancelarAvaliacao");
    const btnSalvarAvaliacao = byId("btnSalvarAvaliacao");

    let tituloParaAvaliar = null;

    // abrir popup
    function abrirPopupAvaliacao(titulo) {
        tituloParaAvaliar = titulo;
        popupTitulo.textContent = titulo.titulo;
        notaInput.value = 10;
        popup.style.display = "block";
    }

    // fechar popup
    function fecharPopup() {
        popup.style.display = "none";
        tituloParaAvaliar = null;
    }

    btnCancelarAvaliacao.onclick = fecharPopup;

    btnSalvarAvaliacao.onclick = () => {
        if (!usuarioSelecionado) {
            alert("Selecione um usuário primeiro.");
            return;
        }
        const nota = Number(notaInput.value);
        if (nota < 1 || nota > 10) {
            alert("Nota deve ser entre 1 e 10.");
            return;
        }

        sistema.atualizarRegistro(usuarioSelecionado, tituloParaAvaliar.id, "Concluído", nota);
        fecharPopup();
        mostrarCatalogo(); // atualiza as notas no catálogo
        alert("Avaliação salva!");
    };
});

    // Página: cadastrar-usuario.html
    const formUsuario = byId("formUsuario");
    const output = byId("output");
    if (formUsuario && output) {
        const fotoInput = byId("fotoUsuario");
        const previewFoto = byId("previewFotoUsuario");

        let fotoBase64Temp;

        // mostrar prévia
        fotoInput?.addEventListener("change", () => {
            const file = fotoInput.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    fotoBase64Temp = e.target.result;
                    previewFoto.src = fotoBase64Temp;
                    previewFoto.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });

        formUsuario.onsubmit = (ev) => {
            ev.preventDefault();
            const nome = (byId("nome")).value.trim();
            const idade = Number((byId("idade")).value);
            const genero = (byId("generoFavorito")).value;
            if (!nome) {
                output.textContent = "Nome é obrigatório.";
                return;
            }
            try {
                const u = new Usuario(nome, idade, genero, fotoBase64Temp);
                sistema.adicionarUsuario(u);
                output.textContent = `✅ Usuário "${nome}" adicionado com sucesso.`;
            }
            catch (err) {
                output.textContent = `❌ Erro: ${err.message}`;
            }
        };
    }

    // Página: cadastrar-titulo.html
    const formTitulo = byId("formTitulo");
    const outputTitulo = byId("outputTitulo");
    const tipoSelect = byId("tipo");
    if (tipoSelect) {
        tipoSelect.onchange = () => {
            const show = tipoSelect.value === "Série";
            const extras = byId("extrasSerie");
            extras.style.display = show ? "block" : "none";
        };
    }

    if (formTitulo && outputTitulo) {
        const imagemFileInput = byId("imagemFile");
        const preview = byId("previewImagem");
        let imagemBase64Temp;
        // Mostrar prévia ao escolher imagem
        if (imagemFileInput && preview) {
            imagemFileInput.addEventListener("change", () => {
                var _a;
                const file = (_a = imagemFileInput.files) === null || _a === void 0 ? void 0 : _a[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        var _a;
                        imagemBase64Temp = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                        preview.src = imagemBase64Temp;
                        preview.style.display = "block";
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        formTitulo.onsubmit = (ev) => {
            ev.preventDefault();
            const tituloTxt = (byId("titulo")).value.trim();
            const tipo = (byId("tipo")).value;
            const genero = (byId("genero")).value;
            const plataforma = (byId("plataforma")).value;
            const ano = Number((byId("ano")).value) || undefined;
            if (!tituloTxt) {
                outputTitulo.textContent = "Título é obrigatório.";
                return;
            }
            try {
                const id = uid("t_");
                if (tipo === "Série") {
                    const temp = Number((byId("temporadas")).value) || 1;
                    const epis = Number((byId("episodios")).value) || 1;
                    const s = new Serie(id, tituloTxt, genero, plataforma, temp, epis, ano, imagemBase64Temp);
                    sistema.registrarTitulo(s);
                }
                else {
                    const f = new Filme(id, tituloTxt, genero, plataforma, ano, imagemBase64Temp);
                    sistema.registrarTitulo(f);
                }
                outputTitulo.textContent = `✅ "${tituloTxt}" adicionado ao catálogo.`;
                formTitulo.reset();
                preview.style.display = "none";
                imagemBase64Temp = undefined;
            }
            catch (err) {
                outputTitulo.textContent = `❌ Erro: ${err.message}`;
            }
        };
    };

