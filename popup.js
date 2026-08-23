const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');
const errorBanner = document.getElementById('errorBanner');
const sectorSelect = document.getElementById('sector');
const periodSelect = document.getElementById('period');
const countInput = document.getElementById('count');
const budgetContextInput = document.getElementById('budgetContext');
const runBtn = document.getElementById('run');
const loadingEl = document.getElementById('loading');
const resultsEl = document.getElementById('results');
const exportCard = document.getElementById('exportCard');
const exportBtn = document.getElementById('exportBtn');

let lastAnalyzedSector = null;

function showError(message) {
  errorBanner.textContent = message;
  errorBanner.style.display = 'block';
}
function clearError() {
  errorBanner.style.display = 'none';
  errorBanner.textContent = '';
}

function setStatus(online, text) {
  statusBar.className = `status-bar ${online ? 'online' : 'offline'}`;
  statusText.textContent = text;
}

async function initStatusAndSectors() {
  try {
    const health = await window.PsxApi.checkHealth();
    setStatus(true, `Backend connected — AI: ${health.aiProvider}, Data: ${health.dataProvider}`);
  } catch (err) {
    setStatus(false, `Backend not reachable at ${window.PsxApi.DEFAULT_BASE_URL} — start it and reopen this popup.`);
    sectorSelect.innerHTML = '<option>Backend offline</option>';
    return;
  }

  try {
    const { sectors } = await window.PsxApi.fetchSectors();
    sectorSelect.innerHTML = '';
    sectors.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      sectorSelect.appendChild(opt);
    });
  } catch (err) {
    showError(`Failed to load sector list: ${err.message}`);
  }
}

function badgeForClassification(classification) {
  const cls = (classification || 'neutral').toLowerCase();
  return `<span class="badge ${cls}">${classification || 'Neutral'}</span>`;
}

function renderCompany(c) {
  const a = c.analysis || {};
  const missingNote = c.missingMetrics && c.missingMetrics.length
    ? `<div class="missing-note">Missing data for: ${c.missingMetrics.join(', ')} — excluded from score, weights re-normalized.</div>`
    : '';

  return `
    <div class="company-card">
      <div class="company-header">
        <span class="company-name">#${c.rank} ${c.name} ${c.ticker ? `(${c.ticker})` : ''}</span>
        <span class="company-score">${c.score ?? 'N/A'}/100</span>
      </div>
      <div>
        ${badgeForClassification(a.budgetImpact?.classification)}
        <span class="badge ${a.isMock ? 'mock' : 'real'}">${a.isMock ? 'MOCK AI' : 'AI'}</span>
      </div>
      <div class="metrics-grid">
        <div class="metric">Price: ${c.price ?? '—'}</div>
        <div class="metric">Growth: ${c.priceGrowthPct ?? '—'}%</div>
        <div class="metric">Volume: ${c.avgDailyVolume ?? '—'}</div>
        <div class="metric">Mkt Cap: ${c.marketCapPkrMn ?? '—'} mn</div>
        <div class="metric">Div Yield: ${c.dividendYieldPct ?? '—'}%</div>
        <div class="metric">EPS: ${c.eps ?? '—'}</div>
        <div class="metric">D/E: ${c.debtToEquity ?? '—'}</div>
        <div class="metric">ROE: ${c.roePct ?? '—'}%</div>
        <div class="metric">As of: ${c.asOf ?? '—'}</div>
      </div>
      ${missingNote}
      <details>
        <summary>AI interpretation ${a.error ? '(failed)' : ''}</summary>
        <div class="analysis-block">
          <strong>Financial health</strong>${a.financialHealthSummary || '—'}
          <strong>Strengths</strong>
          <ul>${(a.strengths || []).map((s) => `<li>${s}</li>`).join('') || '<li>—</li>'}</ul>
          <strong>Risks</strong>
          <ul>${(a.risks || []).map((s) => `<li>${s}</li>`).join('') || '<li>—</li>'}</ul>
          <strong>Budget impact reason</strong>${a.budgetImpact?.reason || '—'}
          <strong>Why ranked highly</strong>${a.whyRankedHighly || '—'}
          <strong>Investment rationale</strong>${a.investmentRationale || '—'}
          ${a.error ? `<strong>Error</strong>${a.error}` : ''}
        </div>
      </details>
      <div style="font-size:10px;color:#888;margin-top:6px">Source: ${c.source || 'unspecified'}</div>
    </div>
  `;
}

function renderResults(data) {
  if (!data.companies || data.companies.length === 0) {
    resultsEl.innerHTML = `<div class="card">${data.note || 'No companies returned for this sector.'}</div>`;
    exportCard.style.display = 'none';
    return;
  }

  const metaHtml = `
    <div class="meta-row">
      Sector: <strong>${data.sector}</strong> · Period: ${data.period} ·
      Showing ${data.returnedCount}/${data.requestedCount} requested ·
      Generated: ${new Date(data.generatedAt).toLocaleString()}
    </div>
  `;

  resultsEl.innerHTML = metaHtml + data.companies.map(renderCompany).join('');
  exportCard.style.display = 'block';
  lastAnalyzedSector = data.sector;
}

runBtn.addEventListener('click', async () => {
  clearError();
  resultsEl.innerHTML = '';
  exportCard.style.display = 'none';
  loadingEl.style.display = 'block';
  runBtn.disabled = true;

  try {
    const data = await window.PsxApi.runAnalysis({
      sector: sectorSelect.value,
      period: periodSelect.value,
      count: countInput.value,
      budgetContext: budgetContextInput.value,
    });
    renderResults(data);
  } catch (err) {
    showError(`Analysis failed: ${err.message}`);
  } finally {
    loadingEl.style.display = 'none';
    runBtn.disabled = false;
  }
});

exportBtn.addEventListener('click', async () => {
  if (!lastAnalyzedSector) return;
  clearError();
  exportBtn.disabled = true;
  exportBtn.textContent = 'Exporting...';
  try {
    const blob = await window.PsxApi.exportToExcel(lastAnalyzedSector);
    const url = URL.createObjectURL(blob);
    const filename = `PSX_${lastAnalyzedSector.replace(/[^a-z0-9]+/gi, '_')}.xlsx`;
    await chrome.downloads.download({ url, filename, saveAs: false });
  } catch (err) {
    showError(`Export failed: ${err.message}`);
  } finally {
    exportBtn.disabled = false;
    exportBtn.textContent = 'Export to Excel (2-sheet .xlsx)';
  }
});

initStatusAndSectors();
