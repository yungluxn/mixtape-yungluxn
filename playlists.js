/*
  EDITE AQUI SUAS PLAYLISTS!
  Cada playlist tem: id (único), title, subtitle, genre, year, colors,
  symbol, description e tracks (lista de músicas).
  Para adicionar uma faixa: { title: "Nome", artist: "Artista", url: "https://..." }
  Se não houver URL, a faixa aparecerá sem link. Use links oficiais.
  As playlists abaixo são EXEMPLOS FICTÍCIOS; substitua pelas suas.
*/
const PLAYLISTS = [
  {
    id: "after-hours", title: "after hours", subtitle: "pra quando a cidade dorme", genre: "dream pop", year: "VOL. 01", colors: ["#34356e", "#db70b0"], symbol: "☾", description: "Luzes da cidade, pensamentos soltos e uma madrugada que parece não acabar.",
    tracks: [
      { title: "Sua primeira música", artist: "Seu artista favorito", url: "" },
      { title: "Outra música especial", artist: "Outro artista", url: "" },
      { title: "A última faixa", artist: "Mais um artista", url: "" }
    ]
  },
  {
    id: "pixel-hearts", title: "pixel hearts", subtitle: "amor em 128 kbps", genre: "indie", year: "VOL. 02", colors: ["#ff7cae", "#f1c4fd"], symbol: "♡", description: "Uma coleção de músicas para guardar como mensagens antigas no computador.",
    tracks: [
      { title: "Música que dá saudade", artist: "Artista exemplo", url: "" },
      { title: "Meu refrão favorito", artist: "Artista exemplo", url: "" }
    ]
  },
  {
    id: "blue-screen", title: "blue screen", subtitle: "nostalgia digital", genre: "electronic", year: "VOL. 03", colors: ["#325ed1", "#72dcfc"], symbol: "✳", description: "Uma viagem por pixels, sintetizadores e sons de outro planeta.",
    tracks: [
      { title: "Faixa eletrônica 01", artist: "Artista exemplo", url: "" },
      { title: "Faixa eletrônica 02", artist: "Artista exemplo", url: "" }
    ]
  },
  {
    id: "soft-static", title: "soft static", subtitle: "barulho bom no fone", genre: "alternative", year: "VOL. 04", colors: ["#564683", "#b4a0e5"], symbol: "✿", description: "Guitarras suaves, tardes longas e todas as músicas que ficam na cabeça.",
    tracks: [
      { title: "Aquela música", artist: "Artista exemplo", url: "" },
      { title: "Outra favorita", artist: "Artista exemplo", url: "" }
    ]
  },
  {
    id: "sunset-dialup", title: "sunset dial-up", subtitle: "conectando sentimentos...", genre: "indie", year: "VOL. 05", colors: ["#e38474", "#ffd78e"], symbol: "☼", description: "Fim de tarde com cara de lembrança de férias.",
    tracks: [
      { title: "Primeiro pôr do sol", artist: "Artista exemplo", url: "" }
    ]
  },
  {
    id: "moon-radio", title: "moon radio", subtitle: "transmissão da madrugada", genre: "dream pop", year: "VOL. 06", colors: ["#19275e", "#91b4e0"], symbol: "✧", description: "Uma estação de rádio imaginária que só funciona depois da meia-noite.",
    tracks: [
      { title: "Sinal encontrado", artist: "Artista exemplo", url: "" }
    ]
  }
];
