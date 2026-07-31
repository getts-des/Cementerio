/* ================================================================
   LA CONQUISTA DEL CEMENTERIO — game.js (lógica de equipos)
   ================================================================ */

// ================================================================
// DATOS: ACERTIJOS
// ================================================================

const RIDDLES = {
  medium: [
    { q: "La bruja tiene 12 escobas y presta 5 a sus amigas. ¿Cuántas le quedan?",
      opts: ["5", "7", "8", "6"], a: 1 },
    { q: "Un vampiro duerme de 6 AM a 9 PM. ¿Cuántas horas duerme?",
      opts: ["12", "15", "13", "14"], a: 1 },
    { q: "¿Cuántas patas tienen 5 arañas en total?",
      opts: ["35", "40", "45", "32"], a: 1 },
    { q: "El fantasma apareció el lunes y vuelve cada 4 días. ¿Qué día vuelve?",
      opts: ["Jueves", "Viernes", "Sábado", "Miércoles"], a: 1 },
    { q: "Si un zombi da 3 pasos por minuto, ¿cuántos pasos da en media hora?",
      opts: ["60", "90", "45", "120"], a: 1 },
    { q: "El hechicero tiene 7 pociones y usa 2 el lunes y 1 el miércoles. ¿Cuántas le quedan?",
      opts: ["3", "4", "5", "2"], a: 1 },
    { q: "¿Qué número sigue en la serie? 2, 4, 8, 16, ...",
      opts: ["24", "32", "20", "28"], a: 1 },
    { q: "El lobo aúlla 3 veces por noche durante 7 noches. ¿Cuántas veces aúlla en total?",
      opts: ["18", "21", "24", "14"], a: 1 },
    { q: "El conde tiene 2 castillos con 4 torres cada uno. ¿Cuántas torres en total?",
      opts: ["6", "8", "10", "12"], a: 1 },
    { q: "Hay 4 brujas con 3 gatos negros cada una. ¿Cuántos gatos hay en total?",
      opts: ["10", "12", "9", "14"], a: 1 },
    { q: "La araña teje 1 metro de telaraña por hora. ¿Cuánto teje en 8 horas?",
      opts: ["6 m", "8 m", "10 m", "7 m"], a: 1 },
    { q: "¿Qué número falta en la secuencia? 3, 6, __, 12, 15",
      opts: ["8", "9", "7", "10"], a: 1 },
    { q: "Si hoy es martes y el ritual ocurre en 5 días, ¿qué día es el ritual?",
      opts: ["Sábado", "Domingo", "Lunes", "Viernes"], a: 1 },
    { q: "El monstruo tiene 3 cabezas con 2 ojos cada una. ¿Cuántos ojos tiene?",
      opts: ["5", "6", "7", "8"], a: 1 },
    { q: "En el cementerio hay 15 tumbas y 6 están abiertas. ¿Cuántas están cerradas?",
      opts: ["8", "9", "10", "7"], a: 1 },
    { q: "5 fantasmas asustan a 3 personas cada uno. ¿A cuántas personas asustan en total?",
      opts: ["12", "15", "18", "10"], a: 1 },
    { q: "La casa encantada tiene 7 habitaciones con 3 espejos cada una. ¿Cuántos espejos hay?",
      opts: ["18", "21", "24", "14"], a: 1 },
    { q: "El vampiro salió a las 9 PM y volvió 4 horas después. ¿A qué hora volvió?",
      opts: ["12 AM", "1 AM", "2 AM", "11 PM"], a: 1 },
    { q: "La momia tiene 3 cadenas de 5 kilos cada una. ¿Cuánto pesan todas las cadenas?",
      opts: ["12 kg", "15 kg", "18 kg", "10 kg"], a: 1 },
    { q: "¿Qué número sigue? 1, 1, 2, 3, 5, 8, ...",
      opts: ["12", "13", "11", "10"], a: 1 },
    { q: "En la poción hay 4 ingredientes verdes y 3 rojos. ¿Cuántos ingredientes hay en total?",
      opts: ["6", "7", "8", "5"], a: 1 },
    { q: "Hay 4 filas de tumbas con 6 tumbas cada una. ¿Cuántas tumbas en total?",
      opts: ["20", "24", "28", "18"], a: 1 },
    { q: "El esqueleto caminó 10 metros al norte y luego 10 metros al este. ¿Cuántos metros recorrió?",
      opts: ["15", "20", "25", "10"], a: 1 },
    { q: "Si un vampiro crea 1 nuevo vampiro por noche y empieza solo, ¿cuántos vampiros hay después de 3 noches?",
      opts: ["4", "8", "6", "3"], a: 1 },
    { q: "El dragón escupe fuego 5 veces por minuto. ¿Cuántas veces escupe en 3 minutos?",
      opts: ["12", "15", "18", "10"], a: 1 },
    { q: "La poción dura 2 horas. Si la tomás a las 11 PM, ¿cuándo deja de hacer efecto?",
      opts: ["12 AM", "1 AM", "2 AM", "3 AM"], a: 1 },
    { q: "Hay 3 brujas con 4 pociones cada una. ¿Cuántas pociones hay en total?",
      opts: ["10", "12", "14", "9"], a: 1 },
    { q: "Un fantasma atraviesa 2 paredes por minuto. ¿Cuántas paredes atraviesa en 6 minutos?",
      opts: ["10", "12", "8", "14"], a: 1 },
    { q: "El hechizo empieza a las 8:45 PM y dura 30 minutos. ¿Cuándo termina?",
      opts: ["9:00 PM", "9:15 PM", "9:30 PM", "8:15 PM"], a: 1 },
    { q: "En el pantano hay 8 tumbas con 2 fantasmas cada una. ¿Cuántos fantasmas hay?",
      opts: ["14", "16", "18", "12"], a: 1 },
  ],
  hard: [
    { q: "Tres vampiros se miran en espejos uno frente al otro. ¿Cuántos reflejos ven en total?",
      opts: ["6", "3", "Ninguno", "Infinitos"], a: 2 },
    { q: "Una bruja hace 1 poción con 3 hierbas raras. Si tiene 15 hierbas, ¿cuántas pociones puede hacer?",
      opts: ["4", "5", "6", "3"], a: 1 },
    { q: "Si 5 brujas hacen 5 hechizos en 5 minutos, ¿cuántas brujas necesitás para 100 hechizos en 100 minutos?",
      opts: ["100", "5", "20", "50"], a: 1 },
    { q: "Las tumbas se organizan en filas: 1ª fila = 2 tumbas, cada fila tiene 2 más que la anterior. ¿Cuántas hay en la 5ª fila?",
      opts: ["8", "10", "12", "6"], a: 1 },
    { q: "Entrás al laberinto mirando al norte. Girás: derecha, izquierda, derecha, derecha, izquierda. ¿Hacia dónde mirás?",
      opts: ["Norte", "Sur", "Este", "Oeste"], a: 2 },
    { q: "Tengo ciudades pero no casas, montañas pero no árboles, agua pero no peces. ¿Qué soy?",
      opts: ["Un espejo", "Un mapa", "Un sueño", "Una pintura"], a: 1 },
    { q: "Una momia lleva 3000 años muerta y 2 años transformada en criatura viva. ¿Cuántos años existe en total?",
      opts: ["2998", "3002", "3000", "3001"], a: 1 },
    { q: "Soy pensado antes de ser dicho. Nací en el silencio y muero cuando me pronuncian. ¿Qué soy?",
      opts: ["Un hechizo", "Un secreto", "Una mentira", "Un deseo"], a: 1 },
    { q: "Un vampiro infecta a 1 persona por noche. Empieza solo. ¿Cuántos vampiros hay después de 4 noches?",
      opts: ["8", "16", "4", "12"], a: 1 },
    { q: "¿Qué número sigue en la secuencia? 2, 6, 18, 54, ...",
      opts: ["108", "162", "81", "216"], a: 1 },
    { q: "Una cripta tiene 4 puertas, cada puerta tiene 2 cerraduras y cada cerradura 3 combinaciones. ¿Cuántas combinaciones en total?",
      opts: ["18", "24", "12", "9"], a: 1 },
    { q: "En el cementerio, 1/3 de las tumbas son de vampiros y 1/4 son de brujas. ¿Qué fracción son de zombis?",
      opts: ["5/12", "7/12", "1/2", "1/3"], a: 0 },
  ]
};

// ================================================================
// MAPA: POSICIONES Y TIPOS DE TUMBAS
// ================================================================

// [x%, y%] — centro de cada tumba sobre el mapa (35 tumbas)
const TOMB_POSITIONS = [
  // Fila 1
  [5,7],[14,4],[23,8],[32,4],[41,7],[50,4],[59,8],[68,4],[77,7],[86,4],
  // Fila 2
  [8,27],[17,24],[26,28],[35,24],[44,27],[53,24],[62,28],[71,24],[80,27],[89,24],
  // Fila 3
  [5,50],[14,47],[23,51],[32,47],[41,50],[50,47],[59,51],[68,47],[77,50],[86,47],
  // Fila 4
  [14,72],[27,69],[41,73],[55,69],[69,72]
];

const GOLDEN_TOMBS = new Set([3, 14, 21, 27, 33]); // índices de tumbas doradas

const TEAM_COLORS = [
  { id: 'red',    hex: '#ef4444', label: 'Rojo' },
  { id: 'blue',   hex: '#3b82f6', label: 'Azul' },
  { id: 'green',  hex: '#22c55e', label: 'Verde' },
  { id: 'yellow', hex: '#eab308', label: 'Amarillo' },
  { id: 'purple', hex: '#a855f7', label: 'Violeta' },
  { id: 'orange', hex: '#f97316', label: 'Naranja' },
  { id: 'pink',   hex: '#ec4899', label: 'Rosa' },
  { id: 'cyan',   hex: '#06b6d4', label: 'Celeste' },
];

// ================================================================
// ESTADO LOCAL
// ================================================================

let gameCode = null;
let teamId   = null;
let myTeam   = null;           // datos del equipo propio
let allTeams = {};             // todos los equipos
let tombsData = [];            // estado de las 35 tumbas
let gameConfig = null;         // config del juego

let selectedColor = null;
let colorListener = null;      // listener de colores disponibles en join screen

let currentRiddle = null;      // { tombIdx, riddleIdx, type, startTime, timeLimit }
let pausedRiddle  = null;      // riddle pausado por un duelo
let riddleTimerInterval = null;

let currentDuelId    = null;
let pendingDuelId    = null;   // duelo pendiente de aceptar (notificación)
let duelTimerInterval = null;
let frozenInterval   = null;
let timerInterval    = null;
let usedRiddleIndices = { medium: new Set(), hard: new Set() };

// ================================================================
// INIT
// ================================================================

window.addEventListener('load', () => {
  renderColorPicker([]);
  localStorage.removeItem('cementerio_session');  // limpiar formato viejo (compartido entre pestañas)

  // Usamos sessionStorage (por pestaña, se borra al cerrarla):
  //  - Recargar la MISMA pestaña → reconecta al equipo (no se pierde el progreso).
  //  - Abrir el link en una pestaña NUEVA → sin sesión → se puede ingresar otro equipo.
  const saved = sessionStorage.getItem('cementerio_session');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      gameCode = s.gameCode;
      teamId   = s.teamId;
      myTeam   = s.team;
      reconnect();
      return;
    } catch(e) { sessionStorage.removeItem('cementerio_session'); }
  }
  showScreen('screen-start');
});

async function reconnect() {
  try {
    const cfgSnap  = await db.ref(`games/${gameCode}/config`).once('value');
    const teamSnap = await db.ref(`games/${gameCode}/teams/${teamId}`).once('value');
    // Si la sala ya no existe o el equipo fue eliminado, arrancar de cero.
    if (!cfgSnap.exists() || !teamSnap.exists()) {
      sessionStorage.removeItem('cementerio_session');
      showScreen('screen-start');
      return;
    }
    gameConfig = cfgSnap.val();
    myTeam     = teamSnap.val();
    if (gameConfig.status === 'waiting') {
      showWaiting();
    } else if (gameConfig.status === 'active') {
      showGame();
    } else {
      sessionStorage.removeItem('cementerio_session');
      showScreen('screen-start');
    }
  } catch(e) {
    console.error(e);
    showScreen('screen-start');
  }
}

// ================================================================
// PANTALLAS
// ================================================================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showAdminAuth() { showScreen('screen-admin-auth'); }

function showJoin() {
  showScreen('screen-join');
  document.getElementById('join-code').value = '';
  document.getElementById('join-name').value = '';
  document.getElementById('join-error').style.display = 'none';
  selectedColor = null;
  renderColorPicker([]);
  // Escuchar cambios de código para actualizar colores disponibles
  const codeInput = document.getElementById('join-code');
  codeInput.addEventListener('input', onJoinCodeChange);
}

function onJoinCodeChange() {
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  if (colorListener) { colorListener(); colorListener = null; }
  if (code.length < 3) { renderColorPicker([]); return; }
  colorListener = db.ref(`games/${code}/teams`).on('value', snap => {
    const taken = [];
    if (snap.exists()) {
      snap.forEach(child => { if (child.val().color) taken.push(child.val().color); });
    }
    renderColorPicker(taken);
  });
}

function renderColorPicker(takenHex) {
  const container = document.getElementById('color-picker');
  container.innerHTML = '';
  TEAM_COLORS.forEach(c => {
    const div = document.createElement('div');
    div.className = 'color-swatch' + (takenHex.includes(c.hex) ? ' taken' : '') + (selectedColor === c.hex ? ' selected' : '');
    div.style.background = c.hex;
    div.title = c.label;
    if (!takenHex.includes(c.hex)) {
      div.onclick = () => {
        selectedColor = c.hex;
        renderColorPicker(takenHex);
      };
    }
    container.appendChild(div);
  });
}

function checkAdminPw() {
  const pw = document.getElementById('admin-pw-input').value;
  const err = document.getElementById('admin-pw-error');
  if (pw === 'Meet2026') {
    err.style.display = 'none';
    window.location.href = 'admin.html';
  } else {
    err.style.display = 'block';
    document.getElementById('admin-pw-input').value = '';
  }
}

// ================================================================
// UNIRSE AL JUEGO
// ================================================================

async function joinGame() {
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  const name = document.getElementById('join-name').value.trim();
  const errEl = document.getElementById('join-error');
  const btn   = document.getElementById('btn-join');

  errEl.style.display = 'none';

  if (!code) { showError(errEl, 'Ingresá el código de sala'); return; }
  if (!name) { showError(errEl, 'Ingresá el nombre del equipo'); return; }
  if (name.length < 2) { showError(errEl, 'El nombre debe tener al menos 2 caracteres'); return; }
  if (!selectedColor) { showError(errEl, 'Elegí un color para tu equipo'); return; }

  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    const configSnap = await db.ref(`games/${code}/config`).once('value');
    if (!configSnap.exists()) { showError(errEl, 'No existe una partida con ese código'); btn.disabled=false; btn.textContent='¡Entrar al Cementerio!'; return; }
    const config = configSnap.val();
    // Se permite entrar durante la espera Y con la partida en curso (entrada tardía).
    if (config.status === 'finished') { showError(errEl, 'La partida ya terminó'); btn.disabled=false; btn.textContent='¡Entrar al Cementerio!'; return; }

    // Verificar nombre y color únicos
    const teamsSnap = await db.ref(`games/${code}/teams`).once('value');
    if (teamsSnap.exists()) {
      let nameTaken = false, colorTaken = false;
      teamsSnap.forEach(child => {
        const t = child.val();
        if (t.name && t.name.toLowerCase() === name.toLowerCase()) nameTaken = true;
        if (t.color === selectedColor) colorTaken = true;
      });
      if (nameTaken) { showError(errEl, 'Ese nombre ya está tomado, elegí otro'); btn.disabled=false; btn.textContent='¡Entrar al Cementerio!'; return; }
      if (colorTaken) { showError(errEl, 'Ese color ya está tomado, elegí otro'); btn.disabled=false; btn.textContent='¡Entrar al Cementerio!'; return; }
    }

    // Registrar equipo
    gameCode = code;
    teamId = 'team_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    myTeam = { name, color: selectedColor, score: 0, frozenUntil: 0, lastRobAt: 0, goldenCooldown: false, joinedAt: Date.now() };

    await db.ref(`games/${gameCode}/teams/${teamId}`).set(myTeam);
    sessionStorage.setItem('cementerio_session', JSON.stringify({ gameCode, teamId, team: myTeam }));
    if (colorListener) { colorListener(); colorListener = null; }

    // Si la partida ya está en curso, ir directo al mapa; si no, a la sala de espera.
    if (config.status === 'active') {
      gameConfig = config;
      showGame();
    } else {
      showWaiting();
    }

  } catch(e) {
    console.error(e);
    showError(errEl, 'Error al conectar. Revisá el código e intentá de nuevo.');
    btn.disabled = false;
    btn.textContent = '¡Entrar al Cementerio!';
  }
}

function showError(el, msg) { el.textContent = msg; el.style.display = 'block'; }

// ================================================================
// PANTALLA DE ESPERA
// ================================================================

function showWaiting() {
  showScreen('screen-waiting');
  document.getElementById('waiting-my-team').textContent = myTeam.name;
  document.getElementById('waiting-code').textContent = gameCode;

  // Escuchar equipos
  db.ref(`games/${gameCode}/teams`).on('value', snap => {
    const container = document.getElementById('waiting-teams');
    container.innerHTML = '';
    allTeams = {};
    if (snap.exists()) {
      snap.forEach(child => {
        allTeams[child.key] = child.val();
        const chip = document.createElement('div');
        chip.className = 'waiting-team-chip';
        chip.innerHTML = `<span class="waiting-pulse"></span><span class="dot" style="background:${child.val().color}; width:10px;height:10px;border-radius:50%;"></span>${child.val().name}`;
        container.appendChild(chip);
      });
    }
  });

  // Escuchar inicio del juego
  db.ref(`games/${gameCode}/config/status`).on('value', snap => {
    if (snap.val() === 'active') { showGame(); }
    if (snap.val() === 'finished') { showEnd(); }
  });
}

// ================================================================
// PANTALLA DE JUEGO
// ================================================================

function showGame() {
  showScreen('screen-game');
  // Obtener config actualizada
  db.ref(`games/${gameCode}/config`).once('value', snap => {
    gameConfig = snap.val();
    startGameListeners();
    startTimer();
  });
}

function startGameListeners() {
  // Equipos
  db.ref(`games/${gameCode}/teams`).on('value', snap => {
    allTeams = {};
    if (snap.exists()) {
      snap.forEach(c => { allTeams[c.key] = c.val(); });
    }
    myTeam = allTeams[teamId] || myTeam;
    updateHeaderBadge();
    renderScoreboard();
    checkFrozen();
    updateGoldenCooldownNotice();
  });

  // Tumbas
  db.ref(`games/${gameCode}/tombs`).on('value', snap => {
    tombsData = [];
    if (snap.exists()) {
      snap.forEach(c => { tombsData[parseInt(c.key)] = c.val(); });
    }
    renderMap();
  });

  // Duelos (escuchar duelos donde soy defensor o atacante)
  db.ref(`games/${gameCode}/duels`).on('child_added', snap => {
    const duel = snap.val();
    const duelId = snap.key;
    if (duel.status === 'waiting' && duel.defenderId === teamId) {
      handleIncomingDuel(duelId, duel);
    }
    if (duel.status === 'waiting' && duel.attackerId === teamId) {
      // El atacante espera que el defensor acepte
    }
  });

  db.ref(`games/${gameCode}/duels`).on('child_changed', snap => {
    const duel = snap.val();
    const duelId = snap.key;

    // Atacante: el defensor aceptó → abrir modal del atacante
    if (duelId === currentDuelId && duel.attackerId === teamId && duel.status === 'active') {
      if (!document.getElementById('modal-duel').classList.contains('open')) {
        openDuelModalForAttacker(duel, duelId, duel.startTime);
      }
    }

    // Duelo resuelto — manejar para todos los involucrados
    if (duel.status === 'resolved' && (duel.attackerId === teamId || duel.defenderId === teamId)) {
      if (duelId === currentDuelId) handleDuelResolved(duel);
      if (duelId === pendingDuelId) { hideDuelNotification(); pendingDuelId = null; }
    }
  });

  // Status del juego
  db.ref(`games/${gameCode}/config/status`).on('value', snap => {
    if (snap.val() === 'finished') showEnd();
  });
}

// ================================================================
// TIMER
// ================================================================

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 500);
  updateTimer();
}

function updateTimer() {
  if (!gameConfig || !gameConfig.startTime) return;
  const endTime = gameConfig.startTime + (gameConfig.duration || 30) * 60 * 1000;
  const remaining = Math.max(0, endTime - Date.now());
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const el = document.getElementById('game-timer');
  if (!el) return;
  el.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  el.className = remaining < 5 * 60000 ? 'urgent' : '';
  if (remaining === 0) clearInterval(timerInterval);
}

// ================================================================
// HEADER Y MARCADOR
// ================================================================

function updateHeaderBadge() {
  if (!myTeam) return;
  const dot  = document.getElementById('header-dot');
  const name = document.getElementById('header-team-name');
  const score = document.getElementById('score-val');
  if (dot) dot.style.background = myTeam.color;
  if (name) name.textContent = myTeam.name;
  if (score) score.textContent = myTeam.score || 0;
  updateRobCooldown();
}

function updateRobCooldown() {
  const el = document.getElementById('rob-cooldown');
  if (!el || !myTeam) return;
  const remaining = getRobCooldown();
  if (remaining <= 0) {
    el.textContent = '⚔ Duelo: listo';
    el.className = 'ready';
  } else {
    const secs = Math.ceil(remaining / 1000);
    el.textContent = `⚔ Duelo: ${secs}s`;
    el.className = '';
  }
}

function getRobCooldown() {
  if (!myTeam || !myTeam.lastRobAt) return 0;
  return Math.max(0, (myTeam.lastRobAt + 3 * 60 * 1000) - Date.now());
}

function updateGoldenCooldownNotice() {
  const el = document.getElementById('golden-cooldown-notice');
  if (el) el.style.display = (myTeam && myTeam.goldenCooldown) ? 'block' : 'none';
}

function renderScoreboard() {
  const el = document.getElementById('scoreboard');
  if (!el) return;
  el.innerHTML = '';
  const sorted = Object.entries(allTeams).sort((a,b) => (b[1].score||0) - (a[1].score||0));
  sorted.forEach(([tid, t]) => {
    const frozen = t.frozenUntil && t.frozenUntil > Date.now();
    const frozenSecs = frozen ? Math.ceil((t.frozenUntil - Date.now()) / 1000) : 0;
    const div = document.createElement('div');
    div.className = `score-team ${tid === teamId ? 'me' : ''} ${frozen ? 'frozen' : ''}`;
    div.innerHTML = `
      <span class="dot" style="background:${t.color}"></span>
      <span>${t.name}</span>
      <strong style="color:var(--purple-l)">${t.score || 0}pts</strong>
      ${frozen ? `<span class="frozen-timer">❄${frozenSecs}s</span>` : ''}
    `;
    el.appendChild(div);
  });
}

// ================================================================
// MAPA DEL CEMENTERIO
// ================================================================

function renderMap() {
  const map = document.getElementById('cemetery-map');
  if (!map) return;

  // Dibujar el tablero (caminos) y la decoración una sola vez
  renderBoard(map, TOMB_POSITIONS);
  renderDecor(map);

  // Conservar elementos no-tumba
  const existing = Array.from(map.querySelectorAll('.tomb'));

  tombsData.forEach((tomb, idx) => {
    if (!tomb) return;
    const pos = TOMB_POSITIONS[idx];
    if (!pos) return;

    let el = existing.find(e => parseInt(e.dataset.idx) === idx);
    if (!el) {
      el = document.createElement('div');
      el.className = 'tomb';
      el.dataset.idx = idx;
      el.onclick = () => handleTombClick(idx);
      map.appendChild(el);
    }
    styleTomb(el, idx, tomb);
  });
}

// ================================================================
// TABLERO Y DECORACIÓN DEL MAPA (compartido por conquista/vista)
// ================================================================

// Dibuja los caminos que conectan cada tumba con sus vecinas más cercanas.
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

function styleTomb(el, idx, tomb) {
  const pos = TOMB_POSITIONS[idx];
  el.style.left = pos[0] + '%';
  el.style.top  = pos[1] + '%';

  const isGolden  = GOLDEN_TOMBS.has(idx);
  const isOwnedByMe = tomb.ownerId === teamId;
  const isBlockedForMe = tomb.blockedFor && tomb.blockedFor[teamId];
  const isFree    = tomb.state === 'free';
  const isFixed   = tomb.state === 'fixed';
  const isConquered = tomb.state === 'conquered';

  // Colores de fondo
  if (isFree) {
    el.style.background = isGolden ? '#2a2210' : '#2e2e3a';
    el.style.borderColor = isGolden ? 'var(--gold)' : 'rgba(255,255,255,0.1)';
  } else {
    const ownerColor = tomb.ownerColor || '#555';
    el.style.background = hexToRgba(ownerColor, 0.7);
    el.style.borderColor = isFixed ? 'rgba(255,255,255,0.7)' : ownerColor;
  }

  // Clases CSS
  const classes = ['tomb'];
  if (isFree) classes.push('free');
  if (isConquered) classes.push('conquered');
  if (isFixed) classes.push('fixed');
  if (isGolden) classes.push('golden');
  if (isBlockedForMe) classes.push('blocked-for-me');
  el.className = classes.join(' ');

  // Icono y texto
  const icon = isGolden ? '⭐' : '💀';
  const ownerShort = (tomb.ownerName || '').substr(0, 7);
  const fixedMark = isFixed ? '🔒' : '';

  el.innerHTML = `
    <span class="tomb-icon">${fixedMark || icon}</span>
    <span class="tomb-owner">${ownerShort}</span>
  `;

  // Tooltip
  let tip = `Tumba ${idx+1}`;
  if (isGolden) tip += ' ⭐ DORADA';
  if (isFree) tip += ' (libre)';
  else tip += ` — ${tomb.ownerName}${isFixed?' (FIJA)':''}`;
  if (isBlockedForMe) tip += ' [bloqueada para vos]';
  el.title = tip;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ================================================================
// CLICK EN TUMBA
// ================================================================

function handleTombClick(idx) {
  if (!tombsData[idx]) return;
  if (currentRiddle || currentDuelId) return; // ya en un acertijo/duelo

  // Verificar congelado
  if (isFrozen()) { showToast('❄️ ¡Estás congelado! Esperá que pase.', 'error'); return; }

  const tomb = tombsData[idx];
  const isGolden = GOLDEN_TOMBS.has(idx);
  const isBlockedForMe = tomb.blockedFor && tomb.blockedFor[teamId];

  if (isBlockedForMe) { showToast('🚫 Esta tumba está bloqueada para vos por ahora', 'error'); return; }

  if (tomb.state === 'free') {
    // Restricción: no dos doradas seguidas
    if (isGolden && myTeam && myTeam.goldenCooldown) {
      showToast('⚠ Primero tenés que jugar una tumba normal', 'info'); return;
    }
    openRiddleForConquest(idx, isGolden ? 'hard' : 'medium');
    return;
  }

  if (tomb.state === 'conquered' || tomb.state === 'fixed') {
    if (tomb.ownerId === teamId) {
      showToast('✅ Esta tumba ya es tuya', 'info'); return;
    }
    if (tomb.state === 'fixed') {
      showToast('🔒 Esta tumba está fija — nadie puede desafiarla', 'error'); return;
    }
    // Intentar robo
    initiateRob(idx);
    return;
  }
}

// ================================================================
// ACERTIJO — CONQUISTA
// ================================================================

function openRiddleForConquest(tombIdx, type) {
  const riddleIdx = getRandomRiddleIdx(type);
  const riddle = RIDDLES[type][riddleIdx];
  const timeLimit = type === 'hard' ? 90 : 60;

  currentRiddle = { tombIdx, riddleIdx, type, startTime: Date.now(), timeLimit, context: 'conquest' };
  openRiddleModal(riddle, type, timeLimit, tombIdx);
}

function getRandomRiddleIdx(type) {
  const pool = RIDDLES[type];
  const used = usedRiddleIndices[type];
  let available = pool.map((_,i)=>i).filter(i => !used.has(i));
  if (available.length === 0) { used.clear(); available = pool.map((_,i)=>i); }
  const idx = available[Math.floor(Math.random() * available.length)];
  used.add(idx);
  return idx;
}

function openRiddleModal(riddle, type, timeLimit, tombIdx) {
  const isGolden = GOLDEN_TOMBS.has(tombIdx);
  const modalInner = document.getElementById('modal-riddle-inner');
  if (isGolden) modalInner.classList.add('golden-modal'); else modalInner.classList.remove('golden-modal');

  document.getElementById('riddle-icon').textContent = isGolden ? '⭐' : '💀';
  document.getElementById('riddle-title').textContent = isGolden ? 'Tumba Dorada — Acertijo Difícil' : 'Acertijo';
  document.getElementById('riddle-question').textContent = riddle.q;

  renderOptions('riddle-options', riddle.opts, (ansIdx) => submitRiddleAnswer(ansIdx, riddle.a, tombIdx));
  startRiddleTimer(timeLimit, 'riddle-timer', () => {
    // Tiempo agotado
    disableOptions('riddle-options');
    highlightCorrect('riddle-options', riddle.a);
    setTimeout(() => {
      closeRiddleModal();
      onConquestFail(tombIdx, currentRiddle && currentRiddle.type === 'hard');
    }, 1200);
  });

  document.getElementById('modal-riddle').classList.add('open');
}

function renderOptions(containerId, opts, onSelect) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const letters = ['A','B','C','D'];
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => onSelect(i);
    container.appendChild(btn);
  });
}

function disableOptions(containerId) {
  document.querySelectorAll(`#${containerId} .answer-btn`).forEach(b => b.disabled = true);
}

function highlightCorrect(containerId, correctIdx) {
  const btns = document.querySelectorAll(`#${containerId} .answer-btn`);
  btns.forEach((b, i) => { if (i === correctIdx) b.classList.add('correct'); });
}

function highlightAnswer(containerId, selectedIdx, correctIdx) {
  const btns = document.querySelectorAll(`#${containerId} .answer-btn`);
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === selectedIdx && i === correctIdx) b.classList.add('correct');
    else if (i === selectedIdx) b.classList.add('wrong');
    else if (i === correctIdx) b.classList.add('correct');
  });
}

function startRiddleTimer(seconds, elId, onTimeout) {
  clearInterval(riddleTimerInterval);
  let remaining = seconds;
  updateTimerEl(elId, remaining, seconds);
  riddleTimerInterval = setInterval(() => {
    remaining--;
    updateTimerEl(elId, remaining, seconds);
    if (remaining <= 0) { clearInterval(riddleTimerInterval); onTimeout(); }
  }, 1000);
}

function updateTimerEl(elId, remaining, total) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = remaining;
  if (remaining <= 5) el.className = 'modal-timer red';
  else if (remaining <= total * 0.4) el.className = 'modal-timer yellow';
  else el.className = 'modal-timer green';
}

function closeRiddleModal() {
  clearInterval(riddleTimerInterval);
  document.getElementById('modal-riddle').classList.remove('open');
  currentRiddle = null;
}

async function submitRiddleAnswer(ansIdx, correctIdx, tombIdx) {
  clearInterval(riddleTimerInterval);
  disableOptions('riddle-options');
  highlightAnswer('riddle-options', ansIdx, correctIdx);

  const isCorrect = ansIdx === correctIdx;
  const tombEl = document.querySelector(`.tomb[data-idx="${tombIdx}"]`);

  if (isCorrect) {
    if (tombEl) { tombEl.classList.add('anim-conquer'); setTimeout(() => tombEl.classList.remove('anim-conquer'), 500); }
    setTimeout(async () => {
      closeRiddleModal();
      await onConquestSuccess(tombIdx);
    }, 800);
  } else {
    if (tombEl) { tombEl.classList.add('anim-shake'); setTimeout(() => tombEl.classList.remove('anim-shake'), 400); }
    setTimeout(() => {
      closeRiddleModal();
      onConquestFail(tombIdx, GOLDEN_TOMBS.has(tombIdx));
    }, 800);
  }
}

async function onConquestSuccess(tombIdx) {
  const isGolden = GOLDEN_TOMBS.has(tombIdx);
  const points   = isGolden ? 3 : 1;
  const type     = isGolden ? 'hard' : 'medium';

  // Transacción para evitar condiciones de carrera
  const tombRef = db.ref(`games/${gameCode}/tombs/${tombIdx}`);
  let claimed = false;

  await new Promise(resolve => {
    tombRef.transaction(tomb => {
      if (!tomb) return tomb;
      if (tomb.state !== 'free') return; // abort — ya tomada
      if (tomb.blockedFor && tomb.blockedFor[teamId]) return; // abort
      return {
        ...tomb,
        state: 'conquered',
        ownerId:    teamId,
        ownerColor: myTeam.color,
        ownerName:  myTeam.name
      };
    }, (err, committed) => {
      claimed = committed && !err;
      resolve();
    });
  });

  if (!claimed) {
    showToast('😱 ¡Llegaste tarde! Alguien la tomó antes.', 'error');
    return;
  }

  // Sumar puntos
  await db.ref(`games/${gameCode}/teams/${teamId}/score`).transaction(s => (s || 0) + points);

  // Actualizar golden cooldown (debés jugar una normal antes de otra dorada)
  const updates = {};
  updates[`games/${gameCode}/teams/${teamId}/goldenCooldown`] = isGolden ? true : false;
  await db.ref().update(updates);

  if (isGolden) {
    showToast(`⭐ ¡Tumba DORADA conquistada! +${points} puntos`, 'success');
    setTimeout(() => openFreezeModal(), 300);
  } else {
    showToast(`✅ ¡Tumba conquistada! +${points} punto${points>1?'s':''}`, 'success');
  }
}

async function onConquestFail(tombIdx, isGolden) {
  await db.ref(`games/${gameCode}/tombs/${tombIdx}/blockedFor/${teamId}`).set(true);
  // Intentar una dorada (gane o pierda) activa el cooldown; intentar una normal (gane o pierda) lo limpia
  await db.ref(`games/${gameCode}/teams/${teamId}/goldenCooldown`).set(isGolden ? true : false);
  showToast('❌ Respuesta incorrecta — tumba bloqueada para tu equipo', 'error');
}

// ================================================================
// PODER: CONGELAR
// ================================================================

function openFreezeModal() {
  const modal = document.getElementById('modal-freeze');
  const list  = document.getElementById('freeze-target-list');
  list.innerHTML = '';

  const rivals = Object.entries(allTeams).filter(([tid]) => tid !== teamId);
  if (rivals.length === 0) {
    showToast('No hay equipos rivales para congelar', 'info');
    return;
  }

  rivals.forEach(([tid, t]) => {
    const btn = document.createElement('button');
    btn.className = 'freeze-target-btn';
    btn.innerHTML = `<span class="dot" style="background:${t.color};width:12px;height:12px;border-radius:50%;"></span>Congelar a <strong style="margin-left:4px;">${t.name}</strong>`;
    btn.onclick = () => activateFreeze(tid, t.name);
    list.appendChild(btn);
  });

  modal.classList.add('open');
}

async function activateFreeze(targetTeamId, targetName) {
  document.getElementById('modal-freeze').classList.remove('open');
  const frozenUntil = Date.now() + 60 * 1000;
  await db.ref(`games/${gameCode}/teams/${targetTeamId}/frozenUntil`).set(frozenUntil);
  showToast(`❄️ ¡${targetName} congelado por 60 segundos!`, 'info');
}

// ================================================================
// DETECCIÓN DE CONGELADO
// ================================================================

function isFrozen() {
  return myTeam && myTeam.frozenUntil && myTeam.frozenUntil > Date.now();
}

function checkFrozen() {
  clearInterval(frozenInterval);
  const overlay = document.getElementById('frozen-overlay');
  if (!overlay) return;

  if (isFrozen()) {
    overlay.classList.add('active');
    const countdown = document.getElementById('frozen-countdown');
    frozenInterval = setInterval(() => {
      const rem = Math.max(0, (myTeam.frozenUntil || 0) - Date.now());
      if (countdown) countdown.textContent = Math.ceil(rem / 1000);
      if (rem <= 0) {
        clearInterval(frozenInterval);
        overlay.classList.remove('active');
      }
    }, 500);
  } else {
    overlay.classList.remove('active');
  }
}

// ================================================================
// ROBO / DUELOS
// ================================================================

async function initiateRob(tombIdx) {
  const cooldown = getRobCooldown();
  if (cooldown > 0) {
    showToast(`⚔ Cooldown de duelo: ${Math.ceil(cooldown/1000)}s restantes`, 'error');
    return;
  }
  if (isFrozen()) { showToast('❄️ ¡Estás congelado! No podés desafiar.', 'error'); return; }

  const tomb = tombsData[tombIdx];
  if (!tomb || !tomb.ownerId) return;

  const defenderName = allTeams[tomb.ownerId]?.name || 'el otro equipo';
  if (!confirm(`¿Querés desafiar a ${defenderName} por la Tumba ${tombIdx+1}?`)) return;

  // Registrar cooldown inmediatamente
  await db.ref(`games/${gameCode}/teams/${teamId}/lastRobAt`).set(Date.now());

  // Crear duelo
  const riddleIdx = getRandomRiddleIdx('hard');
  const duelId = 'duel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  const duelData = {
    tombIdx,
    attackerId:  teamId,
    defenderId:  tomb.ownerId,
    riddleIdx,
    startTime:   0,         // se actualiza cuando el defensor acepta
    status:      'waiting',
    attackerAns: null,
    defenderAns: null,
    winnerId:    null,
  };

  await db.ref(`games/${gameCode}/duels/${duelId}`).set(duelData);
  currentDuelId = duelId;

  showToast(`⚔ Desafío enviado a ${defenderName}. Esperando respuesta...`, 'info');

  // Escuchar al duelo — si el defensor no responde en 20s, atacante gana por default
  setTimeout(async () => {
    const snap = await db.ref(`games/${gameCode}/duels/${duelId}`).once('value');
    const d = snap.val();
    if (d && d.status === 'waiting') {
      // Defensor no respondió en 20s → atacante gana por default
      await resolveDuelResult(duelId, teamId);
    }
  }, 20000);
}

function handleIncomingDuel(duelId, duel) {
  if (pendingDuelId) return; // ya hay uno pendiente
  pendingDuelId = duelId;

  const attackerName = allTeams[duel.attackerId]?.name || 'un equipo';
  const tombIdx = duel.tombIdx;

  // Si está en medio de un acertijo, pausarlo
  if (currentRiddle) {
    pauseCurrentRiddle();
  }

  showDuelNotification(duelId, duel, attackerName, tombIdx);
}

function showDuelNotification(duelId, duel, attackerName, tombIdx) {
  const notif = document.getElementById('duel-notification');
  const text  = document.getElementById('duel-notif-text');
  const cntdown = document.getElementById('duel-notif-countdown');

  text.textContent = `¡${attackerName} quiere robar tu Tumba ${tombIdx+1}!`;
  notif.classList.add('active');

  let secs = 15;
  cntdown.textContent = secs;
  const interval = setInterval(() => {
    secs--;
    cntdown.textContent = secs;
    if (secs <= 0) {
      clearInterval(interval);
      hideDuelNotification();
      // Timeout: atacante gana por default (manejado en initiateRob)
    }
  }, 1000);
  notif._interval = interval;
}

function hideDuelNotification() {
  const notif = document.getElementById('duel-notification');
  notif.classList.remove('active');
  if (notif._interval) { clearInterval(notif._interval); notif._interval = null; }
}

async function acceptDuelChallenge() {
  if (!pendingDuelId) return;
  hideDuelNotification();

  const duelId = pendingDuelId;
  const snap = await db.ref(`games/${gameCode}/duels/${duelId}`).once('value');
  const duel = snap.val();
  if (!duel || duel.status !== 'waiting') {
    pendingDuelId = null;
    showToast('El duelo ya no está disponible', 'info');
    resumePausedRiddle();
    return;
  }

  const startTime = Date.now();
  await db.ref(`games/${gameCode}/duels/${duelId}`).update({ status: 'active', startTime });

  currentDuelId = duelId;
  pendingDuelId = null;
  openDuelModal(duel, duelId, startTime);
}

function openDuelModal(duel, duelId, startTime) {
  // Esta función se llama solo desde el defensor (acceptDuelChallenge)
  // El atacante ve su modal vía child_changed → openDuelModalForAttacker
  const riddle = RIDDLES.hard[duel.riddleIdx];
  const attackerName = allTeams[duel.attackerId]?.name || '?';
  const defenderName = allTeams[duel.defenderId]?.name || '?';

  document.getElementById('duel-label').textContent = `${attackerName} VS ${defenderName}`;
  document.getElementById('duel-question').textContent = riddle.q;
  renderOptions('duel-options', riddle.opts, (ansIdx) => submitDuelAnswer(duelId, ansIdx, riddle.a, duel.tombIdx, duel.attackerId, duel.defenderId));
  startRiddleTimer(15, 'duel-timer', () => {
    disableOptions('duel-options');
    setTimeout(() => { closeDuelModal(); resumePausedRiddle(); }, 1000);
  });
  document.getElementById('modal-duel').classList.add('open');
}

function openDuelModalForAttacker(duel, duelId, startTime) {
  const riddle = RIDDLES.hard[duel.riddleIdx];
  const attackerName = allTeams[duel.attackerId]?.name || '?';
  const defenderName = allTeams[duel.defenderId]?.name || '?';

  document.getElementById('duel-label').textContent = `${attackerName} VS ${defenderName}`;
  document.getElementById('duel-question').textContent = riddle.q;
  renderOptions('duel-options', riddle.opts, (ansIdx) => submitDuelAnswer(duelId, ansIdx, riddle.a, duel.tombIdx, duel.attackerId, duel.defenderId));

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = Math.max(1, 15 - elapsed);
  startRiddleTimer(remaining, 'duel-timer', () => {
    disableOptions('duel-options');
    setTimeout(closeDuelModal, 1000);
  });
  document.getElementById('modal-duel').classList.add('open');
}

async function submitDuelAnswer(duelId, ansIdx, correctIdx, tombIdx, attackerId, defenderId) {
  clearInterval(riddleTimerInterval);
  disableOptions('duel-options');
  const isCorrect = ansIdx === correctIdx;
  highlightAnswer('duel-options', ansIdx, correctIdx);

  const isAttacker = attackerId === teamId;
  const answerField = isAttacker ? 'attackerAns' : 'defenderAns';

  await db.ref(`games/${gameCode}/duels/${duelId}/${answerField}`).set({
    ansIdx, correct: isCorrect, time: Date.now()
  });

  // Verificar si el otro ya respondió → resolver
  const snap = await db.ref(`games/${gameCode}/duels/${duelId}`).once('value');
  const duel = snap.val();
  if (!duel || duel.status === 'resolved') return;

  const otherField = isAttacker ? 'defenderAns' : 'attackerAns';
  if (duel[otherField]) {
    // Ambos respondieron → resolver (transacción garantiza que solo uno lo logra)
    await resolveFromAnswers(duelId, duel);
  }
  // Si solo respondí yo, esperar que resuelva el otro o el timeout
}

async function resolveFromAnswers(duelId, duel) {
  const aa = duel.attackerAns;
  const da = duel.defenderAns;

  let winnerId = null;
  if (aa?.correct && da?.correct) {
    winnerId = aa.time < da.time ? duel.attackerId : duel.defenderId;
  } else if (aa?.correct) {
    winnerId = duel.attackerId;
  } else if (da?.correct) {
    winnerId = duel.defenderId;
  }
  // Ambos incorrectos → winnerId = null (nadie roba)

  // Transacción para marcar como resuelto (solo uno lo logra)
  await db.ref(`games/${gameCode}/duels/${duelId}`).transaction(d => {
    if (!d || d.status === 'resolved') return d;
    d.status = 'resolved';
    d.winnerId = winnerId;
    return d;
  });
}

// Solo escribe el resultado del duelo; las actualizaciones de tumba se hacen en handleDuelResolved
async function resolveDuelResult(duelId, winnerId) {
  await db.ref(`games/${gameCode}/duels/${duelId}`).transaction(d => {
    if (!d || d.status === 'resolved') return d;
    d.status = 'resolved';
    d.winnerId = winnerId;
    return d;
  });
}

async function handleDuelResolved(duel) {
  closeDuelModal();
  currentDuelId = null;

  const iWon      = duel.winnerId === teamId;
  const isAttacker = duel.attackerId === teamId;
  const isDefender = duel.defenderId === teamId;

  if (!duel.winnerId) {
    showToast('🤝 Nadie acertó — la tumba sigue igual', 'info');
  } else if (iWon && isAttacker) {
    // Atacante ganó → reclamar tumba con transacción
    const tombRef = db.ref(`games/${gameCode}/tombs/${duel.tombIdx}`);
    await tombRef.transaction(tomb => {
      if (!tomb || tomb.state === 'fixed' || tomb.ownerId !== duel.defenderId) return tomb;
      return { ...tomb, state: 'conquered', ownerId: teamId, ownerColor: myTeam.color, ownerName: myTeam.name };
    });
    await db.ref(`games/${gameCode}/teams/${teamId}/score`).transaction(s => (s || 0) + 1);
    showToast('⚔ ¡Ganaste el duelo! La tumba es tuya', 'success');
  } else if (iWon && isDefender) {
    // Defensor ganó → fijar tumba (idempotente)
    await db.ref(`games/${gameCode}/tombs/${duel.tombIdx}/state`).set('fixed');
    showToast('🛡 ¡Defendiste exitosamente! Tu tumba quedó FIJA', 'success');
  } else {
    showToast(isAttacker ? '💀 Perdiste el duelo' : '😱 ¡Te robaron la tumba!', 'error');
  }

  resumePausedRiddle();
}

function closeDuelModal() {
  clearInterval(riddleTimerInterval);
  document.getElementById('modal-duel').classList.remove('open');
}

// ================================================================
// PAUSE / RESUME ACERTIJO (para duelos)
// ================================================================

function pauseCurrentRiddle() {
  if (!currentRiddle) return;
  clearInterval(riddleTimerInterval);
  const elapsed = Date.now() - currentRiddle.startTime;
  const timeRemaining = Math.max(1, currentRiddle.timeLimit - Math.floor(elapsed / 1000));
  pausedRiddle = { ...currentRiddle, timeRemaining };
  currentRiddle = null;
  document.getElementById('modal-riddle').classList.remove('open');
}

function resumePausedRiddle() {
  if (!pausedRiddle) return;
  const { tombIdx, riddleIdx, type, timeRemaining } = pausedRiddle;
  pausedRiddle = null;
  const riddle = RIDDLES[type][riddleIdx];
  currentRiddle = { tombIdx, riddleIdx, type, startTime: Date.now(), timeLimit: timeRemaining };

  document.getElementById('riddle-question').textContent = riddle.q;
  disableOptions('riddle-options'); // re-renderizar
  renderOptions('riddle-options', riddle.opts, (ansIdx) => submitRiddleAnswer(ansIdx, riddle.a, tombIdx));
  startRiddleTimer(timeRemaining, 'riddle-timer', () => {
    disableOptions('riddle-options');
    highlightCorrect('riddle-options', riddle.a);
    setTimeout(() => { closeRiddleModal(); onConquestFail(tombIdx, GOLDEN_TOMBS.has(tombIdx)); }, 1200);
  });
  document.getElementById('modal-riddle').classList.add('open');
}

// ================================================================
// PANTALLA FINAL
// ================================================================

function showEnd() {
  showScreen('screen-end');
  clearInterval(timerInterval);

  db.ref(`games/${gameCode}/teams`).once('value', snap => {
    const teams = [];
    if (snap.exists()) snap.forEach(c => teams.push({ id: c.key, ...c.val() }));
    teams.sort((a,b) => (b.score||0) - (a.score||0));

    const winner = teams[0];
    const winnerMsg = document.getElementById('winner-msg');
    if (winner) winnerMsg.textContent = `🏆 ¡${winner.name} domina el cementerio con ${winner.score} puntos!`;

    const rankEl = document.getElementById('final-rankings');
    rankEl.innerHTML = '';
    const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣'];
    teams.forEach((t, i) => {
      const div = document.createElement('div');
      div.className = `rank-entry ${i === 0 ? 'winner' : ''}`;
      div.innerHTML = `
        <span class="rank-pos ${i===0?'first':''}">${medals[i]||i+1}</span>
        <span class="dot" style="background:${t.color};width:12px;height:12px;border-radius:50%;"></span>
        <span class="rank-name">${t.name}</span>
        <span class="rank-score">${t.score||0} pts</span>
      `;
      rankEl.appendChild(div);
    });
  });
}

// ================================================================
// TOAST
// ================================================================

let toastTimeout = null;
function showToast(msg, type = 'info') {
  clearTimeout(toastTimeout);
  const el = document.getElementById('result-toast');
  el.textContent = msg;
  el.className = `show ${type}`;
  toastTimeout = setTimeout(() => { el.className = ''; }, 3000);
}

// ================================================================
// COOLDOWN ROB — actualizar cada segundo
// ================================================================
setInterval(updateRobCooldown, 1000);
