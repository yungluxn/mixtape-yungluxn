# Painel administrativo — mixtape-yungluxn

## Arquivos a colocar no GitHub
Copie `index.html`, `script.js`, a pasta `admin/` e a pasta `data/` para a RAIZ do repositório. `vercel.json` é igual ao anterior e só precisa ser copiado se ele ainda não existir. NÃO substitua `style.css`, `playlists.js`, a pasta `audio/` ou a capa oficial.

## Ativar Decap Turbo (plano grátis: 1 site e 1 usuário)
1. Cadastre-se em https://turbo.decapcms.org e crie uma organização Free.
2. Em Git connection, instale/autorize o aplicativo Turbo GitHub APENAS para `yungluxn/mixtape-yungluxn`.
3. Em Sites, crie um site com repo `yungluxn/mixtape-yungluxn`, branch `main`, config path `admin/config.yml`, admin interface URL `https://mixtape-yunglxun.vercel.app/admin/`.
4. Copie o **Site ID** gerado no Turbo.
5. Abra `admin/config.yml`, substitua `COLE_AQUI_O_SITE_ID` pelo ID real e salve com commit / push.
6. Aguarde a Vercel exibir Ready e abra `https://mixtape-yunglxun.vercel.app/admin/`. Faça login com o usuário autorizado pelo Turbo.
7. Entre em Biblioteca musical → Projetos e tracklists e edite os dados. Salvar cria commit no GitHub, e a Vercel publica a alteração.

## Observações importantes
- O site agora lê `data/projects.json`. `playlists.js` antigo pode continuar no GitHub, mas não será mais carregado.
- Todas as 11 faixas são referenciadas pelos MP3 já existentes na pasta `audio/`, que você não deve excluir.
- A capa antiga é referenciada pelo nome `based-positive-squad-mixtape-vol-2-cover.png` e continua funcionando.
- A ordem das faixas pode ser alterada no widget de lista. A duração é informada manualmente, não calculada automaticamente pelo CMS.
- Para uploads de novos áudios grandes, continue usando GitHub Desktop por enquanto: o limite de arquivos do GitHub e as restrições do CMS podem impedir upload de MP3 grandes pelo navegador. O painel inicial edita títulos, ordem, capa, descrição e caminhos dos arquivos.
- A URL `/admin/` é pública, mas a edição exige login autorizado; o login não é uma senha incluída no código do site.
- Depois de salvar pelo painel, use Fetch/Pull no GitHub Desktop antes da próxima edição local.
- Faça backup do repositório antes da primeira publicação desta mudança.
