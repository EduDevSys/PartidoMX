/**
 * ════════════════════════════════════════════════════════════
 *  THEMES.JS — Sistema de temas por tipo de evento
 * ════════════════════════════════════════════════════════════
 *  Detecta automáticamente el tema visual de un evento según
 *  palabras clave en su nombre, y expone un objeto con emojis
 *  y colores CSS a usar en index.html y ganadores.html.
 *
 *  Si el nombre del evento no coincide con ningún tema conocido,
 *  se usa el tema GENÉRICO (emojis de premio neutros, sin
 *  distinción de sexo, paleta dorado/verde).
 *
 *  ── AUDIO ──
 *  La música y el sonido de victoria son DOS ARCHIVOS FIJOS,
 *  compartidos por todos los temas (no varían por tipo de
 *  evento):
 *    - assets/audio/musica-fondo.mp3   → música de ambiente
 *    - assets/audio/sonido-ganador.mp3 → al ganar un premio
 *  Si no existen, cada HTML usa su propio generador de música
 *  sintética como respaldo automático.
 *
 *  ── CÓMO AGREGAR UN TEMA NUEVO ──
 *  1. Copia un bloque de THEMES de abajo.
 *  2. Cambia "keywords" por las palabras que deben activarlo.
 *  3. Ajusta emojis y colores (el audio no cambia, usa los
 *     mismos dos archivos fijos de siempre).
 *  Nada más: index.html y ganadores.html lo usan automáticamente.
 * ════════════════════════════════════════════════════════════
 */

const THEMES = {

  // ── MÉXICO VS ECUADOR (gran ocasión, alto impacto) ──
  mxEcuador: {
    id: 'mx-ecuador',
    priority: 10, // tema específico solicitado: gana sobre "deportivo" genérico
    keywords: ['ecuador', 'mx vs ecuador', 'méxico vs ecuador', 'mexico vs ecuador'],
    colors: {
      verde:  '#006227', verde2: '#00853a', verde3: '#00a847',
      oro:    '#ffb700', oro2:  '#ffd000',
      rojo:   '#ce1126',
      acento: '#006227',
    },
    flags: '🇲🇽 ⚽ 🇪🇨',
    homeIcon: '⚽',
    heroEmojis: ['⚽','🏆','🔥','🎉','⭐','🇲🇽','🇪🇨','🎊'],
    welcomeIcon: '🏆',
    welcomeFloaters: ['⚽','🏆','🔥','🎉','⭐','🇲🇽','🇪🇨','🎊'],
    winIcon: '🏆',
    loseIcon: '😔',
    claimedIcon: '🙌',
    trophyEmoji: '🏆',
    chipText: '🇲🇽 ¡VAMOS MÉXICO! 🆚 🇪🇨',
    musicFile: 'assets/audio/musica-fondo.mp3',
    winSoundFile: 'assets/audio/sonido-ganador.mp3',
  },

  // ── DEPORTIVO / FÚTBOL (genérico, otros partidos) ──
  deportivo: {
    id: 'deportivo',
    priority: 1,
    keywords: ['vs', 'fútbol', 'futbol', 'partido', 'méxico', 'mexico', 'selección', 'seleccion', 'liga', 'mundial'],
    colors: {
      verde:  '#006400', verde2: '#007a00', verde3: '#00a000',
      oro:    '#c07a00', oro2:  '#d48c00',
      rojo:   '#c80000',
      acento: '#0a6b0a',
    },
    flags: '🇲🇽 ⚽ 🇰🇷',
    homeIcon: '⚽',
    heroEmojis: ['⚽','🏆','🎉','🔥','🌟','🇲🇽','⭐','🎊'],
    welcomeIcon: '⚽',
    welcomeFloaters: ['⚽','🏆','🎉','🔥','🌟','🇲🇽','⭐','🎊'],
    winIcon: '🏆',
    loseIcon: '😔',
    claimedIcon: '🙌',
    trophyEmoji: '🏆',
    chipText: '⚽ Dinámica deportiva',
    musicFile: 'assets/audio/musica-fondo.mp3',
    winSoundFile: 'assets/audio/sonido-ganador.mp3',
  },

  // ── LUCHA LIBRE ──
  lucha: {
    id: 'lucha',
    priority: 1,
    keywords: ['lucha', 'luchador', 'luchadores', 'aaa', 'cmll', 'wrestling', 'ring'],
    colors: {
      verde:  '#7a0000', verde2: '#9a0000', verde3: '#b80000',
      oro:    '#c09000', oro2:  '#d4a800',
      rojo:   '#0a0a0a',
      acento: '#8a0000',
    },
    flags: '🤼 🥊 🇲🇽',
    homeIcon: '🤼',
    heroEmojis: ['🤼','🥊','🏆','🔥','💥','⭐','🎉','👑'],
    welcomeIcon: '🤼',
    welcomeFloaters: ['🤼','🥊','🔥','💥','⭐','👑','🎉','🏆'],
    winIcon: '🏆',
    loseIcon: '😔',
    claimedIcon: '🙌',
    trophyEmoji: '🏆',
    chipText: '🤼 Dinámica de lucha libre',
    musicFile: 'assets/audio/musica-fondo.mp3',
    winSoundFile: 'assets/audio/sonido-ganador.mp3',
  },

  // ── GENÉRICO (respaldo cuando no hay coincidencia) ──
  generico: {
    id: 'generico',
    keywords: [], // nunca se usa como match directo; es siempre el comportamiento por defecto
    colors: {
      verde:  '#006400', verde2: '#007a00', verde3: '#00a000',
      oro:    '#c07a00', oro2:  '#d48c00',
      rojo:   '#c80000',
      acento: '#0a6b0a',
    },
    flags: '🎉 🏆 🎊',
    homeIcon: '🎉',
    heroEmojis: ['🎉','🏆','🎁','🌟','✨','🎊','⭐','🔥','🥳','🎈','💫','🪅'],
    welcomeIcon: '🎁',
    welcomeFloaters: ['🎉','🏆','🎁','🌟','✨','🎊','⭐','🔥','🥳','🎈','💫','🪅'],
    winIcon: '🏆',
    loseIcon: '😔',
    claimedIcon: '🙌',
    trophyEmoji: '🏆',
    chipText: '🎉 Dinámica de premios',
    musicFile: 'assets/audio/musica-fondo.mp3',
    winSoundFile: 'assets/audio/sonido-ganador.mp3',
  },
};

/**
 * Detecta el tema según el nombre del evento.
 * Recorre los temas (excepto "generico") y revisa si alguna de
 * sus keywords aparece como palabra dentro del nombre. El primer
 * tema que haga match gana. Si ninguno coincide, regresa "generico".
 */
/**
 * Detecta el tema según el nombre del evento.
 *
 * El tema GENÉRICO es el comportamiento por defecto: siempre
 * disponible, festivo, con emojis de regalo y alegría neutros.
 * Se usa automáticamente salvo que el nombre del evento coincida
 * con un tema más específico (ej. "México vs Ecuador", "Lucha
 * Libre").
 *
 * La prioridad entre temas específicos se decide por el campo
 * "priority" de cada uno (número más alto = se evalúa primero).
 * Esto es explícito y a prueba de errores: si en el futuro
 * agregas un tema nuevo que debe ganarle a otro existente (por
 * ejemplo, un partido específico que debe tener prioridad sobre
 * el tema "Deportivo" genérico), simplemente le das un número de
 * priority más alto — sin tener que reordenar el objeto THEMES
 * a mano ni arriesgarte a que el orden de declaración cambie el
 * comportamiento sin que se note.
 */
function detectTheme(eventoNombre) {
  const nombre = (eventoNombre || '').toLowerCase();

  const candidatos = Object.keys(THEMES)
    .filter(key => key !== 'generico')
    .map(key => THEMES[key])
    .filter(theme => theme.keywords.some(kw => nombre.includes(kw)))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  return candidatos[0] || THEMES.generico;
}

/**
 * Aplica las variables de color del tema como CSS custom
 * properties sobre :root, para que todo el CSS existente
 * (que ya usa var(--verde), var(--oro), etc.) cambie de
 * colores automáticamente sin tocar ninguna otra regla.
 *
 * Solo se tocan las variables base que existen de forma
 * consistente en index.html y ganadores.html (--verde,
 * --verde2, --oro, --oro2, --rojo). Variables derivadas
 * específicas de cada archivo (ej. --verde-dark en index.html,
 * o --verde3/--bg en ganadores.html, calibradas para
 * contraste de día) se dejan intactas para no romper ajustes
 * de legibilidad ya afinados en cada pantalla.
 */
function applyThemeColors(theme) {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty('--verde',  c.verde);
  root.style.setProperty('--verde2', c.verde2);
  root.style.setProperty('--oro',    c.oro);
  root.style.setProperty('--oro2',   c.oro2);
  root.style.setProperty('--rojo',   c.rojo);
}

/**
 * Verifica con una petición HEAD si un archivo existe en el
 * servidor, sin descargarlo completo. Se usa para decidir el
 * archivo de música correcto ANTES de tocar el <audio>, evitando
 * carreras de condiciones con los eventos 'error' del propio
 * elemento (que cada HTML ya usa para su respaldo sintético).
 */
async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

/**
 * Configura el elemento <audio> de música de fondo para que
 * apunte al archivo del tema. Si ese archivo no existe en el
 * servidor, cae al archivo genérico; si ese tampoco existe,
 * NO toca el <audio> en absoluto, dejando que el motor de
 * música sintética de respaldo (ya presente en index.html /
 * ganadores.html) se active normalmente por su propio sistema
 * de detección de errores, sin interferencia de este módulo.
 */
async function applyThemeMusic(theme, audioElId) {
  const el = document.getElementById(audioElId);
  if (!el) return;

  // Todos los temas comparten el mismo archivo fijo de música de
  // fondo (assets/audio/musica-fondo.mp3). Si no existe en el
  // servidor, no se toca el <audio> y el respaldo sintético de
  // cada HTML se activa solo por su propio sistema de detección
  // de errores.
  const exists = await fileExists(theme.musicFile);
  if (!exists) return;

  const source = el.querySelector('source') || document.createElement('source');
  if (!el.contains(source)) el.appendChild(source);
  source.setAttribute('type', 'audio/mpeg');
  source.setAttribute('src', theme.musicFile);
  el.load();
}

/**
 * Igual que applyThemeMusic pero para el sonido de victoria
 * (usado en ganadores.html).
 */
async function applyThemeWinSound(theme, audioElId) {
  const el = document.getElementById(audioElId);
  if (!el) return;

  // Mismo patrón que applyThemeMusic: archivo fijo
  // (assets/audio/sonido-ganador.mp3) compartido por todos los
  // temas. Si no existe, el respaldo sintético de ganadores.html
  // se activa solo.
  const exists = await fileExists(theme.winSoundFile);
  if (!exists) return;

  const source = el.querySelector('source') || document.createElement('source');
  if (!el.contains(source)) el.appendChild(source);
  source.setAttribute('type', 'audio/mpeg');
  source.setAttribute('src', theme.winSoundFile);
  el.load();
}

/**
 * Punto de entrada único: dado el nombre del evento, detecta el
 * tema, aplica colores de inmediato (síncrono) y dispara en
 * paralelo la verificación/asignación de música (asíncrona, no
 * bloqueante). Regresa el objeto del tema para que cada pantalla
 * use sus emojis donde corresponda.
 *
 * opts.skipColors: si es true, NO se tocan las variables CSS de
 * color. Úsalo en pantallas con una paleta ya calibrada para un
 * requisito específico (ej. el tablero de ganadores, diseñado
 * con alto contraste para verse bien con luz solar directa) —
 * cambiar esos colores por los de un tema podría romper esa
 * legibilidad. En esas pantallas el tema solo aporta emojis,
 * música y textos, nunca colores.
 */
function initTheme(eventoNombre, opts = {}) {
  const theme = detectTheme(eventoNombre);
  if (!opts.skipColors) applyThemeColors(theme);
  if (opts.musicElId) applyThemeMusic(theme, opts.musicElId);
  if (opts.winSoundElId) applyThemeWinSound(theme, opts.winSoundElId);
  return theme;
}
