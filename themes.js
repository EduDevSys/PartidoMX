/**
 * ════════════════════════════════════════════════════════════
 *  THEMES.JS — Sistema de temas por tipo de evento
 * ════════════════════════════════════════════════════════════
 *  Detecta automáticamente el tema visual/sonoro de un evento
 *  según palabras clave en su nombre, y expone un objeto con
 *  emojis, colores CSS y música a usar en index.html y
 *  ganadores.html.
 *
 *  Si el nombre del evento no coincide con ningún tema conocido,
 *  se usa el tema GENÉRICO (emojis de premio neutros, sin
 *  distinción de sexo, paleta dorado/verde, música genérica).
 *
 *  ── CÓMO AGREGAR UN TEMA NUEVO ──
 *  1. Copia un bloque de THEMES de abajo.
 *  2. Cambia "keywords" por las palabras que deben activarlo.
 *  3. Ajusta emojis, colores y el nombre del archivo de música.
 *  4. Sube el archivo de música a la misma carpeta del proyecto.
 *  Nada más: index.html y ganadores.html lo usan automáticamente.
 * ════════════════════════════════════════════════════════════
 */

const THEMES = {

  // ── DEPORTIVO / FÚTBOL ──
  deportivo: {
    id: 'deportivo',
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
    musicFile: 'assets/audio/musica-deportivo.mp3',
    winSoundFile: 'assets/audio/sonido-ganador-deportivo.mp3',
  },

  // ── LUCHA LIBRE ──
  lucha: {
    id: 'lucha',
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
    musicFile: 'assets/audio/musica-lucha.mp3',
    winSoundFile: 'assets/audio/sonido-ganador-lucha.mp3',
  },

  // ── GENÉRICO (respaldo cuando no hay coincidencia) ──
  generico: {
    id: 'generico',
    keywords: [], // nunca se usa como match directo; es el fallback
    colors: {
      verde:  '#006400', verde2: '#007a00', verde3: '#00a000',
      oro:    '#c07a00', oro2:  '#d48c00',
      rojo:   '#c80000',
      acento: '#0a6b0a',
    },
    flags: '🎉 🏆 🎊',
    homeIcon: '🎉',
    heroEmojis: ['🎉','🏆','🎁','🌟','✨','🎊','⭐','🔥'],
    welcomeIcon: '🎁',
    welcomeFloaters: ['🎉','🏆','🎁','🌟','✨','🎊','⭐','🔥'],
    winIcon: '🏆',
    loseIcon: '😔',
    claimedIcon: '🙌',
    trophyEmoji: '🏆',
    chipText: '🎉 Dinámica de premios',
    musicFile: 'assets/audio/musica-generica.mp3',
    winSoundFile: 'assets/audio/sonido-ganador-generico.mp3',
  },
};

/**
 * Detecta el tema según el nombre del evento.
 * Recorre los temas (excepto "generico") y revisa si alguna de
 * sus keywords aparece como palabra dentro del nombre. El primer
 * tema que haga match gana. Si ninguno coincide, regresa "generico".
 */
function detectTheme(eventoNombre) {
  const nombre = (eventoNombre || '').toLowerCase();

  for (const key of Object.keys(THEMES)) {
    if (key === 'generico') continue;
    const theme = THEMES[key];
    const match = theme.keywords.some(kw => nombre.includes(kw));
    if (match) return theme;
  }

  return THEMES.generico;
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
async function applyThemeMusic(theme, audioElId, fallbackToGeneric = true) {
  const el = document.getElementById(audioElId);
  if (!el) return;

  let fileToUse = theme.musicFile;
  let exists = await fileExists(theme.musicFile);

  if (!exists && fallbackToGeneric && theme.id !== 'generico') {
    fileToUse = THEMES.generico.musicFile;
    exists = await fileExists(fileToUse);
  }

  if (!exists) return; // ningún archivo de música disponible; el respaldo sintético de cada HTML se encarga

  const source = el.querySelector('source') || document.createElement('source');
  if (!el.contains(source)) el.appendChild(source);
  source.setAttribute('type', 'audio/mpeg');
  source.setAttribute('src', fileToUse);
  el.load();
}

/**
 * Igual que applyThemeMusic pero para el sonido de victoria
 * (usado en ganadores.html).
 */
async function applyThemeWinSound(theme, audioElId, fallbackToGeneric = true) {
  const el = document.getElementById(audioElId);
  if (!el) return;

  let fileToUse = theme.winSoundFile;
  let exists = await fileExists(theme.winSoundFile);

  if (!exists && fallbackToGeneric && theme.id !== 'generico') {
    fileToUse = THEMES.generico.winSoundFile;
    exists = await fileExists(fileToUse);
  }

  if (!exists) return; // ningún archivo disponible; el respaldo sintético (fanfare) de ganadores.html se encarga

  const source = el.querySelector('source') || document.createElement('source');
  if (!el.contains(source)) el.appendChild(source);
  source.setAttribute('type', 'audio/mpeg');
  source.setAttribute('src', fileToUse);
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
