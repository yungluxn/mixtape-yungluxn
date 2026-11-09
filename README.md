# mixtape-yungluxn — biblioteca musical

Este site tem um projeto: **BASED POSITIVE SQUAD VOL. 2** (Mixtape, 2027), com 11 faixas em MP3 (320 kbps). A capa é provisória.

## Como testar

Abra `index.html` no navegador, clique na capa e escolha uma música. O player permite pausar, avançar e voltar; a próxima faixa começa automaticamente ao terminar a atual.

## Como publicar (GitHub + Vercel)

1. Extraia todo o ZIP no computador.
2. No repositório `mixtape-yungluxn` do GitHub, abra `Add file > Upload files`.
3. Envie `index.html`, `style.css`, `script.js`, `playlists.js` e `README.md` para a raiz do repositório.
4. **Crie a pasta `audio` no repositório com os onze arquivos MP3 dentro dela.** No GitHub pelo navegador é possível arrastar uma pasta em navegadores compatíveis; caso não funcione, use o GitHub Desktop para enviar a pasta inteira, ou abra o caminho `audio/` e envie os MP3 ali.
5. Faça o commit na branch usada pela Vercel. Em Vercel > Deployments, confirme que a atualização está em `Ready`.

**Atenção:** sem a pasta `audio` no repositório, o player aparecerá mas as músicas não tocarão. Envie somente faixas que você tenha direitos para disponibilizar publicamente.

## Como editar

Edite `playlists.js` para mudar títulos e ordem da tracklist. As faixas são lidas a partir da pasta `audio/`. Para colocar capa oficial, crie uma pasta `capas` com a imagem e adicione ao objeto de projeto `cover: "capas/nome-da-capa.jpg",`.

## Armazenamento

A pasta `audio` pesa aproximadamente 53 MB. Para uma biblioteca pessoal pequena pode funcionar em hospedagem estática, mas confira os limites e termos atuais do GitHub/Vercel. Em projetos maiores, considere armazenamento de áudio separado. O repositório público permite que qualquer pessoa baixe as faixas, mesmo que não exista botão de download no site.
