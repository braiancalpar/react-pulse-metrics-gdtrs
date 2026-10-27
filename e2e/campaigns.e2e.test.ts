/**
 * Campanhas E2E — Puppeteer
 *
 * Pré-requisitos (ambos precisam estar rodando antes de `npm run test:e2e`):
 *   npm run api   → backend Go em http://localhost:8080
 *   npm run dev   → Vite    em http://localhost:5173
 *
 * O token de desenvolvimento é injetado via setExtraHTTPHeaders antes de
 * cada teste, dispensando o fluxo de login.
 */

import puppeteer, { Browser, Page } from 'puppeteer';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:5173';
const AUTH_TOKEN = 'pulse-dev-token';
const NAV_TIMEOUT = 15000;

describe('Campanhas E2E', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // Injeta o token em todas as requisições HTTP da página (incluindo axios)
    await page.setExtraHTTPHeaders({ Authorization: `Bearer ${AUTH_TOKEN}` });
  });

  afterEach(async () => {
    await page.close();
  });

  // ---------------------------------------------------------------------------
  // Lista de campanhas
  // ---------------------------------------------------------------------------

  describe('Lista de campanhas (/campaigns)', () => {
    test('exibe contagem de campanhas vindas da API', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

      // Aguarda algum <p> conter "campanhas encontradas"
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });

      const countText = await page.$$eval('p', (els) => {
        const el = els.find((p) => p.textContent?.includes('campanhas encontradas'));
        return el?.textContent ?? '';
      });

      expect(countText).toMatch(/\d+ campanhas encontradas/);
    });

    test('renderiza rows com data-testid="campaign-row"', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });
      const rowCount = await page.$$eval(
        '[data-testid="campaign-row"]',
        (rows) => rows.length,
      );
      expect(rowCount).toBeGreaterThan(0);
    });
  });

  // ---------------------------------------------------------------------------
  // Detalhe de campanha
  // ---------------------------------------------------------------------------

  describe('Detalhe de campanha (/campaigns/:id)', () => {
    test('clicar em campanha não produz tela branca', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });

      // Captura o nome da primeira campanha para comparar depois
      const expectedName = await page.$eval(
        '[data-testid="campaign-name"]',
        (el) => el.textContent ?? '',
      );

      await page.click('[data-testid="campaign-row"]');

      // Em SPAs a navegação é client-side — aguarda o elemento da tela de detalhe
      await page.waitForSelector('[data-testid="campaign-detail-name"]', { timeout: NAV_TIMEOUT });

      const actualName = await page.$eval(
        '[data-testid="campaign-detail-name"]',
        (el) => el.textContent ?? '',
      );
      expect(actualName).toBe(expectedName);
      expect(page.url()).toMatch(/\/campaigns\/\w+/);
    });

    test('detalhe exibe cards de sumário (Budget, Gasto, Período, Objetivo)', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });
      await page.click('[data-testid="campaign-row"]');

      await page.waitForSelector('[data-testid="summary-label"]', { timeout: NAV_TIMEOUT });

      const labels = await page.$$eval(
        '[data-testid="summary-label"]',
        (els) => els.map((e) => e.textContent ?? ''),
      );

      expect(labels).toContain('Budget');
      expect(labels).toContain('Gasto');
      expect(labels).toContain('Período');
      expect(labels).toContain('Objetivo');
    });

    test('detalhe exibe seção "Métricas de Performance"', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });
      await page.click('[data-testid="campaign-row"]');

      await page.waitForSelector('[data-testid="metrics-title"]', { timeout: NAV_TIMEOUT });

      const title = await page.$eval(
        '[data-testid="metrics-title"]',
        (el) => el.textContent ?? '',
      );
      expect(title).toContain('Métricas de Performance');
    });

    test('botão ← Voltar retorna para /campaigns', async () => {
      await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });
      await page.click('[data-testid="campaign-row"]');

      await page.waitForSelector('[data-testid="back-button"]', { timeout: NAV_TIMEOUT });

      await page.click('[data-testid="back-button"]');

      // Aguarda a lista reaparecer
      await page.waitForSelector('[data-testid="campaign-row"]', { timeout: NAV_TIMEOUT });

      expect(page.url()).toMatch(/\/campaigns$/);
    });

    test('ID inválido exibe mensagem de erro da API', async () => {
      await page.goto(`${BASE_URL}/campaigns/99999999`, {
        waitUntil: 'networkidle0',
        timeout: NAV_TIMEOUT,
      });

      await page.waitForSelector('[data-testid="error-message"]', { timeout: NAV_TIMEOUT });

      const errorText = await page.$eval(
        '[data-testid="error-message"]',
        (el) => el.textContent ?? '',
      );
      expect(errorText.trim().length).toBeGreaterThan(0);
    });
  });
});
