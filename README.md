# mixtape-yungluxn — atualização: player e páginas individuais

Esta versão inclui:
- player fixo que continua tocando durante a navegação entre páginas internas;
- tracklist com duração total e indicador da faixa selecionada;
- endereço individual para cada projeto, com suporte a link direto na Vercel.

## Atualizar o site já publicado

Substitua na **raiz** do repositório do GitHub os arquivos `index.html`, `script.js` e `style.css`. Adicione também `vercel.json` na raiz. Os arquivos `playlists.js`, a capa e a pasta `audio` existentes **não precisam ser alterados**.

No GitHub Desktop, faça **Commit to main** e **Push origin**. Quando a Vercel indicar **Ready**, atualize a página com Ctrl+F5.

## Endereço do projeto

`https://mixtape-yunglxun.vercel.app/projetos/based-positive-squad-mixtape-vol-2`

O `vercel.json` é essencial para que um link direto para a página do projeto funcione ao abrir ou recarregar o navegador. O player permanece ativo ao navegar **dentro do site**, sem recarregamento completo. Ao atualizar a página ou abrir um link em outra aba, a reprodução não é preservada.

## Dependências existentes

O projeto atual continua usando `playlists.js`, a imagem `based-positive-squad-mixtape-vol-2-cover.png` e os 11 MP3 dentro de `audio/`.
