import puppeteer from 'puppeteer';

const APP = 'http://localhost:3000';

const browser = await puppeteer.launch({
	headless: true,
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

// captura logs e erros de rede
const networkErrors = [];
page.on('requestfailed', (r) => networkErrors.push(`FAIL ${r.url()}: ${r.failure()?.errorText}`));
page.on('response', (r) => {
	if (r.url().includes('8080') && r.status() >= 400)
		networkErrors.push(`HTTP ${r.status()} ${r.url()}`);
});

let pass = 0,
	fail = 0;
const log = [];

function ok(msg) {
	pass++;
	log.push(`  ✓ ${msg}`);
}
function ko(msg, d) {
	fail++;
	log.push(`  ✗ ${msg}${d ? ' — ' + d : ''}`);
}
function info(msg) {
	log.push(`  ℹ ${msg}`);
}

// ── 1. Carregar a app ──────────────────────────────────────────────────────
console.log('\n[1] Abrindo a app...');
const res = await page.goto(APP, { waitUntil: 'networkidle0', timeout: 20000 });
res.status() < 400
	? ok(`App carregou (HTTP ${res.status()})`)
	: ko('App não carregou', res.status());

const title = await page.title();
info(`Título: "${title}"`);

// screenshot inicial
await page.screenshot({ path: '/tmp/01-initial.png' });

// ── 2. Detectar tela de login ──────────────────────────────────────────────
console.log('[2] Procurando formulário de login...');
const emailSel =
	'input[type="email"], input[name="email"], input[placeholder*="email" i], input[placeholder*="e-mail" i]';
const passSel = 'input[type="password"]';

let emailEl, passEl;
try {
	emailEl = await page.waitForSelector(emailSel, { timeout: 5000 });
	ok('Campo de email encontrado');
} catch {
	// talvez já autenticado ou outro layout
	ko('Campo de email NÃO encontrado — verificar se app está na tela de login');
	info(`URL atual: ${page.url()}`);
	info(`HTML parcial: ${(await page.evaluate(() => document.body.innerHTML)).slice(0, 400)}`);
	await page.screenshot({ path: '/tmp/02-no-login.png' });
	await browser.close();
	console.log('\n── Resultado ──');
	log.forEach((l) => console.log(l));
	console.log(`\nTOTAL: ${pass} ok, ${fail} falhou`);
	// eslint-disable-next-line no-undef
	process.exit(fail > 0 ? 1 : 0);
}

try {
	passEl = await page.waitForSelector(passSel, { timeout: 3000 });
	ok('Campo de senha encontrado');
} catch {
	ko('Campo de senha NÃO encontrado');
}

await page.screenshot({ path: '/tmp/02-login-form.png' });

// ── 3. Preencher credenciais ───────────────────────────────────────────────
console.log('[3] Preenchendo credenciais...');
await emailEl.click({ clickCount: 3 });
await emailEl.type('ana.lima@pulsecompany.com');

if (passEl) {
	await passEl.click({ clickCount: 3 });
	await passEl.type('admin123');
	ok('Credenciais preenchidas');
}

await page.screenshot({ path: '/tmp/03-filled.png' });

// ── 4. Submeter ───────────────────────────────────────────────────────────
console.log('[4] Submetendo login...');
const submitSel = 'button[type="submit"]';
let submitted = false;

try {
	const btn = await page.waitForSelector(submitSel, { timeout: 2000 });
	await btn.click();
	submitted = true;
	ok('Botão submit clicado');
} catch {
	// tenta Enter
	await passEl?.press('Enter');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	submitted = true;
	ok('Login submetido via Enter');
}

// ── 5. Aguardar resposta da API ────────────────────────────────────────────
console.log('[5] Aguardando resposta...');

// escuta a chamada POST /auth/login
let loginResponseStatus = null;
let loginResponseBody = null;
page.on('response', async (r) => {
	if (r.url().includes('/auth/login') && r.request().method() === 'POST') {
		loginResponseStatus = r.status();
		try {
			loginResponseBody = await r.json();
		} catch {
			/* empty */
		}
	}
});

await new Promise((r) => setTimeout(r, 4000));

await page.screenshot({ path: '/tmp/04-after-login.png' });

// ── 6. Verificar resultado ────────────────────────────────────────────────
console.log('[6] Verificando resultado...');
const urlAfter = page.url();
info(`URL após login: ${urlAfter}`);

// Verificar token no localStorage
const token = await page.evaluate(() => localStorage.getItem('auth_token'));
token === 'pulse-dev-token'
	? ok(`Token salvo no localStorage: ${token}`)
	: ko('Token NÃO encontrado no localStorage', token ?? 'null');

// Verificar se saiu da tela de login
const stillHasEmail = await page.$(emailSel);
!stillHasEmail
	? ok('Saiu da tela de login (campo email sumiu)')
	: ko('Ainda na tela de login após submit');

// Verificar erros de rede
networkErrors.length === 0
	? ok('Sem erros de rede')
	: ko(`Erros de rede: ${networkErrors.length}`, networkErrors.join('; '));

// Verificar se API retornou 200
if (loginResponseStatus !== null) {
	loginResponseStatus === 200
		? ok(`POST /api/auth/login → 200 (usuário: ${loginResponseBody?.user?.name})`)
		: ko('POST /api/auth/login falhou', `status=${loginResponseStatus}`);
} else {
	info('Chamada /auth/login não capturada pelo listener (pode já ter ocorrido antes)');
	// Verifica via fetch direto
	const direct = await fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: 'ana.lima@pulsecompany.com', password: 'admin123' }),
	});
	direct.status === 200 ? ok(`API login direto → 200`) : ko(`API login direto → ${direct.status}`);
}

// ── 7. Testar credenciais erradas ─────────────────────────────────────────
console.log('[7] Testando credenciais erradas...');
const badRes = await fetch('http://localhost:8080/api/auth/login', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email: 'hacker@evil.com', password: 'senha_errada' }),
});
badRes.status === 401
	? ok('Credenciais erradas → 401 (API recusa corretamente)')
	: ko('Credenciais erradas não retornam 401', `status=${badRes.status}`);

await browser.close();

// ── Sumário ───────────────────────────────────────────────────────────────
console.log('\n── Screenshots salvas em /tmp/ ──');
console.log('  /tmp/01-initial.png   — app ao abrir');
console.log('  /tmp/02-login-form.png — formulário de login');
console.log('  /tmp/03-filled.png    — credenciais preenchidas');
console.log('  /tmp/04-after-login.png — após submeter');

console.log('\n── Resultado ──');
log.forEach((l) => console.log(l));
console.log(`\nTOTAL: ${pass} ok, ${fail} falhou`);
// eslint-disable-next-line no-undef
process.exit(fail > 0 ? 1 : 0);
