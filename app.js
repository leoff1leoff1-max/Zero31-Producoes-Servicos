const STORAGE_KEY = "zero31-fechamento-pro-v2";

const defaultState = {
  event: {
    company: "Zero31 Produções & Serviços",
    name: "Boate OKTA | Evento Modelo",
    client: "Cliente exemplo",
    date: "2026-04-18",
    venue: "Belo Horizonte",
    stage: "Pós-evento",
    manager: "Equipe Financeira",
    expectedAudience: 1200,
    serviceRate: 0.08,
    debitRate: 0.023,
    pixRate: 0.023,
    creditRate: 0.038,
    notes:
      "Operação piloto da Zero31. Use este modelo como base e substitua pelos números reais do evento.",
  },
  modulePayments: {
    bar: { debito: 8200, pix: 6400, credito: 14800 },
    ticket: { debito: 2100, pix: 1800, credito: 6900 },
    tobacco: { debito: 320, pix: 440, credito: 890 },
  },
  barProducts: [
    { name: "Água", category: "Soft", cost: 1.25, price: 5, soldQty: 110, productionQty: 6 },
    { name: "Red Bull", category: "Soft", cost: 6.99, price: 22, soldQty: 92, productionQty: 4 },
    { name: "Heineken Lata 350", category: "Cerveja", cost: 4.79, price: 17, soldQty: 185, productionQty: 10 },
    { name: "Combo Smirnoff", category: "Combos", cost: 60.86, price: 350, soldQty: 18, productionQty: 2 },
    { name: "Gin Tônica", category: "Drinks", cost: 24.5, price: 35, soldQty: 66, productionQty: 3 },
    { name: "Espumante Chandon", category: "Garrafa", cost: 79.9, price: 200, soldQty: 14, productionQty: 1 },
  ],
  ticketSales: [
    { name: "Ingresso pista", qty: 420, price: 40 },
    { name: "Ingresso premium", qty: 85, price: 85 },
    { name: "Cortesia convertida", qty: 18, price: 20 },
  ],
  tobaccoSales: [
    { name: "Bala de goma", qty: 64, price: 3 },
    { name: "Cigarro Mandelle", qty: 22, price: 4 },
    { name: "Narguilé refil alcoólico", qty: 14, price: 100 },
    { name: "Produto dinâmico", qty: 19, price: 25 },
  ],
  operationalExpenses: [
    { name: "Sistema de vendas", qty: 1, unit: 30 },
    { name: "Financeiro", qty: 2, unit: 250 },
    { name: "Auxiliar financeiro", qty: 1, unit: 180 },
    { name: "Coordenador geral", qty: 1, unit: 250 },
    { name: "Coordenador de bar", qty: 2, unit: 200 },
    { name: "Atendentes de bar", qty: 8, unit: 130 },
  ],
  suppliesExpenses: [
    { name: "Refrigerante 2L", qty: 12, unit: 7.99 },
    { name: "Foguinhos", qty: 24, unit: 3.89 },
    { name: "Gelo escama", qty: 20, unit: 12 },
    { name: "Gelo cubo", qty: 18, unit: 8 },
    { name: "Copo descartável", qty: 3, unit: 149 },
    { name: "Frete bar", qty: 2, unit: 95 },
  ],
  additionalExpenses: [
    { name: "Sangria produção", qty: 1, unit: 500 },
    { name: "Ajuste equipe volante", qty: 1, unit: 260 },
    { name: "Reembolso emergencial", qty: 1, unit: 180 },
  ],
  cashiers: [
    {
      name: "Caixa 001",
      sale: 7800,
      troco: 300,
      credito: 2800,
      debito: 1700,
      dinheiro: 2300,
      pix: 1000,
      devolucoes: 0,
      sangria: 0,
      voucher: 0,
      fixed: 120,
    },
    {
      name: "Caixa 002",
      sale: 6950,
      troco: 250,
      credito: 2100,
      debito: 1400,
      dinheiro: 2150,
      pix: 950,
      devolucoes: 0,
      sangria: 0,
      voucher: 0,
      fixed: 120,
    },
    {
      name: "Caixa 003",
      sale: 8420,
      troco: 350,
      credito: 3120,
      debito: 1980,
      dinheiro: 2140,
      pix: 1180,
      devolucoes: 0,
      sangria: 0,
      voucher: 0,
      fixed: 120,
    },
  ],
  productionConsumption: [
    { person: "Equipe produção", qty: 12, product: "Água", unit: 1.25 },
    { person: "Equipe produção", qty: 8, product: "Refrigerante", unit: 3.39 },
    { person: "Segurança", qty: 10, product: "Água", unit: 1.25 },
  ],
  costSales: [
    { person: "Staff interno", qty: 3, product: "Combo Smirnoff", unit: 60.86 },
    { person: "Equipe operação", qty: 8, product: "Gin Tônica", unit: 24.5 },
  ],
  artisticConsumption: [
    { person: "Artista principal", qty: 3, product: "Red Bull", unit: 6.99 },
    { person: "Backstage", qty: 4, product: "Água", unit: 1.25 },
  ],
};

const schemas = {
  barProducts: [
    { key: "name", label: "Produto", type: "text" },
    { key: "category", label: "Categoria", type: "text" },
    { key: "cost", label: "Custo", type: "number", step: "0.01" },
    { key: "price", label: "Venda", type: "number", step: "0.01" },
    { key: "soldQty", label: "Qtd vendida", type: "number", step: "1" },
    { key: "productionQty", label: "Qtd produção", type: "number", step: "1" },
  ],
  ticketSales: [
    { key: "name", label: "Ingresso", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "price", label: "Valor", type: "number", step: "0.01" },
  ],
  tobaccoSales: [
    { key: "name", label: "Produto", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "price", label: "Valor", type: "number", step: "0.01" },
  ],
  operationalExpenses: [
    { key: "name", label: "Item", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "unit", label: "Unitário", type: "number", step: "0.01" },
  ],
  suppliesExpenses: [
    { key: "name", label: "Item", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "unit", label: "Unitário", type: "number", step: "0.01" },
  ],
  additionalExpenses: [
    { key: "name", label: "Item", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "unit", label: "Unitário", type: "number", step: "0.01" },
  ],
  cashiers: [
    { key: "name", label: "Caixa", type: "text" },
    { key: "sale", label: "Venda", type: "number", step: "0.01" },
    { key: "troco", label: "Troco", type: "number", step: "0.01" },
    { key: "credito", label: "Crédito", type: "number", step: "0.01" },
    { key: "debito", label: "Débito", type: "number", step: "0.01" },
    { key: "dinheiro", label: "Dinheiro", type: "number", step: "0.01" },
    { key: "pix", label: "PIX", type: "number", step: "0.01" },
    { key: "devolucoes", label: "Devoluções", type: "number", step: "0.01" },
    { key: "sangria", label: "Sangria", type: "number", step: "0.01" },
    { key: "voucher", label: "Voucher", type: "number", step: "0.01" },
    { key: "fixed", label: "Fixo", type: "number", step: "0.01" },
  ],
  productionConsumption: [
    { key: "person", label: "Responsável", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
  costSales: [
    { key: "person", label: "Responsável", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
  artisticConsumption: [
    { key: "person", label: "Responsável", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
};

let state = loadState();
let lastSavedAt = Date.now();

document.addEventListener("DOMContentLoaded", () => {
  bindStaticActions();
  setupSectionObserver();
  render();
  updateSaveStatus("Autosave ativo");
});

function bindStaticActions() {
  document.addEventListener("change", handleChange);
  document.addEventListener("click", handleClick);

  document.getElementById("reset-button").addEventListener("click", () => {
    state = structuredClone(defaultState);
    persistAndRender("Modelo restaurado");
  });

  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("export-button").addEventListener("click", exportSnapshot);
  document.getElementById("import-button").addEventListener("click", () => {
    document.getElementById("import-file").click();
  });

  document.getElementById("import-file").addEventListener("change", importSnapshot);
}

function setupSectionObserver() {
  const links = [...document.querySelectorAll(".section-nav a")];
  const targets = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      links.forEach((link) =>
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`),
      );
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.2, 0.4, 0.6] },
  );

  targets.forEach((target) => observer.observe(target));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);

  try {
    return mergeState(JSON.parse(saved));
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function mergeState(saved) {
  return {
    ...structuredClone(defaultState),
    ...saved,
    event: { ...defaultState.event, ...(saved.event || {}) },
    modulePayments: {
      bar: { ...defaultState.modulePayments.bar, ...(saved.modulePayments?.bar || {}) },
      ticket: { ...defaultState.modulePayments.ticket, ...(saved.modulePayments?.ticket || {}) },
      tobacco: { ...defaultState.modulePayments.tobacco, ...(saved.modulePayments?.tobacco || {}) },
    },
    barProducts: normalizeCollection(saved.barProducts, defaultState.barProducts),
    ticketSales: normalizeCollection(saved.ticketSales, defaultState.ticketSales),
    tobaccoSales: normalizeCollection(saved.tobaccoSales, defaultState.tobaccoSales),
    operationalExpenses: normalizeCollection(saved.operationalExpenses, defaultState.operationalExpenses),
    suppliesExpenses: normalizeCollection(saved.suppliesExpenses, defaultState.suppliesExpenses),
    additionalExpenses: normalizeCollection(saved.additionalExpenses, defaultState.additionalExpenses),
    cashiers: normalizeCollection(saved.cashiers, defaultState.cashiers),
    productionConsumption: normalizeCollection(
      saved.productionConsumption,
      defaultState.productionConsumption,
    ),
    costSales: normalizeCollection(saved.costSales, defaultState.costSales),
    artisticConsumption: normalizeCollection(saved.artisticConsumption, defaultState.artisticConsumption),
  };
}

function normalizeCollection(candidate, fallback) {
  return Array.isArray(candidate) ? candidate : structuredClone(fallback);
}

function saveState(message = "Alterações salvas") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  lastSavedAt = Date.now();
  updateSaveStatus(message);
}

function updateSaveStatus(message) {
  const statusEl = document.getElementById("save-status");
  const timeEl = document.getElementById("save-time");
  statusEl.textContent = message;
  timeEl.textContent = formatTime(lastSavedAt);
}

function handleChange(event) {
  const target = event.target;

  if (target.dataset.scope === "event") {
    state.event[target.dataset.field] = normalizeValue(target);
    persistAndRender("Configuração atualizada");
    return;
  }

  if (target.dataset.scope === "payment") {
    state.modulePayments[target.dataset.module][target.dataset.field] = toNumber(target.value);
    persistAndRender("Pagamentos atualizados");
    return;
  }

  if (target.dataset.array) {
    const row = state[target.dataset.array][Number(target.dataset.index)];
    if (!row) return;
    row[target.dataset.field] = normalizeValue(target);
    persistAndRender("Linha atualizada");
  }
}

function handleClick(event) {
  const addButton = event.target.closest(".add-row");
  if (addButton) {
    addRow(addButton.dataset.array);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-array]");
  if (deleteButton) {
    const collection = state[deleteButton.dataset.deleteArray];
    collection.splice(Number(deleteButton.dataset.deleteIndex), 1);
    persistAndRender("Linha removida");
  }
}

function normalizeValue(target) {
  if (target.type === "number") return toNumber(target.value);
  return target.value;
}

function addRow(arrayName) {
  const schema = schemas[arrayName];
  const row = {};
  schema.forEach((column) => {
    row[column.key] = column.type === "number" ? 0 : "";
  });
  if (arrayName === "cashiers") row.fixed = 120;
  state[arrayName].push(row);
  persistAndRender("Nova linha adicionada");
}

function persistAndRender(message) {
  saveState(message);
  render();
}

function render() {
  const metrics = computeMetrics(state);
  renderHero(metrics);
  renderOverview(metrics);
  renderEventSection(metrics);
  renderOperationSection(metrics);
  renderCashierSection(metrics);
  renderExpenseSection(metrics);
  renderConsumptionSection(metrics);
  renderReport(metrics);
}

function renderHero(metrics) {
  document.title = `${state.event.name} | Zero31`;
  document.getElementById("hero-title").textContent = state.event.name || "Fechamento Executivo do Evento";
  document.getElementById("hero-description").textContent =
    "Controle o fechamento com visão operacional, leitura financeira e apresentação executiva em um único painel.";

  const tags = [
    `${state.event.client || "Cliente não informado"}`,
    `${state.event.venue || "Local não informado"}`,
    `${formatDate(state.event.date) || "Data pendente"}`,
    `${state.event.stage || "Sem estágio"}`,
  ];

  document.getElementById("hero-tags").innerHTML = tags
    .map((tag) => `<span class="hero-tag">${tag}</span>`)
    .join("");

  document.getElementById("health-score").textContent = Math.round(metrics.health.score);
  document.getElementById("health-summary").textContent = metrics.health.summary;
  document.getElementById("health-bar").style.width = `${metrics.health.score}%`;
  document.getElementById("next-step-title").textContent = metrics.workflow.nextStep.title;
  document.getElementById("next-step-copy").textContent = metrics.workflow.nextStep.copy;
  document.getElementById("hero-subtitle").textContent =
    `${state.event.company} | Responsável: ${state.event.manager || "não informado"} | Público esperado: ${formatInteger(
      state.event.expectedAudience,
    )}`;
}

function renderOverview(metrics) {
  document.getElementById("summary-ribbon").innerHTML = [
    summaryCard("Receita consolidada", metrics.transferBase, "Bar + produção + receitas auxiliares"),
    summaryCard("Resultado do bar", metrics.barResult, "Receita do bar menos taxa, operacional e insumos"),
    summaryCard("Saldo operacional", metrics.netOperationalBalance, "Após comissão de serviços e demais despesas"),
    summaryCard(
      "Bar transferir",
      metrics.transferToBar,
      "Saldo do bar + bilheteria líquida + tabacaria líquida",
      metrics.transferToBar >= 0 ? "positive" : "warning",
    ),
  ].join("");

  document.getElementById("revenue-total").textContent = formatCurrency(metrics.transferBase);
  document.getElementById("expense-total").textContent = formatCurrency(metrics.expensesGrand);
  document.getElementById("revenue-chart").innerHTML = renderBars([
    { label: "Bar", value: metrics.barRevenue, tone: "dark" },
    { label: "Produção", value: metrics.productionRevenue, tone: "teal" },
    { label: "Bilheteria líquida", value: metrics.ticketNet, tone: "" },
    { label: "Tabacaria líquida", value: metrics.tobaccoNet, tone: "teal" },
  ]);

  document.getElementById("expense-chart").innerHTML = renderBars([
    { label: "Taxas financeiras", value: metrics.barFees + metrics.ticketFees + metrics.tobaccoFees, tone: "" },
    { label: "Operacional", value: metrics.operationalTotal, tone: "dark" },
    { label: "Insumos + custo bebidas", value: metrics.suppliesTotal, tone: "teal" },
    { label: "Demais despesas", value: metrics.additionalTotal, tone: "" },
  ]);

  document.getElementById("overall-progress").textContent = `${Math.round(metrics.workflow.overall)}%`;
  document.getElementById("workflow-steps").innerHTML = metrics.workflow.steps
    .map(
      (step) => `
        <article class="workflow-step">
          <div class="workflow-step-head">
            <strong>${step.title}</strong>
            <span>${Math.round(step.progress)}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${step.progress}%"></div>
          </div>
        </article>
      `,
    )
    .join("");

  document.getElementById("alert-count").textContent = `${metrics.alerts.length} alertas`;
  document.getElementById("alert-stack").innerHTML = metrics.alerts
    .map(
      (alert) => `
        <article class="alert-card alert-card--${alert.level}">
          <span class="alert-title">${alert.title}</span>
          <span>${alert.body}</span>
        </article>
      `,
    )
    .join("");
}

function renderEventSection(metrics) {
  document.getElementById("event-form").innerHTML = [
    fieldTemplate("Empresa", "event", "company", state.event.company, "text"),
    fieldTemplate("Nome do evento", "event", "name", state.event.name, "text"),
    fieldTemplate("Cliente", "event", "client", state.event.client, "text"),
    fieldTemplate("Data", "event", "date", state.event.date, "date"),
    fieldTemplate("Local / cidade", "event", "venue", state.event.venue, "text"),
    fieldTemplate("Responsável", "event", "manager", state.event.manager, "text"),
    fieldTemplate("Estágio", "event", "stage", state.event.stage, "text"),
    fieldTemplate(
      "Público esperado",
      "event",
      "expectedAudience",
      state.event.expectedAudience,
      "number",
      "1",
    ),
  ].join("");

  document.getElementById("fee-form").innerHTML = [
    fieldTemplate("Comissão de serviços", "event", "serviceRate", state.event.serviceRate, "number", "0.001"),
    fieldTemplate("Taxa débito", "event", "debitRate", state.event.debitRate, "number", "0.001"),
    fieldTemplate("Taxa PIX", "event", "pixRate", state.event.pixRate, "number", "0.001"),
    fieldTemplate("Taxa crédito", "event", "creditRate", state.event.creditRate, "number", "0.001"),
  ].join("");

  document.getElementById("event-notes").value = state.event.notes || "";
}

function renderOperationSection(metrics) {
  document.getElementById("module-strip").innerHTML = [
    moduleCard("Bar", formatCurrency(metrics.barRevenue), `Margem bruta ${formatPercent(metrics.barGrossMargin)}`),
    moduleCard(
      "Bilheteria",
      formatCurrency(metrics.ticketNet),
      `${formatInteger(metrics.ticketAudience)} ingressos lançados`,
    ),
    moduleCard(
      "Tabacaria",
      formatCurrency(metrics.tobaccoNet),
      `${formatInteger(metrics.tobaccoUnits)} itens vendidos`,
    ),
    moduleCard(
      "Receita auxiliar",
      formatCurrency(metrics.productionRevenue),
      "Venda a preço de custo + frentes auxiliares",
    ),
  ].join("");

  document.getElementById("bar-kpis").innerHTML = [
    miniCard("Produtos ativos", formatInteger(metrics.barProductCount), `${formatInteger(metrics.barSoldUnits)} unidades vendidas`),
    miniCard("Custo bebidas", formatCurrency(metrics.beverageSalesCost), "Somente itens vendidos"),
    miniCard("Custo produção", formatCurrency(metrics.beverageProductionCost), "Saída para produção"),
  ].join("");

  document.getElementById("ticket-kpis").innerHTML = [
    miniCard("Bilheteria bruta", formatCurrency(metrics.ticketGross), `${formatInteger(metrics.ticketAudience)} ingressos`),
    miniCard("Taxa financeira", formatCurrency(metrics.ticketFees), "Sobre débito, PIX e crédito"),
    miniCard("Bilheteria líquida", formatCurrency(metrics.ticketNet), "Valor líquido da portaria"),
  ].join("");

  document.getElementById("tobacco-kpis").innerHTML = [
    miniCard("Tabacaria bruta", formatCurrency(metrics.tobaccoGross), `${formatInteger(metrics.tobaccoUnits)} unidades`),
    miniCard("Taxa financeira", formatCurrency(metrics.tobaccoFees), "Sobre pagamentos lançados"),
    miniCard("Tabacaria líquida", formatCurrency(metrics.tobaccoNet), "Valor líquido do módulo"),
  ].join("");

  document.getElementById("bar-module-kpis").innerHTML = `
    <span class="metric-label">Fechamento do bar</span>
    <strong>${formatCurrency(metrics.barRevenue)}</strong>
    <span class="metric-hint">Pagamentos lançados no bar: ${formatCurrency(metrics.barPaymentTotal)}</span>
    <span class="metric-hint">Taxa financeira do bar: ${formatCurrency(metrics.barFees)} | Resultado do bar: ${formatCurrency(metrics.barResult)}</span>
  `;

  renderCollectionTable(
    "bar-products-table",
    "barProducts",
    state.barProducts,
    (row) => [
      formatCurrency(toNumber(row.cost) * toNumber(row.soldQty)),
      formatCurrency(toNumber(row.price) * toNumber(row.soldQty)),
      formatCurrency(toNumber(row.cost) * toNumber(row.productionQty)),
    ],
    ["Custo vendas", "Receita", "Custo produção"],
  );

  renderCollectionTable("ticket-sales-table", "ticketSales", state.ticketSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);

  renderCollectionTable("tobacco-sales-table", "tobaccoSales", state.tobaccoSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);

  renderPaymentForm("bar-payment-form", "bar");
  renderPaymentForm("ticket-payment-form", "ticket");
  renderPaymentForm("tobacco-payment-form", "tobacco");
}

function renderCashierSection(metrics) {
  document.getElementById("cashier-kpis").innerHTML = [
    miniCard("Venda declarada", formatCurrency(metrics.cashiersSales), `${formatInteger(state.cashiers.length)} caixas`),
    miniCard("Diferença consolidada", formatCurrency(metrics.cashiersDifference), Math.abs(metrics.cashiersDifference) <= 0.01 ? "Sem divergência relevante" : "Conferir fechamento"),
    miniCard("Total a pagar", formatCurrency(metrics.cashiersPayable), "Fixo + comissão dos operadores"),
  ].join("");

  renderCashierTable(metrics.cashiersDetails);
}

function renderExpenseSection(metrics) {
  document.getElementById("expense-kpis").innerHTML = [
    miniCard("Operacional", formatCurrency(metrics.operationalTotal), "Equipe, coordenação e sistema"),
    miniCard("Insumos totais", formatCurrency(metrics.suppliesTotal), "Insumos adicionais + custo das bebidas"),
    miniCard("Demais despesas", formatCurrency(metrics.additionalTotal), "Descontadas após o resultado do bar"),
  ].join("");

  renderCollectionTable("operational-expenses-table", "operationalExpenses", state.operationalExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);

  renderCollectionTable("supplies-expenses-table", "suppliesExpenses", state.suppliesExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);

  renderCollectionTable("additional-expenses-table", "additionalExpenses", state.additionalExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
}

function renderConsumptionSection(metrics) {
  document.getElementById("consumption-kpis").innerHTML = [
    miniCard("Consumo produção", formatCurrency(metrics.productionConsumptionTotal), "Saída operacional interna"),
    miniCard("Venda a custo", formatCurrency(metrics.productionRevenue), "Receita de produção"),
    miniCard("Consumo artístico", formatCurrency(metrics.artisticTotal), "Controle separado do evento"),
  ].join("");

  renderCollectionTable(
    "production-consumption-table",
    "productionConsumption",
    state.productionConsumption,
    (row) => [formatCurrency(lineTotal(row))],
    ["Total"],
  );
  renderCollectionTable("cost-sales-table", "costSales", state.costSales, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
  renderCollectionTable(
    "artistic-consumption-table",
    "artisticConsumption",
    state.artisticConsumption,
    (row) => [formatCurrency(lineTotal(row))],
    ["Total"],
  );
}

function renderReport(metrics) {
  document.getElementById("report-transfer").textContent = formatCurrency(metrics.transferToBar);
  document.getElementById("report-margin").textContent =
    `Margem final sobre receita consolidada: ${formatPercent(metrics.transferMargin)}`;
  document.getElementById("report-headline").textContent = createReportHeadline(metrics);
  document.getElementById("report-narrative").textContent = createReportNarrative(metrics);

  document.getElementById("report-kpis").innerHTML = [
    summaryCard("Bilheteria líquida", metrics.ticketNet, `Bruto ${formatCurrency(metrics.ticketGross)}`),
    summaryCard("Tabacaria líquida", metrics.tobaccoNet, `Bruto ${formatCurrency(metrics.tobaccoGross)}`),
    summaryCard("Comissão de serviços", metrics.serviceCommission, `${formatPercent(state.event.serviceRate)} do resultado do bar`),
    summaryCard("Consumo artístico", metrics.artisticTotal, "Separado do custo operacional"),
    summaryCard("A pagar aos caixas", metrics.cashiersPayable, "Fixo + comissão"),
    summaryCard("Receita produção", metrics.productionRevenue, "Venda a preço de custo"),
  ].join("");

  document.getElementById("report-insights").innerHTML = generateInsights(metrics)
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("report-breakdown").innerHTML = [
    breakdownItem("Receita bar", metrics.barRevenue),
    breakdownItem("Venda produção", metrics.productionRevenue),
    breakdownItem("Taxas do bar", -metrics.barFees),
    breakdownItem("Operacional", -metrics.operationalTotal),
    breakdownItem("Insumos e custo bebidas", -metrics.suppliesTotal),
    breakdownItem("Resultado do bar", metrics.barResult),
    breakdownItem("Comissão de serviços", -metrics.serviceCommission),
    breakdownItem("Demais despesas", -metrics.additionalTotal),
    breakdownItem("Portaria líquida", metrics.ticketNet),
    breakdownItem("Tabacaria líquida", metrics.tobaccoNet),
    breakdownItem("Bar transferir", metrics.transferToBar),
  ].join("");
}

function renderPaymentForm(containerId, moduleName) {
  const payment = state.modulePayments[moduleName];
  document.getElementById(containerId).innerHTML = [
    paymentFieldTemplate("Débito", moduleName, "debito", payment.debito),
    paymentFieldTemplate("PIX", moduleName, "pix", payment.pix),
    paymentFieldTemplate("Crédito", moduleName, "credito", payment.credito),
    paymentFieldTemplate("Total lançado", moduleName, "_readonly", payment.debito + payment.pix + payment.credito, "readonly"),
  ].join("");
}

function renderCollectionTable(containerId, arrayName, rows, readonlyBuilder, readonlyLabels) {
  const headers = [
    ...schemas[arrayName].map((column) => `<th>${column.label}</th>`),
    ...readonlyLabels.map((label) => `<th>${label}</th>`),
    "<th>Ações</th>",
  ].join("");

  const body = rows
    .map((row, index) => {
      const inputCells = schemas[arrayName]
        .map(
          (column) => `
            <td>
              <input
                class="cell-input"
                data-array="${arrayName}"
                data-index="${index}"
                data-field="${column.key}"
                type="${column.type}"
                step="${column.step || "1"}"
                value="${escapeAttribute(row[column.key] ?? "")}"
              />
            </td>
          `,
        )
        .join("");

      const readonlyCells = readonlyBuilder(row)
        .map((value) => `<td class="readonly">${value}</td>`)
        .join("");

      return `
        <tr>
          ${inputCells}
          ${readonlyCells}
          <td>
            <button
              type="button"
              class="table-action danger-button"
              data-delete-array="${arrayName}"
              data-delete-index="${index}"
            >
              Excluir
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  document.getElementById(containerId).innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function renderCashierTable(cashiersDetails) {
  const headers = [
    "Caixa",
    "Venda",
    "Troco",
    "Crédito",
    "Débito",
    "Dinheiro",
    "PIX",
    "Devoluções",
    "Sangria",
    "Voucher",
    "Fixo",
    "Total",
    "Diferença",
    "Comissão",
    "Pagar",
    "Ações",
  ];

  const body = cashiersDetails
    .map((detail, index) => {
      const row = state.cashiers[index];
      const inputCells = schemas.cashiers
        .map(
          (column) => `
            <td>
              <input
                class="cell-input"
                data-array="cashiers"
                data-index="${index}"
                data-field="${column.key}"
                type="${column.type}"
                step="${column.step || "1"}"
                value="${escapeAttribute(row[column.key] ?? "")}"
              />
            </td>
          `,
        )
        .join("");

      return `
        <tr>
          ${inputCells}
          <td class="readonly">${formatCurrency(detail.total)}</td>
          <td class="readonly">${formatCurrency(detail.difference)}</td>
          <td class="readonly">${formatCurrency(detail.commission)}</td>
          <td class="readonly">${formatCurrency(detail.payable)}</td>
          <td>
            <button
              type="button"
              class="table-action danger-button"
              data-delete-array="cashiers"
              data-delete-index="${index}"
            >
              Excluir
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("cashiers-table").innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function computeMetrics(currentState) {
  const barRevenue = sum(currentState.barProducts, (item) => toNumber(item.price) * toNumber(item.soldQty));
  const beverageSalesCost = sum(currentState.barProducts, (item) => toNumber(item.cost) * toNumber(item.soldQty));
  const beverageProductionCost = sum(
    currentState.barProducts,
    (item) => toNumber(item.cost) * toNumber(item.productionQty),
  );
  const productionRevenue = sum(currentState.costSales, lineTotal);
  const productionConsumptionTotal = sum(currentState.productionConsumption, lineTotal);
  const artisticTotal = sum(currentState.artisticConsumption, lineTotal);
  const ticketGross = sum(currentState.ticketSales, (item) => toNumber(item.qty) * toNumber(item.price));
  const tobaccoGross = sum(currentState.tobaccoSales, (item) => toNumber(item.qty) * toNumber(item.price));
  const barPaymentTotal = paymentTotal(currentState.modulePayments.bar);
  const ticketPaymentTotal = paymentTotal(currentState.modulePayments.ticket);
  const tobaccoPaymentTotal = paymentTotal(currentState.modulePayments.tobacco);

  const barFees = paymentFee(currentState.modulePayments.bar, currentState.event);
  const ticketFees = paymentFee(currentState.modulePayments.ticket, currentState.event);
  const tobaccoFees = paymentFee(currentState.modulePayments.tobacco, currentState.event);
  const operationalTotal = sum(currentState.operationalExpenses, lineTotal);
  const suppliesManual = sum(currentState.suppliesExpenses, lineTotal);
  const suppliesTotal = beverageSalesCost + beverageProductionCost + suppliesManual;
  const additionalTotal = sum(currentState.additionalExpenses, lineTotal);
  const totalRevenue = barRevenue + productionRevenue;
  const baseExpenses = barFees + operationalTotal + suppliesTotal;
  const barResult = totalRevenue - baseExpenses;
  const serviceCommission = barResult * toNumber(currentState.event.serviceRate);
  const netOperationalBalance = barResult - serviceCommission - additionalTotal;
  const ticketNet = ticketGross - ticketFees;
  const tobaccoNet = tobaccoGross - tobaccoFees;
  const transferToBar = netOperationalBalance + ticketNet + tobaccoNet;
  const transferBase = totalRevenue + ticketNet + tobaccoNet;
  const expensesGrand = baseExpenses + serviceCommission + additionalTotal;

  const cashiersDetails = currentState.cashiers.map((cashier) => {
    const total =
      toNumber(cashier.credito) +
      toNumber(cashier.debito) +
      toNumber(cashier.dinheiro) +
      toNumber(cashier.pix) +
      toNumber(cashier.devolucoes) +
      toNumber(cashier.sangria) +
      toNumber(cashier.voucher);
    const difference = toNumber(cashier.sale) - total;
    const commission = cashierCommission(total);
    const payable = toNumber(cashier.fixed) + commission;
    return { ...cashier, total, difference, commission, payable };
  });

  const cashiersSales = sum(currentState.cashiers, (cashier) => toNumber(cashier.sale));
  const cashiersDifference = sum(cashiersDetails, (cashier) => cashier.difference);
  const cashiersPayable = sum(cashiersDetails, (cashier) => cashier.payable);
  const alerts = buildAlerts({
    barRevenue,
    barPaymentTotal,
    ticketGross,
    ticketPaymentTotal,
    tobaccoGross,
    tobaccoPaymentTotal,
    cashiersDifference,
    barResult,
    productionRevenue,
    beverageProductionCost,
    state: currentState,
  });

  const workflow = buildWorkflow(currentState, {
    barRevenue,
    ticketGross,
    tobaccoGross,
    cashiersDetails,
    operationalTotal,
    productionConsumptionTotal,
    alerts,
  });

  const health = buildHealth(alerts, workflow, {
    barResult,
    transferToBar,
    cashiersDifference,
  });

  return {
    barRevenue,
    beverageSalesCost,
    beverageProductionCost,
    productionRevenue,
    productionConsumptionTotal,
    artisticTotal,
    ticketGross,
    tobaccoGross,
    ticketAudience: sum(currentState.ticketSales, (item) => toNumber(item.qty)),
    tobaccoUnits: sum(currentState.tobaccoSales, (item) => toNumber(item.qty)),
    barPaymentTotal,
    ticketPaymentTotal,
    tobaccoPaymentTotal,
    barFees,
    ticketFees,
    tobaccoFees,
    operationalTotal,
    suppliesTotal,
    additionalTotal,
    totalRevenue,
    barResult,
    serviceCommission,
    netOperationalBalance,
    ticketNet,
    tobaccoNet,
    transferToBar,
    transferBase,
    expensesGrand,
    cashiersDetails,
    cashiersSales,
    cashiersDifference,
    cashiersPayable,
    barProductCount: currentState.barProducts.length,
    barSoldUnits: sum(currentState.barProducts, (item) => toNumber(item.soldQty)),
    barGrossMargin: barRevenue > 0 ? (barRevenue - beverageSalesCost) / barRevenue : 0,
    transferMargin: transferBase > 0 ? transferToBar / transferBase : 0,
    alerts,
    workflow,
    health,
  };
}

function buildAlerts(data) {
  const alerts = [];

  if (!data.state.event.name || !data.state.event.client || !data.state.event.manager) {
    alerts.push({
      level: "attention",
      title: "Cadastro do evento incompleto",
      body: "Preencha nome do evento, cliente e responsável para melhorar o relatório executivo.",
    });
  }

  if (Math.abs(data.barRevenue - data.barPaymentTotal) > 150) {
    alerts.push({
      level: "critical",
      title: "Bar com diferença entre venda e pagamentos",
      body: `A diferença atual é de ${formatCurrency(data.barRevenue - data.barPaymentTotal)}.`,
    });
  }

  if (Math.abs(data.ticketGross - data.ticketPaymentTotal) > 100) {
    alerts.push({
      level: "attention",
      title: "Bilheteria com pagamentos inconsistentes",
      body: `O total lançado em pagamentos difere ${formatCurrency(data.ticketGross - data.ticketPaymentTotal)} da bilheteria bruta.`,
    });
  }

  if (Math.abs(data.tobaccoGross - data.tobaccoPaymentTotal) > 50) {
    alerts.push({
      level: "attention",
      title: "Tabacaria com diferença de pagamentos",
      body: `O módulo apresenta diferença de ${formatCurrency(data.tobaccoGross - data.tobaccoPaymentTotal)} entre bruto e pagamentos.`,
    });
  }

  if (Math.abs(data.cashiersDifference) > 0.01) {
    alerts.push({
      level: "critical",
      title: "Caixas com divergência consolidada",
      body: `A soma das diferenças dos caixas está em ${formatCurrency(data.cashiersDifference)}.`,
    });
  }

  if (data.barResult < 0) {
    alerts.push({
      level: "critical",
      title: "Resultado do bar está negativo",
      body: "Custos e despesas estão acima da receita operacional principal.",
    });
  }

  if (data.productionRevenue < data.beverageProductionCost) {
    alerts.push({
      level: "attention",
      title: "Produção consome mais do que retorna",
      body: "A venda a custo está abaixo do custo total de produção consumido pelo evento.",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      level: "ok",
      title: "Fechamento bem estruturado",
      body: "Os principais indicadores estão coerentes e sem alertas críticos neste momento.",
    });
  }

  return alerts;
}

function buildWorkflow(currentState, context) {
  const eventProgress = ratio([
    Boolean(currentState.event.name),
    Boolean(currentState.event.client),
    Boolean(currentState.event.venue),
    Boolean(currentState.event.manager),
    Boolean(currentState.event.date),
    toNumber(currentState.event.serviceRate) > 0,
  ]);

  const salesProgress = ratio([
    currentState.barProducts.length > 0,
    context.barRevenue > 0,
    context.ticketGross > 0,
    context.tobaccoGross >= 0,
    paymentTotal(currentState.modulePayments.bar) > 0,
  ]);

  const cashierProgress = ratio([
    currentState.cashiers.length > 0,
    context.cashiersDetails.some((item) => toNumber(item.sale) > 0),
    Math.abs(sum(context.cashiersDetails, (item) => item.difference)) <= 50,
  ]);

  const costProgress = ratio([
    context.operationalTotal > 0,
    currentState.suppliesExpenses.length > 0,
    currentState.additionalExpenses.length > 0,
    currentState.productionConsumption.length > 0,
  ]);

  const reportProgress = ratio([
    eventProgress >= 0.8,
    salesProgress >= 0.8,
    cashierProgress >= 0.67,
    costProgress >= 0.75,
    !context.alerts.some((alert) => alert.level === "critical"),
  ]);

  const steps = [
    { title: "Configurar evento", progress: eventProgress * 100 },
    { title: "Lançar vendas", progress: salesProgress * 100 },
    { title: "Conferir caixas", progress: cashierProgress * 100 },
    { title: "Validar custos", progress: costProgress * 100 },
    { title: "Fechar relatório", progress: reportProgress * 100 },
  ];

  const nextStep =
    steps.find((step) => step.progress < 100) || { title: "Fechamento concluído", progress: 100 };

  return {
    steps,
    overall: sum(steps, (step) => step.progress) / steps.length,
    nextStep: {
      title: nextStep.title,
      copy:
        nextStep.progress < 100
          ? "Finalize esse bloco para aumentar a confiabilidade do relatório executivo."
          : "Os principais blocos do fechamento já estão completos e prontos para apresentação.",
    },
  };
}

function buildHealth(alerts, workflow, numbers) {
  let score = workflow.overall;
  alerts.forEach((alert) => {
    if (alert.level === "critical") score -= 16;
    if (alert.level === "attention") score -= 7;
  });
  if (numbers.barResult < 0) score -= 10;
  if (numbers.transferToBar < 0) score -= 10;
  if (Math.abs(numbers.cashiersDifference) > 0.01) score -= 8;
  score = Math.max(8, Math.min(100, score));

  let summary = "Fechamento em bom nível de confiabilidade.";
  if (score < 45) summary = "Fechamento com risco alto. É melhor revisar antes de apresentar.";
  else if (score < 70) summary = "Fechamento consistente, mas ainda existem pontos que pedem revisão.";

  return { score, summary };
}

function paymentFee(payment, event) {
  return (
    toNumber(payment.debito) * toNumber(event.debitRate) +
    toNumber(payment.pix) * toNumber(event.pixRate) +
    toNumber(payment.credito) * toNumber(event.creditRate)
  );
}

function paymentTotal(payment) {
  return toNumber(payment.debito) + toNumber(payment.pix) + toNumber(payment.credito);
}

function cashierCommission(total) {
  if (total <= 3500) return total * 0.005;
  if (total <= 8000) return total * 0.01;
  if (total <= 15000) return total * 0.015;
  return total * 0.02;
}

function generateInsights(metrics) {
  const bestProduct =
    [...state.barProducts].sort(
      (a, b) => toNumber(b.price) * toNumber(b.soldQty) - toNumber(a.price) * toNumber(a.soldQty),
    )[0] || null;

  const insights = [
    `A margem bruta dos produtos vendidos no bar está em ${formatPercent(metrics.barGrossMargin)} antes das demais despesas operacionais.`,
    `O evento consolida ${formatCurrency(metrics.transferBase)} em receita final considerada no relatório.`,
    `A estrutura de custos totais está em ${formatCurrency(metrics.expensesGrand)}, incluindo taxas, operacional, insumos, comissão e despesas adicionais.`,
    `O total a pagar aos caixas está em ${formatCurrency(metrics.cashiersPayable)}, já considerando fixo e comissão progressiva.`,
  ];

  if (bestProduct) {
    insights.unshift(
      `${bestProduct.name} é o principal gerador de receita do bar, com ${formatCurrency(
        toNumber(bestProduct.price) * toNumber(bestProduct.soldQty),
      )}.`,
    );
  }

  if (Math.abs(metrics.cashiersDifference) > 0.01) {
    insights.push("Existe divergência entre venda declarada e total fechado nos caixas. Vale revisar antes de compartilhar o fechamento.");
  } else {
    insights.push("Os caixas estão coerentes com o fechamento consolidado, o que aumenta a confiança no relatório.");
  }

  if (metrics.ticketNet > 0) {
    insights.push(`A bilheteria líquida adiciona ${formatCurrency(metrics.ticketNet)} ao valor final a transferir.`);
  }

  return insights;
}

function createReportHeadline(metrics) {
  if (metrics.transferToBar >= 0 && metrics.health.score >= 75) {
    return "Fechamento positivo, consistente e pronto para apresentação";
  }
  if (metrics.transferToBar >= 0) {
    return "Fechamento positivo com pontos de atenção operacionais";
  }
  return "Fechamento exige revisão antes da apresentação final";
}

function createReportNarrative(metrics) {
  return `${state.event.name} encerra com ${formatCurrency(metrics.transferToBar)} para transferir, após consolidar ${formatCurrency(
    metrics.barRevenue,
  )} em vendas do bar, ${formatCurrency(metrics.ticketNet)} de bilheteria líquida e ${formatCurrency(
    metrics.tobaccoNet,
  )} de tabacaria líquida. O resultado do bar ficou em ${formatCurrency(
    metrics.barResult,
  )}, com ${formatCurrency(metrics.operationalTotal)} de operacional e ${formatCurrency(
    metrics.suppliesTotal,
  )} entre insumos e custo de bebidas.`;
}

function exportSnapshot() {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    data: state,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slugify(state.event.name || "fechamento-zero31")}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  updateSaveStatus("Arquivo exportado");
}

function importSnapshot(event) {
  const [file] = event.target.files || [];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      state = mergeState(parsed.data || parsed);
      persistAndRender("Arquivo importado");
    } catch (error) {
      updateSaveStatus("Falha ao importar arquivo");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function renderBars(data) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  return `
    <div class="bars">
      ${data
        .map((item) => {
          const width = (Math.max(item.value, 0) / maxValue) * 100;
          return `
            <div class="bar-row">
              <div class="bar-label">
                <span>${item.label}</span>
                <strong>${formatCurrency(item.value)}</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill ${item.tone || ""}" style="width:${width}%"></div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function summaryCard(label, value, hint, tone = "") {
  const toneClass = tone ? `metric-card--${tone}` : "";
  return `
    <article class="metric-card ${toneClass}">
      <span class="metric-label">${label}</span>
      <strong class="metric-value">${formatCurrency(value)}</strong>
      <span class="metric-hint">${hint}</span>
    </article>
  `;
}

function moduleCard(label, value, hint) {
  return `
    <article class="module-card">
      <span class="metric-label">${label}</span>
      <strong>${value}</strong>
      <span class="metric-hint">${hint}</span>
    </article>
  `;
}

function miniCard(label, value, hint) {
  return `
    <article class="mini-card">
      <span class="metric-label">${label}</span>
      <strong>${value}</strong>
      <span class="metric-hint">${hint}</span>
    </article>
  `;
}

function breakdownItem(label, value) {
  return `
    <div class="breakdown-item">
      <span>${label}</span>
      <strong>${formatCurrency(value)}</strong>
    </div>
  `;
}

function fieldTemplate(label, scope, field, value, type, step = "1") {
  return `
    <div class="field">
      <label>${label}</label>
      <input
        data-scope="${scope}"
        data-field="${field}"
        type="${type}"
        step="${step}"
        value="${escapeAttribute(value)}"
      />
    </div>
  `;
}

function paymentFieldTemplate(label, moduleName, field, value, mode = "editable") {
  if (mode === "readonly") {
    return `
      <div class="field">
        <label>${label}</label>
        <input value="${escapeAttribute(formatCurrency(value))}" readonly />
      </div>
    `;
  }

  return `
    <div class="field">
      <label>${label}</label>
      <input
        data-scope="payment"
        data-module="${moduleName}"
        data-field="${field}"
        type="number"
        step="0.01"
        value="${escapeAttribute(value)}"
      />
    </div>
  `;
}

function lineTotal(item) {
  return toNumber(item.qty) * toNumber(item.unit);
}

function ratio(parts) {
  return parts.filter(Boolean).length / Math.max(parts.length, 1);
}

function sum(collection, mapper) {
  return collection.reduce((accumulator, item) => accumulator + mapper(item), 0);
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(toNumber(value));
}

function formatPercent(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(toNumber(value));
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatTime(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatInteger(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(toNumber(value));
}

function slugify(value) {
  return String(value || "fechamento-zero31")
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-zA-Z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .toLowerCase();
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
