(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  let projects = [];
  const audio = $('#trackPlayer');
  const player = $('#persistentPlayer');
  let playingProject = null;
  let selectedIndex = -1;
  let currentViewProject = null;

  const node = (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
  };
  const safeColor = value => /^#[a-f0-9]{6}$/i.test(value || '') ? value : '#333333';
  const assetUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const uri = new URL(value.replace(/^\/+/, ''), window.location.origin + '/');
      return ['http:', 'https:'].includes(uri.protocol) ? uri.href : null;
    } catch { return null; }
  };
  const projectPath = project => '/projetos/' + encodeURIComponent(project.id);
  function artwork(project, className) {
    const el = node('div', className);
    const image = assetUrl(project.cover);
    if (image) {
      el.style.backgroundImage = `url("${image.replace(/"/g, '%22')}")`;
      el.classList.add('has-image');
    } else {
      const [one, two] = project.colors || [];
      el.style.background = `linear-gradient(135deg,${safeColor(one)},${safeColor(two)})`;
      el.append(node('span', 'cover-symbol', project.symbol || '◉'));
    }
    return el;
  }
  const durationSeconds = str => {
    const match = /^(?:(\d+):)?(\d+):(\d{2})$/.exec(str || '');
    return match ? (Number(match[1] || 0) * 3600 + Number(match[2]) * 60 + Number(match[3])) : 0;
  };
  const formatTime = seconds => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const s = Math.floor(seconds);
    const hours = Math.floor(s / 3600);
    return hours ? `${hours}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  function markCurrent() {
    document.querySelectorAll('.track-select').forEach(button => {
      const active = playingProject?.id === currentViewProject?.id && Number(button.dataset.trackIndex) === selectedIndex;
      button.classList.toggle('is-current', Boolean(active));
      if (active) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
      const indicator = button.querySelector('.track-playing-indicator');
      if (indicator) indicator.textContent = active && !audio.paused ? '♫' : (active ? 'Ⅱ' : '');
    });
  }
  function renderPlayer() {
    if (!playingProject || selectedIndex < 0) return;
    const track = playingProject.tracks[selectedIndex];
    $('#playerTitle').textContent = track.title || 'Sem título';
    $('#playerArtist').textContent = (playingProject.subtitle || 'Yung Luxn').split('·')[0].trim();
    $('#playerCover').replaceChildren(artwork(playingProject, 'player-cover-image'));
    $('#playButton').textContent = audio.paused ? '▶' : 'Ⅱ';
    $('#playButton').setAttribute('aria-label', audio.paused ? 'Reproduzir' : 'Pausar');
    $('#prevButton').disabled = selectedIndex <= 0;
    $('#nextButton').disabled = selectedIndex >= playingProject.tracks.length - 1;
    player.hidden = false;
    document.body.classList.add('has-player');
    markCurrent();
    syncExpandedPlayer();
  }
  // Uma única tag <audio> alimenta o player compacto e o ampliado.
  const expandedDialog = $('#expandedPlayer');
  const expandedSeek = $('#expandedSeek');
  const expandedPlay = $('#expandedPlay');
  const expandedOpenButton = $('#openExpandedPlayer');
  let expandedReturnFocus = null;

  function syncExpandedPlayer() {
    if (!playingProject || selectedIndex < 0) return;
    const track = playingProject.tracks[selectedIndex];
    $('#expandedTitle').textContent = track.title || 'Sem título';
    $('#expandedArtist').textContent = (playingProject.subtitle || 'Yung Luxn').split('·')[0].trim();
    $('#expandedAlbum').textContent = playingProject.title || '';
    const cover = $('#expandedCover');
    const trackKey = playingProject.id + ':' + selectedIndex;
    if (cover.dataset.trackKey !== trackKey) {
      cover.replaceChildren(artwork(playingProject, 'expanded-cover-image'));
      cover.dataset.trackKey = trackKey;
    }
    expandedPlay.textContent = audio.paused ? '▶' : 'Ⅱ';
    expandedPlay.setAttribute('aria-label', audio.paused ? 'Reproduzir' : 'Pausar');
    $('#expandedPrev').disabled = selectedIndex <= 0;
    $('#expandedNext').disabled = selectedIndex >= playingProject.tracks.length - 1;
    $('#expandedElapsed').textContent = formatTime(audio.currentTime);
    $('#expandedTotal').textContent = Number.isFinite(audio.duration) && audio.duration > 0 ? formatTime(audio.duration) : (track.duration || '0:00');
    expandedSeek.value = Number.isFinite(audio.duration) && audio.duration > 0 ? String(100 * audio.currentTime / audio.duration) : '0';
    $('#expandedError').hidden = $('#audioError').hidden;
  }

  function togglePlayback() {
    if (!audio.src) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  function openExpandedPlayer() {
    if (!playingProject || !window.matchMedia('(max-width: 760px)').matches || expandedDialog.open) return;
    expandedReturnFocus = document.activeElement;
    syncExpandedPlayer();
    expandedDialog.showModal();
    document.body.classList.add('expanded-player-open');
  }

  function closeExpandedPlayer() {
    if (expandedDialog.open) expandedDialog.close();
  }

  expandedOpenButton.onclick = openExpandedPlayer;
  $('#closeExpandedPlayer').onclick = closeExpandedPlayer;
  expandedDialog.addEventListener('close', () => {
    document.body.classList.remove('expanded-player-open');
    if (expandedReturnFocus?.isConnected) expandedReturnFocus.focus({ preventScroll: true });
    expandedReturnFocus = null;
  });
  $('#expandedPrev').onclick = () => jump(-1);
  $('#expandedNext').onclick = () => jump(1);
  expandedPlay.onclick = togglePlayback;
  expandedSeek.oninput = event => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = audio.duration * Number(event.target.value) / 100;
  };
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
    if (event.matches) closeExpandedPlayer();
  });

  function chooseTrack(project, index, autoplay = true) {
    const track = project?.tracks?.[index];
    const src = assetUrl(track?.audio);
    if (!src) return;
    const changed = playingProject?.id !== project.id || selectedIndex !== index;
    playingProject = project;
    selectedIndex = index;
    $('#audioError').hidden = true;
    if (changed) {
      audio.src = src;
      audio.load();
      $('#seekBar').value = '0';
      $('#elapsedTime').textContent = '0:00';
      $('#totalTime').textContent = track.duration || '0:00';
    }
    renderPlayer();
    if (autoplay) audio.play().then(renderPlayer).catch(() => { renderPlayer(); });
  }
  function jump(delta) {
    if (!playingProject) return;
    const to = selectedIndex + delta;
    if (to >= 0 && to < playingProject.tracks.length) chooseTrack(playingProject, to);
  }
  function renderTracklist(project) {
    const list = $('#projectTracks');
    list.replaceChildren();
    const tracks = project.tracks || [];
    const seconds = tracks.reduce((sum, track) => sum + durationSeconds(track.duration), 0);
    $('#trackSummary').textContent = `${tracks.length} ${tracks.length === 1 ? 'faixa' : 'faixas'} · ${formatTime(seconds)}`;
    if (!tracks.length) { list.append(node('p', 'no-tracks', 'Tracklist em breve.')); return; }
    tracks.forEach((track, index) => {
      const row = node('div', 'track');
      const button = node('button', 'track-select');
      button.type = 'button';
      button.dataset.trackIndex = String(index);
      button.append(node('span', 'track-index', String(index + 1).padStart(2, '0')));
      button.append(node('span', 'track-name', track.title || 'Sem título'));
      button.append(node('span', 'track-duration', track.duration || ''));
      button.append(node('span', 'track-playing-indicator', ''));
      if (assetUrl(track.audio)) button.onclick = () => chooseTrack(project, index);
      else button.disabled = true;
      row.append(button);
      list.append(row);
    });
    markCurrent();
  }
  function renderHome() {
    $('#homeView').hidden = false;
    $('#projectView').hidden = true;
    $('#notFoundView').hidden = true;
    currentViewProject = null;
    document.title = 'mixtape-yungluxn — projetos';
  }
  const coverLightbox = $('#coverLightbox');
  const enlargedCover = $('#enlargedCover');
  const openCoverButton = $('#openCoverButton');
  const closeCoverButton = $('#closeCoverButton');
  let coverReturnFocus = null;

  function openCover(project) {
    const image = assetUrl(project?.cover);
    if (!image || coverLightbox.open) return;
    enlargedCover.src = image;
    enlargedCover.alt = `Capa do álbum ${project.title}`;
    coverReturnFocus = document.activeElement;
    coverLightbox.showModal();
  }

  function closeCover() {
    if (coverLightbox.open) coverLightbox.close();
  }

  closeCoverButton.onclick = closeCover;
  coverLightbox.addEventListener('click', event => {
    // Clicar na área escura fora da imagem fecha a ampliação.
    if (event.target === coverLightbox) closeCover();
  });
  coverLightbox.addEventListener('close', () => {
    enlargedCover.removeAttribute('src');
    if (coverReturnFocus?.isConnected) coverReturnFocus.focus({ preventScroll: true });
    coverReturnFocus = null;
  });

  function renderProject(project) {
    currentViewProject = project;
    $('#homeView').hidden = true;
    $('#projectView').hidden = false;
    $('#notFoundView').hidden = true;
    $('#projectCover').replaceChildren(artwork(project, 'release-cover-image'));
    openCoverButton.disabled = !assetUrl(project.cover);
    openCoverButton.onclick = () => openCover(project);
    $('#projectYear').textContent = project.year || '';
    $('#projectTitle').textContent = project.title;
    $('#projectArtist').textContent = (project.subtitle || '').split('·')[0].trim();
    $('#projectDescription').textContent = project.description || 'Projeto em desenvolvimento.';
    const playProjectButton = $('#playProjectButton');
    const firstPlayable = (project.tracks || []).findIndex(track => assetUrl(track.audio));
    playProjectButton.disabled = firstPlayable === -1;
    playProjectButton.onclick = () => {
      if (firstPlayable >= 0) chooseTrack(project, firstPlayable);
    };
    renderTracklist(project);
    document.title = `${project.title} — mixtape-yungluxn`;
  }
  function resolveRoute() {
    const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '') || '/';
    const match = /^\/projetos\/([^/]+)$/.exec(path);
    if (path === '/') renderHome();
    else if (match) {
      const project = projects.find(item => item.id === match[1]);
      if (project && project.published !== false) renderProject(project);
      else { $('#homeView').hidden = true; $('#projectView').hidden = true; $('#notFoundView').hidden = false; currentViewProject = null; }
    } else { $('#homeView').hidden = true; $('#projectView').hidden = true; $('#notFoundView').hidden = false; currentViewProject = null; }
    window.scrollTo({top: 0, behavior: 'instant'});
  }
  function navigate(path) {
    if (window.location.pathname !== path) history.pushState({}, '', path);
    resolveRoute();
  }

  async function loadProjects() {
    try {
      const response = await fetch('/data/projects.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data.projects)) throw new Error('Formato inválido');
      projects = data.projects;
      const container = $('#projectsList');
      container.replaceChildren();
      projects.filter(project => project.published !== false).forEach(project => {
        const wrapper = node('div', 'project-card-container');
        const link = node('a', 'project-card');
        link.href = projectPath(project);
        link.setAttribute('aria-label', 'Abrir projeto ' + project.title);
        const coverArea = node('div', 'project-cover-area');
        const coverLink = node('a', 'project-cover-link');
        coverLink.href = link.href;
        coverLink.setAttribute('aria-label', 'Abrir capa do projeto ' + project.title);
        coverLink.append(artwork(project, 'project-cover'));
        coverLink.onclick = event => { if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); navigate(coverLink.getAttribute('href')); } };
        coverArea.append(coverLink);
        link.append(node('span', 'project-title', project.title), node('span', 'project-subtitle', project.subtitle || project.year || ''));
        link.onclick = event => { if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); navigate(link.getAttribute('href')); } };
        wrapper.append(coverArea, link);
        if ((project.tracks || []).some(track => assetUrl(track.audio))) {
          const homePlay = node('button', 'project-play-action album-play-button');
          homePlay.type = 'button';
          homePlay.setAttribute('aria-label', 'Reproduzir ' + project.title + ' desde a primeira faixa');
          homePlay.title = 'Reproduzir do início';
          homePlay.onclick = () => {
            const first = (project.tracks || []).findIndex(track => assetUrl(track.audio));
            if (first >= 0) chooseTrack(project, first);
          };
          coverArea.append(homePlay);
        }
        container.append(wrapper);
      });
      const count = container.childElementCount;
      $('#projectCount').textContent = `${count} ${count === 1 ? 'projeto' : 'projetos'}`;
      $('#emptyState').hidden = count !== 0;
    } catch (error) {
      console.error('Falha ao carregar biblioteca:', error);
      $('#emptyState').hidden = false;
      $('#emptyState').textContent = 'Não foi possível carregar a biblioteca. Atualize a página.';
    }
    resolveRoute();
  }
  ['homeLink', 'backLink', 'notFoundLink'].forEach(id => {
    $('#' + id).onclick = event => { if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); navigate('/'); } };
  });
  $('#year').textContent = new Date().getFullYear();
  $('#prevButton').onclick = () => jump(-1);
  $('#nextButton').onclick = () => jump(1);
  $('#playButton').onclick = togglePlayback;
  $('#volumeBar').oninput = event => { audio.volume = Number(event.target.value); };
  audio.volume = Number($('#volumeBar').value);
  $('#seekBar').oninput = event => { if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = audio.duration * (Number(event.target.value) / 100); };
  audio.addEventListener('timeupdate', () => {
    $('#elapsedTime').textContent = formatTime(audio.currentTime);
    if (Number.isFinite(audio.duration) && audio.duration > 0) $('#seekBar').value = String((audio.currentTime / audio.duration) * 100);
    syncExpandedPlayer();
  });
  audio.addEventListener('loadedmetadata', () => { $('#totalTime').textContent = formatTime(audio.duration); syncExpandedPlayer(); });
  audio.addEventListener('play', renderPlayer);
  audio.addEventListener('pause', renderPlayer);
  audio.addEventListener('ended', () => { if (playingProject && selectedIndex + 1 < playingProject.tracks.length) jump(1); });
  audio.addEventListener('error', () => { $('#audioError').textContent = 'Não foi possível carregar esta faixa. Confira se o arquivo MP3 está na pasta audio.'; $('#audioError').hidden = false; syncExpandedPlayer(); });
  window.addEventListener('popstate', resolveRoute);
  loadProjects();
})();
