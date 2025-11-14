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
    constructor(nome, idade, generoFavorito) {
        this.nome = nome;
        this.idade = idade;
        this.generoFavorito = generoFavorito;
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
            this.usuarios = (parsed.usuarios || []).map((u) => Object.assign(new Usuario(u.nome, u.idade, u.generoFavorito), {
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
seedCatalogo();
// ---------- Utilidades (UI helpers) ----------
function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}
function byId(id) {
    return document.getElementById(id);
}

// ---------- Catálogo pré-cadastrado ----------
function seedCatalogo() {
    // Se já existir algo no catálogo, não sobrescreve
    if (sistema.catalogo.length > 0) return;

    const seeds = [
        new Filme(uid("t_"), "Toy Story", "Animação", "Netflix", 2000, "./assets/catalogo/animacao/TS1.jpg"),
        new Filme(uid("t_"), "Toy Story 2", "Animação", "Netflix", 2004, "./assets/catalogo/animacao/TS2.webp"),
        new Filme(uid("t_"), "Toy Story 3", "Animação", "Netflix", 2006, "./assets/catalogo/animacao/TS3.avif"),
        new Filme(uid("t_"), "Toy Story 4", "Animação", "Netflix", 2014, "./assets/catalogo/animacao/TS4.webp"),
        new Filme(uid("t_"), "John Wick", "Ação", "Prime Video", 2014, "./assets/catalogo/acao/JW1.jpg"),
        new Filme(uid("t_"), "John Wick 2", "Ação", "Prime Video", 2016, "./assets/catalogo/acao/JW2.webp"),
        new Filme(uid("t_"), "John Wick 3", "Ação", "Prime Video", 2020, "./assets/catalogo/acao/JW3.webp"),
        new Filme(uid("t_"), "John Wick 4", "Ação", "Prime Video", 2023, "./assets/catalogo/acao/JW4.webp"),
        new Filme(uid("t_"), "Harry Potter", "Aventura", "Prime Video", 2000, "./assets/catalogo/aventura/HP1.jpg")
    ];

    seeds.forEach(t => sistema.catalogo.push(t));
    sistema.saveToStorage();
}

// ---------- inicializa funcionalidade dependendo da página ----------
window.addEventListener("DOMContentLoaded", () => {
    // Home (index.html)
    const selectUsuario = byId("selectUsuario");
    const btnVerFavoritos = byId("btnVerFavoritos");
    const btnVerAssistindo = byId("btnVerAssistindo");
    const btnRecomendar = byId("btnRecomendar");
    const outputRecomendacao = byId("outputRecomendacao");
    const catalogoDiv = byId("catalogo");
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
                const imagem = t.imagemBase64
                  ? `<img src="${t.imagemBase64}" alt="${t.titulo}" style="width:100%;border-radius:4px;margin-bottom:6px;">`
                  : `<div style="width:100%;height:120px;background:#333;border-radius:4px;margin-bottom:6px;display:flex;align-items:center;justify-content:center;color:#777;">Sem imagem</div>`;

                
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
            catalogoDiv.querySelectorAll(".favBtn").forEach(b => {
                b.onclick = () => {
                    const id = b.dataset.id;
                    const nomeUsuario = selectUsuario.value;
                    if (!nomeUsuario) {
                        alert("Selecione um usuário primeiro.");
                        return;
                    }
                    try {
                        sistema.favoritarTitulo(nomeUsuario, id);
                        alert("Favorito adicionado!");
                    }
                    catch (e) {
                        alert("Erro: " + e.message);
                    }
                };
            });
            catalogoDiv.querySelectorAll(".verBtn").forEach(b => {
                b.onclick = () => {
                    const id = b.dataset.id;
                    const nomeUsuario = selectUsuario.value;
                    if (!nomeUsuario) {
                        alert("Selecione um usuário primeiro.");
                        return;
                    }
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
                if (!nome) {
                    outputRecomendacao.textContent = "Selecione um usuário.";
                    return;
                }
                const usuario = sistema.buscarUsuario(nome);
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
                if (!nome) {
                    outputRecomendacao.textContent = "Selecione um usuário.";
                    return;
                }
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
                if (!nome) {
                    outputRecomendacao.textContent = "Selecione um usuário.";
                    return;
                }
                const recs = sistema.recomendarParaUsuario(nome);
                if (recs.length === 0) {
                    outputRecomendacao.textContent = "Sem recomendações novas para esse usuário.";
                    return;
                }
                outputRecomendacao.textContent = `Recomendações para ${nome} (gênero favorito: ${sistema.buscarUsuario(nome).generoFavorito}):\n` + recs.map(r => `- ${r.titulo} (${r.plataforma})`).join("\n");
            };
        }
    }
    // Página: cadastrar-usuario.html
    const formUsuario = byId("formUsuario");
    const output = byId("output");
    if (formUsuario && output) {
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
                const u = new Usuario(nome, idade, genero);
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
    }
});



