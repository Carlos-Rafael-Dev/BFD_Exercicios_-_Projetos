CineTrack – Sistema de Catálogo, Avaliação e Gerenciamento de Títulos
🎯 Visão Geral

O CineTrack é uma aplicação web para gerenciamento de filmes e séries, permitindo que usuários mantenham um catálogo personalizado, registrem progresso, avaliem títulos, organizem sua lista por status e acompanhem recomendações baseadas em preferências individuais.

O foco deste projeto é demonstrar boas práticas de modelagem orientada a objetos, organização de código, persistência de dados no browser e escalabilidade através de TypeScript.

Meu papel foi o desenvolvimento completo do script do sistema, incluindo lógica de negócio, modelagem das classes, persistência dos dados e integração com a interface.

🧩 Principais Funcionalidades Implementadas
✔ Cadastro de usuários com foto

Suporte a imagem em Base64 e armazenamento local.

✔ Catálogo de filmes e séries

Suporte a plataformas (Netflix, Prime Video, Disney+, HBO Max)

Classificação por gênero

Identificação de tipo (Filme ou Série)

Suporte a imagem em Base64

✔ Registro de visualizações

Cada usuário possui um histórico independente, incluindo:

Status do título

Data de início e conclusão

Avaliação individual

✔ Sistema de avaliação

Cada usuário avalia separadamente

As notas são salvas no localStorage

Exibição da nota do usuário atual

Cálculo automático da média geral do título

✔ Recomendação personalizada

Sugestões baseadas no gênero favorito do usuário, excluindo títulos já vistos.

✔ Persistência de dados

Todo o catálogo, usuários e avaliações permanecem salvos no navegador.

✔ Separação e organização do catálogo

Agrupamento automático por gênero

Cards de títulos com nota do usuário + média geral

Exibição dinâmica ao trocar de usuário

🛠 Arquitetura e Tecnologias
TypeScript

A maior evolução deste projeto foi a migração para TypeScript, trazendo:

Código mais limpo e claro

Segurança de tipos

Facilidade de manutenção

Base mais preparada para futuras expansões

Melhor previsibilidade do comportamento das classes

Redução de erros e retrabalho

“TypeScript transformou como penso a organização de scripts — o projeto ficou escalável, robusto e muito mais fácil de manter.”

🧭 Modelagem com Diagrama de Classes

Antes de iniciar o código, desenvolvi um diagrama de classes UML completo, que guiou toda a estrutura do projeto:

Evitou refatorações desnecessárias

Serviu como “bússola” para o desenvolvimento

Garantiu que todas as entidades estivessem bem definidas

“Percebi o quanto o diagrama de classes auxilia eficiência e produtividade. Foi essencial para manter o código organizado e alinhado aos requisitos.”

🎨 Importância do Design no Figma

Ter uma interface prototipada no Figma é determinante para:

Entender claramente os dados necessários

Organizar corretamente as entidades

Saber exatamente como estruturar usuários, títulos e registros

Elaborar o catálogo, cards e popup de avaliação

Refinar o diagrama de classes antes do código

“Com o Figma guiando a interface, fica muito mais fácil desenhar as classes certas e evitar decisões erradas no meio do caminho.”

📂 Estrutura do Projeto
src/
    script/
        ts/
            types.ts            → Tipos e enums do sistema
            models.ts           → Classes principais (Título, Usuário, Série, Filme...)
            cineTrack.ts        → Lógica central e persistência
            helpers.ts          → Funções utilitárias
            ui/                 → Scripts de interface (popup, cards, catálogo)
index.html            → Interface principal

🧪 Aprendizados Técnicos

Organização de sistemas orientados a objetos

Aplicação de TypeScript para escalabilidade

Persistência com localStorage

Uso de herança e especialização (Filme/Série)

Estruturas relacionais via classes

Regras de negócio desacopladas da UI

Separação modular de responsabilidades

Reconstrução de classes a partir do armazenamento local

Validação e prevenção de dados duplicados