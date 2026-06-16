/**
 * ════════════════════════════════════════════════
 *  CONFIGURACIÓN COMPARTIDA — MÉXICO VS COREA
 * ════════════════════════════════════════════════
 *  Edita SOLO este archivo. Los 3 archivos HTML
 *  (index.html, admin.html, ganadores.html) lo
 *  cargan automáticamente vía <script src="config.js">
 * ════════════════════════════════════════════════
 */

const SUPABASE_URL  = 'https://earzupjzrnkhthinnjnu.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcnp1cGp6cm5raHRoaW5uam51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDQ4NDIsImV4cCI6MjA5NzEyMDg0Mn0.W0Rkob51GBIVysF3nDmvv-ySAZb6uE5KEMx7_BZvPrg';

/**
 * Crea el cliente Supabase una sola vez.
 * Todos los archivos usan la variable global `_sb`.
 */
const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
  realtime: { params: { eventsPerSecond: 15 } }
});
