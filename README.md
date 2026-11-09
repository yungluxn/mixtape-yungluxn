# mixtape-yungluxn — biblioteca minimalista

Portfólio de projetos musicais em uma página só: nome, apresentação curta, grade de projetos e janelas com detalhes das faixas. Sem menu de gêneros, filtros, seção Sobre ou player permanente.

## Como abrir
Abra `index.html` no navegador.

## Como editar os projetos
Edite `playlists.js`: cada item de `PLAYLISTS` representa um projeto. Troque os seis exemplos fictícios pelos seus próprios projetos, com `title`, `subtitle`, `year`, `description` e `tracks`. Use `cover` com o link HTTPS direto de uma imagem ou com o caminho de um arquivo adicionado ao repositório (por exemplo, `capas/meu-album.jpg`). Caso não tenha imagem, `colors` e `symbol` geram uma capa provisória.

Cada faixa pode ter `{title: 'nome', artist: 'nome', url: 'https://...'}` para abrir um link externo. Se tiver um arquivo de áudio com permissão de publicação, `audio` pode apontar para ele. Não disponibilize gravações de terceiros sem os direitos necessários.

## Atualizar no GitHub
1. Extraia o arquivo ZIP.
2. Abra o repositório no GitHub.
3. Use **Add file > Upload files** e envie os cinco arquivos da pasta (não o ZIP), na raiz do repositório.
4. Confirme **Commit changes**; se aparecer uma opção de substituir arquivos de mesmo nome, confirme.
5. Confira o novo deploy na Vercel. O site antigo continua disponível enquanto o novo é preparado.

Se o GitHub não permitir a substituição em massa pelo navegador, abra cada arquivo existente, clique no ícone de lápis (Edit), substitua seu conteúdo pelo novo arquivo e faça Commit. Outra opção é usar GitHub Desktop.

## Arquivos
- `index.html`: estrutura
- `style.css`: aparência
- `script.js`: funcionamento
- `playlists.js`: conteúdo dos projetos
- `README.md`: instruções
