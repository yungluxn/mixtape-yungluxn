# mixtape-yungluxn — Biblioteca musical

Site estático com visual escuro inspirado em bibliotecas musicais desktop. Não exige conta, banco de dados nem instalação de pacotes.

## Testar
Abra `index.html` no navegador.

## Personalizar
Edite `playlists.js`. Cada playlist pode ter:

- `title`, `subtitle`, `description`, `genre`, `year` — informações textuais.
- `colors` e `symbol` — capa abstrata gerada por CSS (se não houver imagem).
- `cover` — endereço `https://...` de uma capa que você pode utilizar (opcional). Use URLs HTTPS de imagem que autorizem exibição externa.
- `tracks` — lista de objetos `{ title, artist, url, audio }`.

A propriedade `url` abre um link oficial externo. A propriedade opcional `audio` permite reprodução direta **somente** se você indicar a URL de um arquivo de áudio para o qual tenha direitos de disponibilização, e se a hospedagem permitir streaming/CORS. Não há upload de músicas pelo site, e os exemplos não incluem arquivos de áudio.

Exemplo:
```js
{
 id: 'minha-lista', title: 'Minha playlist', subtitle: 'Favoritas',
 genre: 'indie', year: 'VOL. 01', colors: ['#5a3040', '#c0875e'],
 symbol: '★', cover: '', description: 'Uma playlist especial',
 tracks: [
   {title: 'Minha faixa', artist: 'Meu artista', url: 'https://exemplo.com/faixa', audio: ''}
 ]
}
```

## Publicar pelo GitHub + Vercel
1. Crie um repositório público no GitHub chamado `mixtape-yungluxn`.
2. Faça upload dos arquivos `index.html`, `style.css`, `script.js`, `playlists.js`, `README.md` **na raiz do repositório**, sem enviar apenas o arquivo ZIP.
3. Na Vercel, vá a **Add New > Project**, conecte o GitHub e importe o repositório.
4. Para projeto HTML/CSS/JS, use Framework Preset **Other**; deixe o build command vazio e o Root Directory como `./`.
5. Clique em **Deploy**.

Para atualizar, edite e envie os arquivos pelo GitHub. A publicação é feita automaticamente se a integração estiver configurada.

## Observações
- Planos gratuitos possuem limites de uso e termos próprios. Confirme o enquadramento do projeto e os limites nos sites oficiais.
- Para disponibilizar faixas e capas, respeite os direitos autorais; não use músicas comerciais sem autorização para redistribuição.
- A busca e as playlists funcionam sem servidor. O player só reproduz uma faixa se houver um endereço `audio` válido e acessível.
