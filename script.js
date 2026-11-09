(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const projects = typeof PLAYLISTS === 'undefined' ? [] : PLAYLISTS;
  const audio = $('#trackPlayer');
  const dialog = $('#projectDialog');
  let activeProject = null;
  let activeIndex = -1;
  const nowPlaying = $('#nowPlaying');
  const element = (tag, className, label) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (label !== undefined) node.textContent = label;
    return node;
  };
  const safeColor = c => /^#[0-9a-f]{6}$/i.test(c || '') ? c : '#333333';
  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const u = new URL(value, location.href);
      return ['https:', 'http:'].includes(u.protocol) ? u.href : null;
    } catch { return null; }
  }
  function cover(project, cls) {
    const node = element('div', cls);
    const src = safeUrl(project.cover);
    if (src) {
      node.classList.add('has-image');
      node.style.backgroundImage = `url("${src.replace(/"/g, '%22')}")`;
    } else {
      const [first, second] = project.colors || [];
      node.style.background = `linear-gradient(135deg,${safeColor(first)},${safeColor(second)})`;
      node.append(element('span', 'cover-symbol', project.symbol || '◉'));
    }
    return node;
  }
  function selectTrack(index, shouldPlay = true) {
    const tracks = activeProject?.tracks || [];
    if (index < 0 || index >= tracks.length) return;
    const track = tracks[index];
    const src = safeUrl(track.audio);
    if (!src) return;
    activeIndex = index;
    audio.src = src;
    nowPlaying.textContent = `${String(index + 1).padStart(2, '0')} · ${track.title}`;
    nowPlaying.classList.add('has-track');
    document.querySelectorAll('.track-select').forEach((button, i) => {
      button.classList.toggle('is-current', i === index);
      if (i === index) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    updateNavigation();
    if (shouldPlay) audio.play().catch(() => { nowPlaying.textContent = `${track.title} · aperte play para ouvir`; });
  }
  function updateNavigation() {
    const total = activeProject?.tracks?.length || 0;
    $('#previousTrack').disabled = activeIndex <= 0;
    $('#nextTrack').disabled = activeIndex < 0 || activeIndex >= total - 1;
  }
  function openProject(project) {
    audio.pause(); audio.removeAttribute('src'); audio.load();
    activeProject = project; activeIndex = -1;
    const oldCover = $('#dialogCover');
    const newCover = cover(project, 'dialog-cover'); newCover.id = 'dialogCover';
    oldCover.replaceWith(newCover);
    $('#dialogYear').textContent = project.year || 'PROJETO';
    $('#dialogTitle').textContent = project.title || 'Sem título';
    $('#dialogDesc').textContent = project.description || 'Projeto em desenvolvimento.';
    nowPlaying.textContent = 'Selecione uma faixa';
    nowPlaying.classList.remove('has-track');
    updateNavigation();
    const tracks = $('#dialogTracks'); tracks.replaceChildren();
    const available = (project.tracks || []).filter(t => safeUrl(t.audio));
    $('#playerBox').hidden = available.length === 0;
    if (!(project.tracks || []).length) {
      tracks.append(element('p', 'no-tracks', 'Tracklist em breve.'));
    } else {
      project.tracks.forEach((track, i) => {
        const row = element('div', 'track');
        const button = element('button', 'track-select');
        button.type = 'button';
        button.append(element('span', 'track-index', String(i + 1).padStart(2, '0')));
        button.append(element('span', 'track-name', track.title || 'Sem título'));
        button.append(element('span', 'track-duration', track.duration || ''));
        button.append(element('span', 'track-playing-indicator', '♫'));
        if (safeUrl(track.audio)) button.onclick = () => selectTrack(i);
        else button.disabled = true;
        row.append(button);
        tracks.append(row);
      });
    }
    dialog.showModal();
  }
  $('#previousTrack').onclick = () => selectTrack(Math.max(0, activeIndex - 1));
  $('#nextTrack').onclick = () => selectTrack(Math.min((activeProject?.tracks || []).length - 1, activeIndex + 1));
  audio.addEventListener('error', () => {
    if (activeIndex >= 0) nowPlaying.textContent = 'Não foi possível carregar este áudio';
  });
  audio.addEventListener('ended', () => {
    if (activeIndex + 1 < (activeProject?.tracks || []).length) selectTrack(activeIndex + 1);
  });
  const list = $('#projectsList');
  projects.forEach(project => {
    const button = element('button', 'project-card');
    button.type = 'button';
    button.setAttribute('aria-label', 'Ver projeto ' + project.title);
    button.append(cover(project, 'project-cover'), element('span', 'project-title', project.title), element('span', 'project-subtitle', project.subtitle || project.year || ''));
    button.onclick = () => openProject(project);
    list.append(button);
  });
  $('#projectCount').textContent = projects.length + ' ' + (projects.length === 1 ? 'projeto' : 'projetos');
  $('#emptyState').hidden = projects.length !== 0;
  $('#year').textContent = new Date().getFullYear();
  $('#closeDialog').onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { audio.pause(); audio.removeAttribute('src'); audio.load(); activeIndex = -1; });
})();
