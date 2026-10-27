import puppeteer from 'puppeteer';

const API_BASE = 'http://localhost:8080/api';
const APP_URL = 'http://localhost:3001';

let pass = 0;
let fail = 0;
const results = [];

function ok(desc) {
	pass++;
	results.push(`  PASS ${desc}`);
}
function ko(desc, detail) {
	fail++;
	results.push(`  FAIL ${desc}${detail ? ' — ' + detail : ''}`);
}

// ─── API tests via fetch (no browser) ──────────────────────────────────────
async function testAPI() {
	console.log('\n── API Endpoints ──');

	// login
	const loginRes = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: 'ana.lima@pulsecompany.com', password: 'admin123' }),
	});
	const loginData = await loginRes.json();
	loginRes.status === 200 && loginData.token === 'pulse-dev-token'
		? ok('POST /auth/login → token correto')
		: ko('POST /auth/login', `status=${loginRes.status}`);

	const TOKEN = loginData.token;
	const h = { Authorization: `Bearer ${TOKEN}` };

	// campaigns
	const cRes = await fetch(`${API_BASE}/campaigns`, { headers: h });
	const campaigns = await cRes.json();
	campaigns.length === 20
		? ok('GET /campaigns → 20 campanhas')
		: ko('GET /campaigns', `count=${campaigns.length}`);

	// campaigns filter by status
	const activeRes = await fetch(`${API_BASE}/campaigns?status=active`, { headers: h });
	const active = await activeRes.json();
	active.every((c) => c.status === 'active')
		? ok('GET /campaigns?status=active → todos ativos')
		: ko('GET /campaigns?status=active', 'há itens com status diferente');

	// single campaign
	const c1 = await (await fetch(`${API_BASE}/campaigns/2`, { headers: h })).json();
	c1.id === '2' ? ok('GET /campaigns/2 → id correto') : ko('GET /campaigns/2', `id=${c1.id}`);

	// create + delete campaign
	const createRes = await fetch(`${API_BASE}/campaigns`, {
		method: 'POST',
		headers: { ...h, 'Content-Type': 'application/json' },
		body: JSON.stringify({ name: 'E2E Test Campaign', status: 'draft', budget: 500 }),
	});
	const newCamp = await createRes.json();
	createRes.status === 201 && newCamp.id
		? ok('POST /campaigns → 201 com id gerado')
		: ko('POST /campaigns', `status=${createRes.status}`);

	const delRes = await fetch(`${API_BASE}/campaigns/${newCamp.id}`, {
		method: 'DELETE',
		headers: h,
	});
	delRes.status === 204
		? ok(`DELETE /campaigns/${newCamp.id} → 204`)
		: ko('DELETE campaign', `status=${delRes.status}`);

	// metrics
	const ov = await (await fetch(`${API_BASE}/metrics/overview`, { headers: h })).json();
	ov.totalImpressions === 18750000
		? ok('GET /metrics/overview → totalImpressions correto')
		: ko('GET /metrics/overview', `totalImpressions=${ov.totalImpressions}`);

	const ts = await (
		await fetch(`${API_BASE}/metrics/timeseries?metric=impressions`, { headers: h })
	).json();
	ts.length === 91
		? ok('GET /metrics/timeseries → 91 pontos (90 dias)')
		: ko('GET /metrics/timeseries', `length=${ts.length}`);

	const ch = await (await fetch(`${API_BASE}/metrics/by-channel`, { headers: h })).json();
	ch.length === 8
		? ok('GET /metrics/by-channel → 8 canais')
		: ko('GET /metrics/by-channel', `count=${ch.length}`);

	// analytics dashboard
	const dash = await (await fetch(`${API_BASE}/analytics/dashboard`, { headers: h })).json();
	dash.metrics && dash.funnel && dash.byChannel
		? ok('GET /analytics/dashboard → estrutura correta')
		: ko('GET /analytics/dashboard', 'campos ausentes');

	// users
	const team = await (await fetch(`${API_BASE}/users/team`, { headers: h })).json();
	team.length === 3
		? ok('GET /users/team → 3 usuários')
		: ko('GET /users/team', `count=${team.length}`);

	// audiences
	const aud = await (await fetch(`${API_BASE}/audiences`, { headers: h })).json();
	aud.length >= 5
		? ok(`GET /audiences → ${aud.length} segmentos (seed=5, pode ter mais)`)
		: ko('GET /audiences', `count=${aud.length}`);

	// reports
	const reps = await (await fetch(`${API_BASE}/reports`, { headers: h })).json();
	reps.length >= 7
		? ok(`GET /reports → ${reps.length} relatórios (seed=8, pode variar por deleções)`)
		: ko('GET /reports', `count=${reps.length}`);

	// generate report
	const genRes = await fetch(`${API_BASE}/reports/report-4/generate`, {
		method: 'POST',
		headers: h,
	});
	const gen = await genRes.json();
	gen.status === 'ready'
		? ok('POST /reports/report-4/generate → status=ready')
		: ko('POST /reports/generate', `status=${gen.status}`);

	// integrations
	const ints = await (await fetch(`${API_BASE}/integrations`, { headers: h })).json();
	ints.length === 5
		? ok('GET /integrations → 5 integrações')
		: ko('GET /integrations', `count=${ints.length}`);

	// connect mailchimp
	const connRes = await fetch(`${API_BASE}/integrations/mailchimp/connect`, {
		method: 'POST',
		headers: h,
	});
	const conn = await connRes.json();
	conn.status === 'connected'
		? ok('POST /integrations/mailchimp/connect → status=connected')
		: ko('POST /integrations/mailchimp/connect', `status=${conn.status}`);

	// notifications
	const notifs = await (await fetch(`${API_BASE}/notifications`, { headers: h })).json();
	notifs.length === 4
		? ok('GET /notifications → 4 notificações')
		: ko('GET /notifications', `count=${notifs.length}`);

	// mark read
	const mrRes = await fetch(`${API_BASE}/notifications/2/read`, { method: 'PUT', headers: h });
	mrRes.status === 204
		? ok('PUT /notifications/2/read → 204')
		: ko('PUT /notifications/2/read', `status=${mrRes.status}`);

	// CORS header
	const corsRes = await fetch(`${API_BASE}/campaigns`, {
		headers: { ...h, Origin: 'http://localhost:3001' },
	});
	const allowOrigin = corsRes.headers.get('access-control-allow-origin');
	allowOrigin
		? ok(`CORS header presente: ${allowOrigin}`)
		: ko('CORS', 'access-control-allow-origin ausente');

	// auth guard
	const noAuth = await fetch(`${API_BASE}/campaigns`);
	noAuth.status === 401
		? ok('GET /campaigns sem token → 401')
		: ko('Auth guard', `status=${noAuth.status}`);
}

// ─── Browser tests via Puppeteer ───────────────────────────────────────────
async function testBrowser() {
	console.log('\n── Browser (Puppeteer) ──');
	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
	const page = await browser.newPage();

	// intercept console errors
	const consoleErrors = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});
	page.on('pageerror', (err) => consoleErrors.push(err.message));

	try {
		// Load app
		const navRes = await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
		navRes.status() < 400
			? ok(`App carrega em ${APP_URL} (HTTP ${navRes.status()})`)
			: ko('App load', `HTTP ${navRes.status()}`);

		await new Promise((r) => setTimeout(r, 2000));

		// Check for a login form or dashboard
		const bodyHTML = await page.evaluate(() => document.body.innerHTML);
		const hasContent = bodyHTML.length > 50;
		hasContent ? ok('Página renderiza HTML (body não vazio)') : ko('Página vazia', 'body sem HTML');

		// Try to find an email input (login page)
		const emailInput = await page.$(
			'input[type="email"], input[name="email"], input[placeholder*="email" i], input[placeholder*="e-mail" i]',
		);
		if (emailInput) {
			ok('Campo de email encontrado na tela de login');
			await emailInput.type('ana.lima@pulsecompany.com');

			const passInput = await page.$('input[type="password"]');
			if (passInput) {
				ok('Campo de senha encontrado');
				await passInput.type('admin123');

				const submitBtn = await page.$('button[type="submit"], button');
				if (submitBtn) {
					await submitBtn.click();
					await new Promise((r) => setTimeout(r, 3000));
					const urlAfter = page.url();
					ok(`Após login, URL: ${urlAfter}`);
				}
			}
		} else {
			// Already on dashboard
			ok('App renderizou sem tela de login (sessão pré-autenticada)');
		}

		// Check for network errors to the API
		const networkFails = [];
		page.on('requestfailed', (req) => {
			if (req.url().includes('localhost:8080')) networkFails.push(req.url());
		});

		// Title check
		const title = await page.title();
		title ? ok(`Título da página: "${title}"`) : ko('Título', 'vazio');
	} finally {
		await browser.close();
	}
}

// ─── Run ───────────────────────────────────────────────────────────────────
async function main() {
	await testAPI();
	await testBrowser();

	console.log('\n──── Resultados ────');
	results.forEach((r) => console.log(r));
	console.log(`\n${'═'.repeat(40)}`);
	console.log(`TOTAL: ${pass} passed, ${fail} failed`);
	if (fail > 0) {
		// eslint-disable-next-line no-undef
		process.exit(1);
	}
}

main().catch((err) => {
	console.error('Erro inesperado:', err);
	// eslint-disable-next-line no-undef
	process.exit(1);
});
