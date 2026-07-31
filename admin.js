/* ================================================================
   LA CONQUISTA DEL CEMENTERIO — admin.js (lógica del organizador)
   ================================================================ */

// Posiciones y doradas (mismas que en game.js)
const ADMIN_TOMB_POSITIONS = [
  [5,7],[14,4],[23,8],[32,4],[41,7],[50,4],[59,8],[68,4],[77,7],[86,4],
  [8,27],[17,24],[26,28],[35,24],[44,27],[53,24],[62,28],[71,24],[80,27],[89,24],
  [5,50],[14,47],[23,51],[32,47],[41,50],[50,47],[59,51],[68,47],[77,50],[86,47],
  [14,72],[27,69],[41,73],[55,69],[69,72]
];
const ADMIN_GOLDEN = new Set([3, 14, 21, 27, 33]);

// Estado
let adminGameCode = null;
let adminDuration = 30;
let adminTeams    = {};
let adminTombs    = [];
let adminConfig   = null;
let adminTimerInt = null;
let roomCleanupScheduled = false;  // evita programar el borrado de la sala dos veces

// ================================================================
// PANTALLAS
// ================================================================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ================================================================
// CREAR PARTIDA
// ================================================================

async function createGame() {
  const code     = document.getElementById('game-code-input').value.trim().toUpperCase();
  const duration = parseInt(document.getElementById('duration-input').value.trim(), 10);
  const errEl    = document.getElementById('create-error');
  errEl.style.display = 'none';

  if (!code || code.length < 3) { showCreateErr(errEl, 'El código debe tener al menos 3 caracteres'); return; }
  if (!duration || duration < 1 || duration > 120) { showCreateErr(errEl, 'La duración debe estar entre 1 y 120 minutos'); return; }

  // Si ya existe una sala con ese código, ofrecer reemplazarla (permite reusar códigos).
  const snap = await db.ref(`games/${code}`).once('value');
  if (snap.exists()) {
    const st = snap.child('config/status').val();
    const msg = (st === 'finished' || !st)
      ? 'Ya existe una sala con ese código (terminada). ¿La reemplazamos y empezamos de nuevo?'
      : 'Ya existe una sala EN CURSO con ese código. ¿Reemplazarla? Se perderá la partida actual.';
    if (!confirm(msg)) return;
    await db.ref(`games/${code}`).remove();
  }

  adminGameCode = code;
  adminDuration = duration;
  roomCleanupScheduled = false;  // nueva partida: habilitar borrado al finalizar

  // Crear las 35 tumbas con estado inicial
  const tombs = {};
  for (let i = 0; i < 35; i++) {
    tombs[i] = {
      type:       ADMIN_GOLDEN.has(i) ? 'golden' : 'normal',
      state:      'free',
      ownerId:    null,
      ownerColor: null,
      ownerName:  null,
      blockedFor: {}
    };
  }

  await db.ref(`games/${code}`).set({
    config: {
      status:    'waiting',
      startTime: null,
      endTime:   null,
      duration,
      createdAt: Date.now()
    },
    tombs,
    teams: {},
    duels: {}
  });

  localStorage.setItem('cementerio_admin', JSON.stringify({ gameCode: code, duration }));
  showLobby();
}

function showCreateErr(el, msg) { el.textContent = msg; el.style.display = 'block'; }

// ================================================================
// RECONECTAR (admin existente)
// ================================================================

async function rejoinGame() {
  const code = document.getElementById('rejoin-code-input').value.trim().toUpperCase();
  if (!code) { alert('Ingresá un código de sala'); return; }

  const snap = await db.ref(`games/${code}/config`).once('value');
  if (!snap.exists()) { alert('No existe esa partida'); return; }

  adminGameCode = code;
  adminConfig = snap.val();
  adminDuration = adminConfig.duration || 30;
  roomCleanupScheduled = false;  // partida reconectada: habilitar borrado al finalizar
  localStorage.setItem('cementerio_admin', JSON.stringify({ gameCode: code, duration: adminDuration }));

  if (adminConfig.status === 'waiting') {
    showLobby();
  } else if (adminConfig.status === 'active') {
    showAdminGame();
  } else {
    showAdminEnd();
  }
}

// ================================================================
// LOBBY
// ================================================================

function showLobby() {
  showScreen('screen-admin-lobby');
  document.getElementById('lobby-code-display').textContent = adminGameCode;

  // Escuchar equipos en tiempo real
  db.ref(`games/${adminGameCode}/teams`).on('value', snap => {
    adminTeams = {};
    const container = document.getElementById('lobby-teams');
    container.innerHTML = '';
    if (snap.exists()) {
      snap.forEach(child => {
        adminTeams[child.key] = child.val();
        const chip = document.createElement('div');
        chip.className = 'lobby-team-chip';
        chip.innerHTML = `
          <span class="dot" style="background:${child.val().color};width:10px;height:10px;border-radius:50%;display:inline-block;"></span>
          ${child.val().name}
        `;
        container.appendChild(chip);
      });
    }
    const count = Object.keys(adminTeams).length;
    document.getElementById('lobby-status').textContent =
      count === 0 ? 'Esperando equipos...' : `${count} equipo${count > 1 ? 's' : ''} en sala`;
    document.getElementById('btn-start').disabled = count === 0;
  });

  // Escuchar status (por si ya empezó)
  db.ref(`games/${adminGameCode}/config/status`).on('value', snap => {
    if (snap.val() === 'active') showAdminGame();
  });
}

// ================================================================
// ARRANCAR EL JUEGO
// ================================================================

async function startGame() {
  const btn = document.getElementById('btn-start');
  btn.disabled = true;
  btn.textContent = 'Iniciando...';

  await db.ref(`games/${adminGameCode}/config`).update({
    status:    'active',
    startTime: firebase.database.ServerValue.TIMESTAMP,
  });

  // Leer startTime real del servidor para calcular endTime
  const snap = await db.ref(`games/${adminGameCode}/config/startTime`).once('value');
  const startTime = snap.val();
  await db.ref(`games/${adminGameCode}/config/endTime`).set(startTime + adminDuration * 60 * 1000);

  showAdminGame();
}

// ================================================================
// VISTA DE JUEGO (admin)
// ================================================================

function showAdminGame() {
  showScreen('screen-admin-game');
  document.getElementById('admin-code-badge').textContent = adminGameCode;

  // Leer config actualizada
  db.ref(`games/${adminGameCode}/config`).once('value', snap => {
    adminConfig = snap.val();
    adminDuration = adminConfig.duration || 30;
    startAdminTimer();
  });

  // Escuchar equipos
  db.ref(`games/${adminGameCode}/teams`).on('value', snap => {
    adminTeams = {};
    if (snap.exists()) snap.forEach(c => { adminTeams[c.key] = c.val(); });
    document.getElementById('stat-teams').textContent = Object.keys(adminTeams).length;
    renderAdminScoreboard();
  });

  // Escuchar tumbas
  db.ref(`games/${adminGameCode}/tombs`).on('value', snap => {
    adminTombs = [];
    if (snap.exists()) snap.forEach(c => { adminTombs[parseInt(c.key)] = c.val(); });
    renderAdminMap();
    updateStats();
  });

  // Escuchar fin del juego
  db.ref(`games/${adminGameCode}/config/status`).on('value', snap => {
    if (snap.val() === 'finished') showAdminEnd();
  });
}

// ================================================================
// TIMER ADMIN
// ================================================================

function startAdminTimer() {
  clearInterval(adminTimerInt);
  adminTimerInt = setInterval(updateAdminTimer, 500);
  updateAdminTimer();
}

function updateAdminTimer() {
  if (!adminConfig || !adminConfig.startTime) return;
  const endTime  = adminConfig.startTime + (adminConfig.duration || 30) * 60 * 1000;
  const remaining = Math.max(0, endTime - Date.now());
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const el = document.getElementById('admin-timer');
  if (!el) return;
  el.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  el.className = remaining < 5 * 60000 ? 'urgent' : '';
  if (remaining === 0) {
    clearInterval(adminTimerInt);
    endGameManual();
  }
}

// ================================================================
// MAPA ADMIN
// ================================================================

function renderAdminMap() {
  const map = document.getElementById('admin-cemetery-map');
  if (!map) return;

  renderBoard(map, ADMIN_TOMB_POSITIONS);
  renderDecor(map);

  adminTombs.forEach((tomb, idx) => {
    if (!tomb) return;
    const pos = ADMIN_TOMB_POSITIONS[idx];
    if (!pos) return;

    let el = map.querySelector(`[data-idx="${idx}"]`);
    if (!el) {
      el = document.createElement('div');
      el.dataset.idx = idx;
      map.appendChild(el);
    }

    const isGolden    = ADMIN_GOLDEN.has(idx);
    const isFree      = tomb.state === 'free';
    const isFixed     = tomb.state === 'fixed';

    el.className = `admin-tomb ${isGolden ? 'golden' : ''} ${isFree ? 'free' : ''} ${isFixed ? 'fixed' : ''}`;
    el.style.left = pos[0] + '%';
    el.style.top  = pos[1] + '%';

    if (!isFree && tomb.ownerColor) {
      el.style.background = hexToRgbaAdmin(tomb.ownerColor, 0.7);
      el.style.borderColor = isFixed ? 'rgba(255,255,255,0.7)' : tomb.ownerColor;
    } else {
      el.style.background = isGolden ? '#2a2210' : '#2e2e3a';
      el.style.borderColor = isGolden ? 'var(--gold)' : 'rgba(255,255,255,0.1)';
    }

    const ownerShort = (tomb.ownerName || '').substring(0, 5);
    el.innerHTML = `
      <span style="font-size:clamp(10px,1.4vw,16px);">${isFixed ? '🔒' : isGolden ? '⭐' : '💀'}</span>
      <span style="font-size:clamp(5px,0.8vw,8px); color:rgba(255,255,255,0.7);">${ownerShort}</span>
    `;
    el.title = `Tumba ${idx+1}${isGolden?' ⭐':''}${tomb.ownerName?' — '+tomb.ownerName:''}${isFixed?' (FIJA)':''}`;
  });
}

// Dibuja los caminos que conectan cada tumba con sus vecinas (estilo tablero).
function renderBoard(mapEl, positions) {
  if (mapEl.querySelector('.board-svg')) return;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'board-svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');

  const seen = new Set();
  for (let i = 0; i < positions.length; i++) {
    const dists = [];
    for (let j = 0; j < positions.length; j++) {
      if (i === j) continue;
      const dx = positions[i][0] - positions[j][0];
      const dy = positions[i][1] - positions[j][1];
      dists.push([Math.hypot(dx, dy), j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < 3 && k < dists.length; k++) {
      if (dists[k][0] > 26) continue;
      const j = dists[k][1];
      const key = Math.min(i, j) + '-' + Math.max(i, j);
      if (seen.has(key)) continue;
      seen.add(key);
      const a = positions[i], b = positions[j];
      ['road', 'road-dash'].forEach(cls => {
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', a[0]); line.setAttribute('y1', a[1]);
        line.setAttribute('x2', b[0]); line.setAttribute('y2', b[1]);
        line.setAttribute('class', cls);
        svg.appendChild(line);
      });
    }
  }
  mapEl.insertBefore(svg, mapEl.firstChild);
}

// Agrega niebla en movimiento, zombies caminando y props decorativos.
function renderDecor(mapEl) {
  if (mapEl.querySelector('.map-decor')) return;
  const wrap = document.createElement('div');
  wrap.className = 'map-decor';
  wrap.innerHTML = `
    <div class="fog-layer fog1"></div>
    <div class="fog-layer fog2"></div>
    <div class="map-prop tree" style="left:1.5%; bottom:2%;">🌳</div>
    <div class="map-prop tree" style="right:2%; bottom:3%;">🌲</div>
    <div class="map-prop flower" style="left:48%; bottom:2%;">🥀</div>
    <div class="map-prop flower" style="left:24%; bottom:4%;">⚰️</div>
    <div class="map-bat" style="top:10%; left:26%;">🦇</div>
    <div class="map-bat" style="top:16%; left:58%; animation-delay:-3s;">🦇</div>
    <div class="map-zombie z1"><span>🧟</span></div>
    <div class="map-zombie z2"><span>🧟‍♂️</span></div>
  `;
  mapEl.appendChild(wrap);
}

function hexToRgbaAdmin(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ================================================================
// ESTADÍSTICAS Y MARCADOR ADMIN
// ================================================================

function updateStats() {
  const free  = adminTombs.filter(t => t && t.state === 'free').length;
  const fixed = adminTombs.filter(t => t && t.state === 'fixed').length;
  const freeEl  = document.getElementById('stat-free');
  const fixedEl = document.getElementById('stat-fixed');
  if (freeEl)  freeEl.textContent  = free;
  if (fixedEl) fixedEl.textContent = fixed;
}

function renderAdminScoreboard() {
  const el = document.getElementById('admin-scoreboard');
  if (!el) return;
  el.innerHTML = '';

  const sorted = Object.entries(adminTeams).sort((a,b) => (b[1].score||0) - (a[1].score||0));
  sorted.forEach(([tid, t]) => {
    const frozen  = t.frozenUntil && t.frozenUntil > Date.now();
    const frozenSecs = frozen ? Math.ceil((t.frozenUntil - Date.now()) / 1000) : 0;
    const tombCount = adminTombs.filter(tb => tb && tb.ownerId === tid).length;
    const div = document.createElement('div');
    div.className = 'admin-team-row';
    div.innerHTML = `
      <span class="dot" style="background:${t.color};"></span>
      <strong>${t.name}</strong>
      <span style="color:var(--purple-l)">${t.score||0} pts</span>
      <span style="color:var(--text-dim); font-size:0.8rem;">🪦 ${tombCount}</span>
      ${frozen ? `<span style="color:#60a5fa;font-size:0.8rem;">❄ ${frozenSecs}s</span>` : ''}
    `;
    el.appendChild(div);
  });
}

// ================================================================
// TERMINAR JUEGO
// ================================================================

async function endGameManual() {
  if (!confirm('¿Querés terminar el juego?')) return;
  clearInterval(adminTimerInt);
  await db.ref(`games/${adminGameCode}/config/status`).set('finished');
}

// ================================================================
// PANTALLA FINAL ADMIN
// ================================================================

function showAdminEnd() {
  showScreen('screen-admin-end');
  clearInterval(adminTimerInt);

  const codeToClean = adminGameCode;  // capturar antes de que pueda cambiar

  db.ref(`games/${adminGameCode}/teams`).once('value', snap => {
    const teams = [];
    if (snap.exists()) snap.forEach(c => teams.push({ id: c.key, ...c.val() }));
    teams.sort((a,b) => (b.score||0) - (a.score||0));

    const winner = teams[0];
    const msgEl = document.getElementById('admin-winner-msg');
    if (winner) msgEl.textContent = `🏆 ¡${winner.name} domina el cementerio con ${winner.score} puntos!`;

    const rankEl = document.getElementById('admin-final-rankings');
    rankEl.innerHTML = '';
    const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣'];
    teams.forEach((t, i) => {
      const tombCount = adminTombs.filter(tb => tb && tb.ownerId === t.id).length;
      const div = document.createElement('div');
      div.className = `rank-entry ${i===0?'winner':''}`;
      div.innerHTML = `
        <span class="rank-pos ${i===0?'first':''}">${medals[i]||i+1}</span>
        <span class="dot" style="background:${t.color};width:12px;height:12px;border-radius:50%;"></span>
        <span class="rank-name">${t.name}</span>
        <span style="color:var(--text-dim); font-size:0.85rem;">🪦 ${tombCount} tumbas</span>
        <span class="rank-score">${t.score||0} pts</span>
      `;
      rankEl.appendChild(div);
    });

    // Programar el borrado de la sala. Se espera 30 segundos para que todos los
    // equipos alcancen a ver el ranking final antes de que se elimine la partida.
    if (!roomCleanupScheduled && codeToClean) {
      roomCleanupScheduled = true;
      const note = document.createElement('div');
      note.style.cssText = 'margin-top:16px; font-size:0.8rem; color:var(--text-dim);';
      note.textContent = 'La sala se cerrará automáticamente en unos segundos...';
      rankEl.appendChild(note);
      setTimeout(() => cleanupRoom(codeToClean), 30000);
    }
  });
}

// Borra por completo la sala de Firebase una vez terminada la partida.
function cleanupRoom(code) {
  db.ref(`games/${code}`).off();      // quitar listeners para evitar callbacks con null
  db.ref(`games/${code}`).remove()
    .then(() => console.log(`Sala ${code} eliminada`))
    .catch(e => console.error('Error al eliminar la sala', e));
  localStorage.removeItem('cementerio_admin');
}

// ================================================================
// INIT — reconectar si hay sesión guardada
// ================================================================

window.addEventListener('load', () => {
  const saved = localStorage.getItem('cementerio_admin');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      adminGameCode = s.gameCode;
      adminDuration = s.duration || 30;
      document.getElementById('rejoin-code-input').value = s.gameCode;
    } catch(e) {}
  }
});
