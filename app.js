const STORAGE_KEY = "zero31-fechamento-hub-v1";

const SOURCE_OPTIONS = [
  { id: "spotpass", label: "SpotPass", hint: "Buscar o evento direto no painel operacional." },
  {
    id: "base-workbook",
    label: "Planilha base",
    hint: "Usar o modelo principal de fechamento como referência central.",
  },
  { id: "upload", label: "Upload de relatório", hint: "Subir export, PDF, planilha ou material externo." },
  { id: "manual", label: "Preenchimento manual", hint: "Lançar tudo manualmente dentro do sistema." },
];

const SOURCE_GUIDES = {
  spotpass: {
    title: "Puxar do SpotPass",
    steps: [
      "Você me informa o nome exato do evento como ele aparece na busca do SpotPass.",
      "Se houver link direto, eu uso isso para acelerar a localização do dashboard certo.",
      "O relatório de produtos também precisa ser informado para eu preencher corretamente bar, categorias e quantidades.",
      "Depois mapeio os relatórios e uso esses dados para preencher o fechamento base.",
    ],
  },
  "base-workbook": {
    title: "Usar a planilha base",
    steps: [
      "A planilha modelo vira a estrutura-mãe do evento.",
      "O relatório de produtos entra como apoio para completar vendas, preços e volumes por item.",
      "Eu comparo o relatório externo com esse modelo e preencho os blocos corretos.",
      "Essa opção é ideal quando o evento já nasce dentro do padrão do fechamento atual.",
    ],
  },
  upload: {
    title: "Importar arquivos",
    steps: [
      "Você envia o relatório em Excel, CSV, PDF, print ou outro formato disponível.",
      "O relatório de produtos deve ser carregado aqui ou referenciado separadamente no evento.",
      "Eu extraio os dados relevantes e organizo por vendas, caixas, despesas e consumo.",
      "Depois traduzo isso para o fechamento consolidado do evento.",
    ],
  },
  manual: {
    title: "Lançamento manual",
    steps: [
      "Usamos o workspace para digitar ou revisar os números manualmente.",
      "Mesmo no manual, o relatório de produtos continua sendo a melhor base para preencher bar e consumo.",
      "É a opção mais útil quando os dados vêm quebrados, incompletos ou em várias fontes.",
      "O sistema continua calculando o fechamento e validando inconsistências automaticamente.",
    ],
  },
};

const defaultCashierCommissionRules = () => [
  { limit: 3500, rate: 0.5 },
  { limit: 6500, rate: 1.0 },
  { limit: 0, rate: 1.5 },
];

const eventBlueprint = {
  event: {
    company: "Zero31 Produções & Serviços",
    name: "",
    client: "",
    date: "",
    venue: "",
    stage: "Rascunho",
    manager: "",
    expectedAudience: 0,
    serviceRate: 0.08,
    debitRate: 0.023,
    pixRate: 0.023,
    creditRate: 0.038,
    notes: "",
  },
  source: {
    type: "spotpass",
    spotpassSearchName: "",
    spotpassEventLink: "",
    baseWorkbookName: "BAR OKTA MODELO.xlsx",
    baseWorkbookPath: "J:\\Meu Drive\\BAR\\CLIENTES\\BOATE OKTA\\BAR OKTA MODELO.xlsx",
    productReportReference: "",
    productReportOrigin: "",
    cashierSalesReportReference: "",
    cashierSalesReportOrigin: "",
    uploadReference: "",
    reportOriginNotes: "",
    lastImportedFrom: "",
  },
  modulePayments: {
    bar: { debito: 0, pix: 0, credito: 0 },
    ticket: { debito: 0, pix: 0, credito: 0 },
    tobacco: { debito: 0, pix: 0, credito: 0 },
  },
  barProducts: [],
  ticketSales: [],
  tobaccoSales: [],
  operationalExpenses: [
    { name: "Sistema de vendas", qty: 0, unit: 30 },
    { name: "Financeiro", qty: 0, unit: 250 },
    { name: "Auxiliar financeiro", qty: 0, unit: 180 },
    { name: "Coordenador geral", qty: 0, unit: 250 },
    { name: "Coordenador de bar", qty: 0, unit: 200 },
    { name: "Atendentes de bar", qty: 0, unit: 130 },
  ],
  suppliesExpenses: [],
  additionalExpenses: [],
  cashiers: [],
  cashierCommissionRules: defaultCashierCommissionRules(),
  productionConsumption: [],
  costSales: [],
  artisticConsumption: [],
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
  cashierCommissionRules: [
    { key: "limit", label: "Teto da faixa (R$)", type: "number", step: "0.01" },
    { key: "rate", label: "Comissao (%)", type: "number", step: "0.01" },
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

  document.getElementById("create-event-button").addEventListener("click", createEventFromHome);

  document.getElementById("reset-button").addEventListener("click", () => {
    const activeEvent = getActiveEvent();
    if (!activeEvent) {
      state = { activeEventId: null, events: [] };
      persistAndRender("Eventos restaurados");
      return;
    }

    const seeded = createEventTemplate({
      id: activeEvent.id,
      createdAt: activeEvent.createdAt,
      event: {
        ...activeEvent.event,
      },
      source: {
        ...activeEvent.source,
      },
    });

    replaceEvent(seeded);
    persistAndRender("Evento restaurado");
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
  if (!saved) return { activeEventId: null, events: [] };

  try {
    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed.events)) {
      const events = parsed.events.map((event) => createEventTemplate(event));
      const activeEventId = events.some((event) => event.id === parsed.activeEventId)
        ? parsed.activeEventId
        : events[0]?.id ?? null;
      return { activeEventId, events };
    }

    if (parsed.event || parsed.barProducts || parsed.modulePayments) {
      const migrated = createEventTemplate({
        id: randomId(),
        event: parsed.event || {},
        source: {
          spotpassSearchName: parsed.event?.spotpassSearchName || "",
          spotpassEventLink: parsed.event?.spotpassEventLink || "",
        },
        modulePayments: parsed.modulePayments,
        barProducts: parsed.barProducts,
        ticketSales: parsed.ticketSales,
        tobaccoSales: parsed.tobaccoSales,
        operationalExpenses: parsed.operationalExpenses,
        suppliesExpenses: parsed.suppliesExpenses,
        additionalExpenses: parsed.additionalExpenses,
        cashiers: parsed.cashiers,
        cashierCommissionRules: parsed.cashierCommissionRules,
        productionConsumption: parsed.productionConsumption,
        costSales: parsed.costSales,
        artisticConsumption: parsed.artisticConsumption,
      });
      return { activeEventId: migrated.id, events: [migrated] };
    }
  } catch (error) {
    return { activeEventId: null, events: [] };
  }

  return { activeEventId: null, events: [] };
}

function createEventTemplate(overrides = {}) {
  const base = structuredClone(eventBlueprint);
  const eventOverrides = overrides.event || {};
  const sourceOverrides = overrides.source || {};

  return {
    ...base,
    ...overrides,
    id: overrides.id || randomId(),
    createdAt: overrides.createdAt || new Date().toISOString(),
    updatedAt: overrides.updatedAt || new Date().toISOString(),
    event: { ...base.event, ...eventOverrides },
    source: {
      ...base.source,
      spotpassSearchName: eventOverrides.spotpassSearchName || base.source.spotpassSearchName,
      spotpassEventLink: eventOverrides.spotpassEventLink || base.source.spotpassEventLink,
      ...sourceOverrides,
    },
    modulePayments: {
      bar: { ...base.modulePayments.bar, ...(overrides.modulePayments?.bar || {}) },
      ticket: { ...base.modulePayments.ticket, ...(overrides.modulePayments?.ticket || {}) },
      tobacco: { ...base.modulePayments.tobacco, ...(overrides.modulePayments?.tobacco || {}) },
    },
    barProducts: normalizeCollection(overrides.barProducts, base.barProducts),
    ticketSales: normalizeCollection(overrides.ticketSales, base.ticketSales),
    tobaccoSales: normalizeCollection(overrides.tobaccoSales, base.tobaccoSales),
    operationalExpenses: normalizeCollection(overrides.operationalExpenses, base.operationalExpenses),
    suppliesExpenses: normalizeCollection(overrides.suppliesExpenses, base.suppliesExpenses),
    additionalExpenses: normalizeCollection(overrides.additionalExpenses, base.additionalExpenses),
    cashiers: normalizeCollection(overrides.cashiers, base.cashiers),
    cashierCommissionRules: normalizeCollection(
      overrides.cashierCommissionRules,
      base.cashierCommissionRules,
    ),
    productionConsumption: normalizeCollection(
      overrides.productionConsumption,
      base.productionConsumption,
    ),
    costSales: normalizeCollection(overrides.costSales, base.costSales),
    artisticConsumption: normalizeCollection(overrides.artisticConsumption, base.artisticConsumption),
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

function getActiveEvent() {
  return state.events.find((event) => event.id === state.activeEventId) || null;
}

function setActiveEvent(id) {
  state.activeEventId = id;
}

function replaceEvent(updatedEvent) {
  state.events = state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
}

function mutateActiveEvent(mutator) {
  const activeEvent = getActiveEvent();
  if (!activeEvent) return;
  mutator(activeEvent);
  activeEvent.updatedAt = new Date().toISOString();
}

function handleChange(event) {
  const target = event.target;

  if (target.dataset.scope === "event") {
    mutateActiveEvent((activeEvent) => {
      activeEvent.event[target.dataset.field] = normalizeValue(target);
    });
    persistAndRender("Configuração atualizada");
    return;
  }

  if (target.dataset.scope === "source") {
    mutateActiveEvent((activeEvent) => {
      activeEvent.source[target.dataset.field] = normalizeValue(target);
    });
    persistAndRender("Fonte atualizada");
    return;
  }

  if (target.dataset.scope === "payment") {
    mutateActiveEvent((activeEvent) => {
      activeEvent.modulePayments[target.dataset.module][target.dataset.field] = toNumber(target.value);
    });
    persistAndRender("Pagamentos atualizados");
    return;
  }

  if (target.dataset.array) {
    mutateActiveEvent((activeEvent) => {
      const row = activeEvent[target.dataset.array][Number(target.dataset.index)];
      if (!row) return;
      row[target.dataset.field] = normalizeValue(target);
    });
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
    mutateActiveEvent((activeEvent) => {
      activeEvent[deleteButton.dataset.deleteArray].splice(Number(deleteButton.dataset.deleteIndex), 1);
    });
    persistAndRender("Linha removida");
    return;
  }

  const openEventButton = event.target.closest("[data-open-event-id]");
  if (openEventButton) {
    setActiveEvent(openEventButton.dataset.openEventId);
    persistAndRender("Evento selecionado");
    return;
  }

  const deleteEventButton = event.target.closest("[data-delete-event-id]");
  if (deleteEventButton) {
    const eventId = deleteEventButton.dataset.deleteEventId;
    state.events = state.events.filter((entry) => entry.id !== eventId);
    if (state.activeEventId === eventId) {
      state.activeEventId = state.events[0]?.id || null;
    }
    persistAndRender("Evento removido");
    return;
  }

  const sourceCard = event.target.closest("[data-source-type]");
  if (sourceCard && sourceCard.dataset.sourceAction === "select") {
    mutateActiveEvent((activeEvent) => {
      activeEvent.source.type = sourceCard.dataset.sourceType;
    });
    persistAndRender("Origem principal atualizada");
  }
}

function normalizeValue(target) {
  if (target.type === "number") return toNumber(target.value);
  return target.value;
}

function createEventFromHome() {
  const name = document.getElementById("create-event-name").value.trim();
  const date = document.getElementById("create-event-date").value;
  const client = document.getElementById("create-event-client").value.trim();
  const venue = document.getElementById("create-event-venue").value.trim();
  const spotpassSearchName = document.getElementById("create-event-search").value.trim();
  const sourceType = document.getElementById("create-event-source").value;

  if (!name) {
    updateSaveStatus("Informe o nome do evento");
    return;
  }

  const newEvent = createEventTemplate({
    event: {
      name,
      date,
      client,
      venue,
      stage: "Planejamento",
    },
    source: {
      type: sourceType,
      spotpassSearchName,
    },
  });

  state.events.unshift(newEvent);
  state.activeEventId = newEvent.id;
  clearCreateEventForm();
  persistAndRender("Evento criado");
}

function clearCreateEventForm() {
  document.getElementById("create-event-name").value = "";
  document.getElementById("create-event-date").value = "";
  document.getElementById("create-event-client").value = "";
  document.getElementById("create-event-venue").value = "";
  document.getElementById("create-event-search").value = "";
  document.getElementById("create-event-source").value = "spotpass";
}

function addRow(arrayName) {
  const schema = schemas[arrayName];
  const row = {};
  schema.forEach((column) => {
    row[column.key] = column.type === "number" ? 0 : "";
  });
  if (arrayName === "cashiers") row.fixed = 120;

  mutateActiveEvent((activeEvent) => {
    activeEvent[arrayName].push(row);
  });
  persistAndRender("Nova linha adicionada");
}

function persistAndRender(message) {
  saveState(message);
  render();
}

function render() {
  const activeEvent = getActiveEvent();
  const allMetrics = state.events.map((event) => ({ event, metrics: computeMetrics(event) }));

  renderHome(activeEvent, allMetrics);
  toggleWorkspace(activeEvent);

  if (!activeEvent) return;

  const metrics = computeMetrics(activeEvent);
  renderHero(activeEvent, metrics);
  renderSourceSection(activeEvent, metrics);
  renderOverview(activeEvent, metrics);
  renderEventSection(activeEvent);
  renderOperationSection(activeEvent, metrics);
  renderCashierSection(activeEvent, metrics);
  renderExpenseSection(activeEvent, metrics);
  renderConsumptionSection(activeEvent, metrics);
  renderReport(activeEvent, metrics);
}

function renderHome(activeEvent, allMetrics) {
  const readyCount = allMetrics.filter((item) => item.metrics.health.score >= 75).length;
  const criticalCount = allMetrics.filter((item) =>
    item.metrics.alerts.some((alert) => alert.level === "critical"),
  ).length;
  const totalTransfer = sum(allMetrics, (item) => item.metrics.transferToBar);

  document.getElementById("home-summary").innerHTML = [
    summaryCardCount("Eventos criados", String(state.events.length), "Central de fechamentos disponíveis"),
    summaryCardCount(
      "Evento ativo",
      activeEvent ? activeEvent.event.name || "Sem nome" : "Nenhum",
      activeEvent ? "Workspace aberto" : "Selecione um evento para abrir o fechamento",
    ),
    summaryCardCount("Eventos prontos", String(readyCount), "Score de saúde acima de 75"),
    summaryCardCount("Alertas críticos", String(criticalCount), "Eventos que pedem revisão"),
    summaryCardCount("Transferência total", formatCurrency(totalTransfer), "Soma dos eventos cadastrados"),
    summaryCardCount(
      "Fonte mais usada",
      getMostCommonSource(state.events),
      "Origem principal definida nos eventos",
    ),
  ].join("");

  document.getElementById("home-active-event-label").textContent = activeEvent
    ? activeEvent.event.name || "Evento sem nome"
    : "Nenhum evento ativo";

  const list = document.getElementById("event-card-list");
  if (state.events.length === 0) {
    list.innerHTML = `
      <article class="event-card event-card--empty">
        <span class="metric-label">Nenhum evento criado ainda</span>
        <p class="metric-hint">Crie o primeiro evento para abrir o workspace e escolher a origem do relatório.</p>
      </article>
    `;
    return;
  }

  list.innerHTML = allMetrics
    .map(({ event, metrics }) => {
      const isActive = activeEvent?.id === event.id;
      return `
        <article class="event-card ${isActive ? "event-card--active" : ""}">
          <div class="event-card-head">
            <div>
              <span class="micro-label">${formatDate(event.event.date) || "Sem data"}</span>
              <h3>${event.event.name || "Evento sem nome"}</h3>
            </div>
            <span class="event-badge ${metrics.health.score >= 75 ? "event-badge--ok" : "event-badge--warning"}">
              ${isActive ? "Ativo" : sourceLabel(event.source.type)}
            </span>
          </div>
          <p class="metric-hint">${event.event.client || "Cliente não informado"} | ${event.event.venue || "Local não informado"}</p>
          <div class="event-card-stats">
            <div>
              <span class="metric-label">Transferir</span>
              <strong>${formatCurrency(metrics.transferToBar)}</strong>
            </div>
            <div>
              <span class="metric-label">Saúde</span>
              <strong>${Math.round(metrics.health.score)}/100</strong>
            </div>
          </div>
          <div class="event-card-actions">
            <button type="button" class="ghost-button" data-open-event-id="${event.id}">Abrir</button>
            <button type="button" class="ghost-button danger-button" data-delete-event-id="${event.id}">
              Excluir
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function toggleWorkspace(activeEvent) {
  document.getElementById("event-workspace").style.display = activeEvent ? "grid" : "none";
  document.getElementById("workspace-empty").style.display = activeEvent ? "none" : "block";
}

function renderHero(activeEvent, metrics) {
  document.title = activeEvent.event.name
    ? `${activeEvent.event.name} | Zero31`
    : "Zero31 | Central de Fechamento";

  document.getElementById("hero-title").textContent =
    activeEvent.event.name || "Fechamento Executivo do Evento";
  document.getElementById("hero-description").textContent =
    "Escolha a origem dos relatórios, revise a operação e consolide o fechamento completo do evento.";

  const tags = [
    activeEvent.event.client || "Cliente não informado",
    activeEvent.event.venue || "Local não informado",
    formatDate(activeEvent.event.date) || "Data pendente",
    activeEvent.event.stage || "Sem estágio",
    `Fonte: ${sourceLabel(activeEvent.source.type)}`,
  ];

  if (activeEvent.source.spotpassSearchName) {
    tags.push(`Busca SpotPass: ${activeEvent.source.spotpassSearchName}`);
  }
  if (activeEvent.source.productReportReference) {
    tags.push("Relatório de produtos informado");
  }

  if (activeEvent.source.cashierSalesReportReference) {
    tags.push("RelatÃ³rio de venda por caixa informado");
  }

  document.getElementById("hero-tags").innerHTML = tags
    .map((tag) => `<span class="hero-tag">${tag}</span>`)
    .join("");

  document.getElementById("health-score").textContent = Math.round(metrics.health.score);
  document.getElementById("health-summary").textContent = metrics.health.summary;
  document.getElementById("health-bar").style.width = `${metrics.health.score}%`;
  document.getElementById("next-step-title").textContent = metrics.workflow.nextStep.title;
  document.getElementById("next-step-copy").textContent = metrics.workflow.nextStep.copy;
}

function renderSourceSection(activeEvent) {
  document.getElementById("source-grid").innerHTML = SOURCE_OPTIONS.map((option) => {
    const selected = activeEvent.source.type === option.id;
    return `
      <article class="source-card ${selected ? "source-card--active" : ""}">
        <span class="micro-label">${selected ? "Origem principal" : "Opção"}</span>
        <h3>${option.label}</h3>
        <p>${option.hint}</p>
        <button
          type="button"
          class="${selected ? "primary-button" : "ghost-button"}"
          data-source-action="select"
          data-source-type="${option.id}"
        >
          ${selected ? "Selecionado" : "Usar essa origem"}
        </button>
      </article>
    `;
  }).join("");

  const sourceType = activeEvent.source.type;
  const productReportFields = [
    sourceFieldTemplate(
      "Relatório de produtos",
      "productReportReference",
      activeEvent.source.productReportReference,
      "Ex.: export-produtos-okta.xlsx ou nome do relatório no sistema",
    ),
    sourceFieldTemplate(
      "Origem do relatório de produtos",
      "productReportOrigin",
      activeEvent.source.productReportOrigin,
      "Ex.: SpotPass > Relatórios, export do PDV, planilha do fornecedor",
    ),
  ];
  const cashierReportFields = [
    sourceFieldTemplate(
      "Relatorio de venda por caixa",
      "cashierSalesReportReference",
      activeEvent.source.cashierSalesReportReference,
      "Ex.: resumo-caixas-okta.xlsx ou relatorio de venda por operador",
    ),
    sourceFieldTemplate(
      "Origem da venda por caixa",
      "cashierSalesReportOrigin",
      activeEvent.source.cashierSalesReportOrigin,
      "Ex.: fechamento dos PDVs, export do sistema ou conferencia manual",
    ),
  ];
  const configFields = {
    spotpass: [
      ...productReportFields,
      ...cashierReportFields,
      sourceFieldTemplate("Nome do evento no SpotPass", "spotpassSearchName", activeEvent.source.spotpassSearchName, "Ex.: Okta - 17/04/2026"),
      sourceFieldTemplate("Link direto do evento", "spotpassEventLink", activeEvent.source.spotpassEventLink, "Cole aqui o link do dashboard, se tiver"),
      sourceFieldTemplate("Observações da origem", "reportOriginNotes", activeEvent.source.reportOriginNotes, "Ex.: buscar evento de bar e portaria separadamente"),
    ],
    "base-workbook": [
      ...productReportFields,
      ...cashierReportFields,
      sourceFieldTemplate("Nome da planilha base", "baseWorkbookName", activeEvent.source.baseWorkbookName, "Nome do arquivo modelo"),
      sourceFieldTemplate("Caminho da planilha base", "baseWorkbookPath", activeEvent.source.baseWorkbookPath, "Ex.: J:\\Meu Drive\\..."),
      sourceFieldTemplate("Observações da origem", "reportOriginNotes", activeEvent.source.reportOriginNotes, "Ex.: usar essa planilha como estrutura principal"),
    ],
    upload: [
      ...productReportFields,
      ...cashierReportFields,
      sourceFieldTemplate("Arquivo ou referência do upload", "uploadReference", activeEvent.source.uploadReference, "Ex.: relatório-vendas-okta.xlsx"),
      sourceFieldTemplate("Origem / observações", "reportOriginNotes", activeEvent.source.reportOriginNotes, "Ex.: PDF do sistema X, print da máquina, export do POS"),
      sourceFieldTemplate("Última importação", "lastImportedFrom", activeEvent.source.lastImportedFrom, "Opcional"),
    ],
    manual: [
      ...productReportFields,
      ...cashierReportFields,
      sourceFieldTemplate("Observações da origem", "reportOriginNotes", activeEvent.source.reportOriginNotes, "Ex.: preencher manualmente a partir da conferência da equipe"),
      sourceFieldTemplate("Planilha base de apoio", "baseWorkbookPath", activeEvent.source.baseWorkbookPath, "Opcional"),
      sourceFieldTemplate("Última referência usada", "lastImportedFrom", activeEvent.source.lastImportedFrom, "Opcional"),
    ],
  };

  document.getElementById("source-config-form").innerHTML = (configFields[sourceType] || []).join("");

  const guide = SOURCE_GUIDES[sourceType];
  document.getElementById("source-guide").innerHTML = `
    <span class="metric-label">${guide.title}</span>
    <ul class="insight-list">
      ${guide.steps.map((step) => `<li>${step}</li>`).join("")}
    </ul>
  `;
}

function renderOverview(activeEvent, metrics) {
  document.getElementById("hero-subtitle").textContent =
    `${activeEvent.event.company} | Responsável: ${activeEvent.event.manager || "não informado"} | Público esperado: ${formatInteger(
      activeEvent.event.expectedAudience,
    )}`;

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

function renderEventSection(activeEvent) {
  document.getElementById("event-form").innerHTML = [
    fieldTemplate("Empresa", "event", "company", activeEvent.event.company, "text"),
    fieldTemplate("Nome do evento", "event", "name", activeEvent.event.name, "text"),
    fieldTemplate("Cliente", "event", "client", activeEvent.event.client, "text"),
    fieldTemplate("Data", "event", "date", activeEvent.event.date, "date"),
    fieldTemplate("Local / cidade", "event", "venue", activeEvent.event.venue, "text"),
    fieldTemplate("Responsável", "event", "manager", activeEvent.event.manager, "text"),
    fieldTemplate("Estágio", "event", "stage", activeEvent.event.stage, "text"),
    fieldTemplate(
      "Público esperado",
      "event",
      "expectedAudience",
      activeEvent.event.expectedAudience,
      "number",
      "1",
    ),
  ].join("");

  document.getElementById("fee-form").innerHTML = [
    fieldTemplate("Comissão de serviços", "event", "serviceRate", activeEvent.event.serviceRate, "number", "0.001"),
    fieldTemplate("Taxa débito", "event", "debitRate", activeEvent.event.debitRate, "number", "0.001"),
    fieldTemplate("Taxa PIX", "event", "pixRate", activeEvent.event.pixRate, "number", "0.001"),
    fieldTemplate("Taxa crédito", "event", "creditRate", activeEvent.event.creditRate, "number", "0.001"),
  ].join("");

  document.getElementById("event-notes").value = activeEvent.event.notes || "";
}

function renderOperationSection(activeEvent, metrics) {
  document.getElementById("module-strip").innerHTML = [
    moduleCard("Bar", formatCurrency(metrics.barRevenue), `Margem bruta ${formatPercent(metrics.barGrossMargin)}`),
    moduleCard("Bilheteria", formatCurrency(metrics.ticketNet), `${formatInteger(metrics.ticketAudience)} ingressos lançados`),
    moduleCard("Tabacaria", formatCurrency(metrics.tobaccoNet), `${formatInteger(metrics.tobaccoUnits)} itens vendidos`),
    moduleCard("Receita auxiliar", formatCurrency(metrics.productionRevenue), "Venda a preço de custo + frentes auxiliares"),
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
    activeEvent.barProducts,
    (row) => [
      formatCurrency(toNumber(row.cost) * toNumber(row.soldQty)),
      formatCurrency(toNumber(row.price) * toNumber(row.soldQty)),
      formatCurrency(toNumber(row.cost) * toNumber(row.productionQty)),
    ],
    ["Custo vendas", "Receita", "Custo produção"],
  );
  renderCollectionTable("ticket-sales-table", "ticketSales", activeEvent.ticketSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);
  renderCollectionTable("tobacco-sales-table", "tobaccoSales", activeEvent.tobaccoSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);

  renderPaymentForm("bar-payment-form", "bar", activeEvent);
  renderPaymentForm("ticket-payment-form", "ticket", activeEvent);
  renderPaymentForm("tobacco-payment-form", "tobacco", activeEvent);
}

function renderCashierSection(activeEvent, metrics) {
  document.getElementById("cashier-kpis").innerHTML = [
    miniCard("Venda declarada", formatCurrency(metrics.cashiersSales), `${formatInteger(activeEvent.cashiers.length)} caixas`),
    miniCard("Total fechado", formatCurrency(metrics.cashiersClosedTotal), "Somatorio de meios e ajustes"),
    miniCard("Diferença consolidada", formatCurrency(metrics.cashiersDifference), Math.abs(metrics.cashiersDifference) <= 0.01 ? "Sem divergência relevante" : "Conferir fechamento"),
    miniCard("Total a pagar", formatCurrency(metrics.cashiersPayable), "Fixo + comissão dos operadores"),
  ].join("");

  document.getElementById("cashier-commission-summary").innerHTML = `
    <span class="metric-label">Regra ativa</span>
    <strong>${formatCommissionRuleSummary(activeEvent.cashierCommissionRules)}</strong>
    <span class="metric-hint">A taxa da faixa encontrada e aplicada sobre a venda declarada de cada caixa.</span>
  `;

  document.getElementById("cashier-report-card").innerHTML = `
    <div class="report-source-copy">
      <span class="metric-label">Relatorio de venda por caixa</span>
      <strong>${escapeHtml(activeEvent.source.cashierSalesReportReference || "Nao informado")}</strong>
      <span class="metric-hint">${escapeHtml(activeEvent.source.cashierSalesReportOrigin || "Defina a origem desse relatorio em Fontes para eu localizar a venda de cada caixa.")}</span>
    </div>
  `;

  renderCollectionTable(
    "cashier-commission-table",
    "cashierCommissionRules",
    activeEvent.cashierCommissionRules,
    (row, index, rows) => [formatCommissionBand(row, index, rows)],
    ["Faixa lida"],
  );
  renderCashierTable(activeEvent.cashiers, metrics.cashiersDetails);
}

function renderExpenseSection(activeEvent, metrics) {
  document.getElementById("expense-kpis").innerHTML = [
    miniCard("Operacional", formatCurrency(metrics.operationalTotal), "Equipe, coordenação e sistema"),
    miniCard("Insumos totais", formatCurrency(metrics.suppliesTotal), "Insumos adicionais + custo das bebidas"),
    miniCard("Demais despesas", formatCurrency(metrics.additionalTotal), "Descontadas após o resultado do bar"),
  ].join("");

  renderCollectionTable("operational-expenses-table", "operationalExpenses", activeEvent.operationalExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
  renderCollectionTable("supplies-expenses-table", "suppliesExpenses", activeEvent.suppliesExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
  renderCollectionTable("additional-expenses-table", "additionalExpenses", activeEvent.additionalExpenses, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
}

function renderConsumptionSection(activeEvent, metrics) {
  document.getElementById("consumption-kpis").innerHTML = [
    miniCard("Consumo produção", formatCurrency(metrics.productionConsumptionTotal), "Saída operacional interna"),
    miniCard("Venda a custo", formatCurrency(metrics.productionRevenue), "Receita de produção"),
    miniCard("Consumo artístico", formatCurrency(metrics.artisticTotal), "Controle separado do evento"),
  ].join("");

  renderCollectionTable("production-consumption-table", "productionConsumption", activeEvent.productionConsumption, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
  renderCollectionTable("cost-sales-table", "costSales", activeEvent.costSales, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
  renderCollectionTable("artistic-consumption-table", "artisticConsumption", activeEvent.artisticConsumption, (row) => [
    formatCurrency(lineTotal(row)),
  ], ["Total"]);
}

function renderReport(activeEvent, metrics) {
  document.getElementById("report-transfer").textContent = formatCurrency(metrics.transferToBar);
  document.getElementById("report-margin").textContent =
    `Margem final sobre receita consolidada: ${formatPercent(metrics.transferMargin)}`;
  document.getElementById("report-headline").textContent = createReportHeadline(metrics);
  document.getElementById("report-narrative").textContent = createReportNarrative(activeEvent, metrics);

  document.getElementById("report-kpis").innerHTML = [
    summaryCard("Bilheteria líquida", metrics.ticketNet, `Bruto ${formatCurrency(metrics.ticketGross)}`),
    summaryCard("Tabacaria líquida", metrics.tobaccoNet, `Bruto ${formatCurrency(metrics.tobaccoGross)}`),
    summaryCard("Comissão de serviços", metrics.serviceCommission, `${formatPercent(activeEvent.event.serviceRate)} do resultado do bar`),
    summaryCard("Consumo artístico", metrics.artisticTotal, "Separado do custo operacional"),
    summaryCard("A pagar aos caixas", metrics.cashiersPayable, "Fixo + comissão"),
    summaryCard("Receita produção", metrics.productionRevenue, "Venda a preço de custo"),
  ].join("");

  document.getElementById("report-insights").innerHTML = generateInsights(activeEvent, metrics)
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

function renderPaymentForm(containerId, moduleName, activeEvent) {
  const payment = activeEvent.modulePayments[moduleName];
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

  const body =
    rows.length === 0
      ? `<tr><td colspan="${headers.match(/<th/g).length}" class="table-empty">Nenhum lançamento ainda</td></tr>`
      : rows
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

            const readonlyCells = readonlyBuilder(row, index, rows)
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

function renderCashierTable(cashiers, cashiersDetails) {
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

  const body =
    cashiers.length === 0
      ? `<tr><td colspan="${headers.length}" class="table-empty">Nenhum caixa cadastrado ainda</td></tr>`
      : cashiersDetails
          .map((detail, index) => {
            const row = cashiers[index];
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

function computeMetrics(eventRecord) {
  const barRevenue = sum(eventRecord.barProducts, (item) => toNumber(item.price) * toNumber(item.soldQty));
  const beverageSalesCost = sum(eventRecord.barProducts, (item) => toNumber(item.cost) * toNumber(item.soldQty));
  const beverageProductionCost = sum(
    eventRecord.barProducts,
    (item) => toNumber(item.cost) * toNumber(item.productionQty),
  );
  const productionRevenue = sum(eventRecord.costSales, lineTotal);
  const productionConsumptionTotal = sum(eventRecord.productionConsumption, lineTotal);
  const artisticTotal = sum(eventRecord.artisticConsumption, lineTotal);
  const ticketGross = sum(eventRecord.ticketSales, (item) => toNumber(item.qty) * toNumber(item.price));
  const tobaccoGross = sum(eventRecord.tobaccoSales, (item) => toNumber(item.qty) * toNumber(item.price));

  const barPaymentTotal = paymentTotal(eventRecord.modulePayments.bar);
  const ticketPaymentTotal = paymentTotal(eventRecord.modulePayments.ticket);
  const tobaccoPaymentTotal = paymentTotal(eventRecord.modulePayments.tobacco);

  const barFees = paymentFee(eventRecord.modulePayments.bar, eventRecord.event);
  const ticketFees = paymentFee(eventRecord.modulePayments.ticket, eventRecord.event);
  const tobaccoFees = paymentFee(eventRecord.modulePayments.tobacco, eventRecord.event);
  const operationalTotal = sum(eventRecord.operationalExpenses, lineTotal);
  const suppliesManual = sum(eventRecord.suppliesExpenses, lineTotal);
  const suppliesTotal = beverageSalesCost + beverageProductionCost + suppliesManual;
  const additionalTotal = sum(eventRecord.additionalExpenses, lineTotal);
  const totalRevenue = barRevenue + productionRevenue;
  const baseExpenses = barFees + operationalTotal + suppliesTotal;
  const barResult = totalRevenue - baseExpenses;
  const serviceCommission = barResult * toNumber(eventRecord.event.serviceRate);
  const netOperationalBalance = barResult - serviceCommission - additionalTotal;
  const ticketNet = ticketGross - ticketFees;
  const tobaccoNet = tobaccoGross - tobaccoFees;
  const transferToBar = netOperationalBalance + ticketNet + tobaccoNet;
  const transferBase = totalRevenue + ticketNet + tobaccoNet;
  const expensesGrand = baseExpenses + serviceCommission + additionalTotal;

  const cashiersDetails = eventRecord.cashiers.map((cashier) => {
    const total =
      toNumber(cashier.credito) +
      toNumber(cashier.debito) +
      toNumber(cashier.dinheiro) +
      toNumber(cashier.pix) +
      toNumber(cashier.devolucoes) +
      toNumber(cashier.sangria) +
      toNumber(cashier.voucher);
    const difference = toNumber(cashier.sale) - total;
    const commission = cashierCommission(toNumber(cashier.sale), eventRecord.cashierCommissionRules);
    const payable = toNumber(cashier.fixed) + commission;
    return { ...cashier, total, difference, commission, payable };
  });

  const cashiersSales = sum(eventRecord.cashiers, (cashier) => toNumber(cashier.sale));
  const cashiersClosedTotal = sum(cashiersDetails, (cashier) => cashier.total);
  const cashiersDifference = sum(cashiersDetails, (cashier) => cashier.difference);
  const cashiersPayable = sum(cashiersDetails, (cashier) => cashier.payable);

  const alerts = buildAlerts(eventRecord, {
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
  });
  const workflow = buildWorkflow(eventRecord, {
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
    ticketAudience: sum(eventRecord.ticketSales, (item) => toNumber(item.qty)),
    tobaccoUnits: sum(eventRecord.tobaccoSales, (item) => toNumber(item.qty)),
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
    cashiersClosedTotal,
    cashiersDifference,
    cashiersPayable,
    barProductCount: eventRecord.barProducts.length,
    barSoldUnits: sum(eventRecord.barProducts, (item) => toNumber(item.soldQty)),
    barGrossMargin: barRevenue > 0 ? (barRevenue - beverageSalesCost) / barRevenue : 0,
    transferMargin: transferBase > 0 ? transferToBar / transferBase : 0,
    alerts,
    workflow,
    health,
  };
}

function buildAlerts(eventRecord, data) {
  const alerts = [];

  if (!eventRecord.event.name || !eventRecord.event.client || !eventRecord.event.manager) {
    alerts.push({
      level: "attention",
      title: "Cadastro do evento incompleto",
      body: "Preencha nome do evento, cliente e responsável para dar mais força ao relatório executivo.",
    });
  }

  if (!eventRecord.source.type) {
    alerts.push({
      level: "attention",
      title: "Origem do relatório não definida",
      body: "Escolha se os dados virão do SpotPass, da planilha base, de upload ou de preenchimento manual.",
    });
  }

  if (!eventRecord.source.productReportReference) {
    alerts.push({
      level: "attention",
      title: "Relatório de produtos não carregado",
      body: "Informe o relatório de produtos do evento para eu conseguir preencher corretamente itens, categorias e vendas do bar.",
    });
  }

  if (!eventRecord.source.cashierSalesReportReference) {
    alerts.push({
      level: "attention",
      title: "Relatorio de venda por caixa nao carregado",
      body: "Informe o relatorio com o valor vendido por cada caixa para eu preencher as vendas individuais e calcular a comissao corretamente.",
    });
  }

  if (eventRecord.source.type === "spotpass" && !eventRecord.source.spotpassSearchName) {
    alerts.push({
      level: "attention",
      title: "Busca do SpotPass não informada",
      body: "Preencha o nome exato do evento no SpotPass para facilitar a localização automática.",
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
      body: `Os pagamentos divergem ${formatCurrency(data.ticketGross - data.ticketPaymentTotal)} da bilheteria bruta.`,
    });
  }

  if (Math.abs(data.tobaccoGross - data.tobaccoPaymentTotal) > 50) {
    alerts.push({
      level: "attention",
      title: "Tabacaria com diferença de pagamentos",
      body: `O módulo apresenta diferença de ${formatCurrency(data.tobaccoGross - data.tobaccoPaymentTotal)}.`,
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

function buildWorkflow(eventRecord, context) {
  const eventProgress = ratio([
    Boolean(eventRecord.event.name),
    Boolean(eventRecord.event.client),
    Boolean(eventRecord.event.venue),
    Boolean(eventRecord.event.manager),
    Boolean(eventRecord.event.date),
    Boolean(eventRecord.source.type),
  ]);

  const sourceProgress = ratio([
    Boolean(eventRecord.source.type),
    Boolean(eventRecord.source.productReportReference),
    Boolean(eventRecord.source.cashierSalesReportReference),
    eventRecord.source.type !== "spotpass" || Boolean(eventRecord.source.spotpassSearchName),
    eventRecord.source.type !== "base-workbook" || Boolean(eventRecord.source.baseWorkbookPath),
    eventRecord.source.type !== "upload" || Boolean(eventRecord.source.uploadReference),
  ]);

  const salesProgress = ratio([
    eventRecord.barProducts.length > 0 || context.barRevenue > 0,
    eventRecord.ticketSales.length > 0 || context.ticketGross > 0,
    eventRecord.tobaccoSales.length > 0 || context.tobaccoGross >= 0,
    paymentTotal(eventRecord.modulePayments.bar) > 0 || context.barRevenue === 0,
  ]);

  const cashierProgress = ratio([
    eventRecord.cashiers.length > 0,
    context.cashiersDetails.some((item) => toNumber(item.sale) > 0),
    Math.abs(sum(context.cashiersDetails, (item) => item.difference)) <= 50,
  ]);

  const costProgress = ratio([
    eventRecord.operationalExpenses.length > 0,
    eventRecord.suppliesExpenses.length > 0 || eventRecord.barProducts.length > 0,
    eventRecord.additionalExpenses.length > 0,
    eventRecord.productionConsumption.length > 0 || eventRecord.costSales.length > 0,
  ]);

  const reportProgress = ratio([
    eventProgress >= 0.8,
    sourceProgress >= 0.75,
    salesProgress >= 0.75,
    cashierProgress >= 0.67,
    costProgress >= 0.5,
    !context.alerts.some((alert) => alert.level === "critical"),
  ]);

  const steps = [
    { title: "Criar evento", progress: eventProgress * 100 },
    { title: "Definir fonte", progress: sourceProgress * 100 },
    { title: "Lançar vendas", progress: salesProgress * 100 },
    { title: "Conferir caixas", progress: cashierProgress * 100 },
    { title: "Validar custos", progress: costProgress * 100 },
    { title: "Fechar relatório", progress: reportProgress * 100 },
  ];

  const nextStep = steps.find((step) => step.progress < 100) || { title: "Fechamento concluído" };

  return {
    steps,
    overall: sum(steps, (step) => step.progress) / steps.length,
    nextStep: {
      title: nextStep.title,
      copy:
        nextStep.title === "Fechamento concluído"
          ? "Os principais blocos do fechamento já estão completos e prontos para apresentação."
          : "Finalize esse bloco para aumentar a confiabilidade do fechamento e da importação dos relatórios.",
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

function paymentFee(payment, eventData) {
  return (
    toNumber(payment.debito) * toNumber(eventData.debitRate) +
    toNumber(payment.pix) * toNumber(eventData.pixRate) +
    toNumber(payment.credito) * toNumber(eventData.creditRate)
  );
}

function paymentTotal(payment) {
  return toNumber(payment.debito) + toNumber(payment.pix) + toNumber(payment.credito);
}

function cashierCommission(sale, rules = []) {
  const totalSale = toNumber(sale);
  if (totalSale <= 0) return 0;

  const normalizedRules = sortCommissionRules(rules);
  if (normalizedRules.length === 0) return 0;

  const matchedRule =
    normalizedRules.find((rule) => rule.limit > 0 && totalSale <= rule.limit) ||
    normalizedRules[normalizedRules.length - 1];

  return totalSale * (toNumber(matchedRule.rate) / 100);
}

function sortCommissionRules(rules = []) {
  return [...rules]
    .map((rule) => ({
      limit: toNumber(rule.limit),
      rate: toNumber(rule.rate),
    }))
    .sort((left, right) => {
      const leftLimit = left.limit > 0 ? left.limit : Number.POSITIVE_INFINITY;
      const rightLimit = right.limit > 0 ? right.limit : Number.POSITIVE_INFINITY;
      return leftLimit - rightLimit;
    });
}

function formatCommissionBand(rule, index, rules) {
  const currentRule = rules[index] || rule || { limit: 0 };
  const previousRule = rules[index - 1];

  if (toNumber(currentRule.limit) > 0) {
    return `AtÃ© ${formatCurrency(currentRule.limit)}`;
  }

  return previousRule ? `Acima de ${formatCurrency(previousRule.limit)}` : "Sem teto";
}

function formatCommissionRuleSummary(rules = []) {
  const sortedRules = sortCommissionRules(rules);
  if (sortedRules.length === 0) return "Nenhuma faixa configurada";

  return sortedRules
    .map((rule, index) => `${formatCommissionBand(rule, index, sortedRules)}: ${formatPercent(rule.rate / 100)}`)
    .join(" | ");
}

function generateInsights(eventRecord, metrics) {
  const bestProduct =
    [...eventRecord.barProducts].sort(
      (a, b) => toNumber(b.price) * toNumber(b.soldQty) - toNumber(a.price) * toNumber(a.soldQty),
    )[0] || null;

  const insights = [
    `A origem principal definida para este evento é ${sourceLabel(eventRecord.source.type)}.`,
    `O fechamento consolida ${formatCurrency(metrics.transferBase)} em receita considerada no relatório.`,
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

function createReportNarrative(eventRecord, metrics) {
  return `${eventRecord.event.name || "O evento"} encerra com ${formatCurrency(
    metrics.transferToBar,
  )} para transferir, após consolidar ${formatCurrency(metrics.barRevenue)} em vendas do bar, ${formatCurrency(
    metrics.ticketNet,
  )} de bilheteria líquida e ${formatCurrency(metrics.tobaccoNet)} de tabacaria líquida. O resultado do bar ficou em ${formatCurrency(
    metrics.barResult,
  )}, com ${formatCurrency(metrics.operationalTotal)} de operacional e ${formatCurrency(
    metrics.suppliesTotal,
  )} entre insumos e custo de bebidas.`;
}

function exportSnapshot() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: state,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `zero31-fechamentos-${new Date().toISOString().slice(0, 10)}.json`;
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
      state = loadImportedState(parsed.data || parsed);
      persistAndRender("Arquivo importado");
    } catch (error) {
      updateSaveStatus("Falha ao importar arquivo");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function loadImportedState(imported) {
  if (Array.isArray(imported.events)) {
    const events = imported.events.map((event) => createEventTemplate(event));
    return {
      activeEventId: imported.activeEventId || events[0]?.id || null,
      events,
    };
  }
  if (imported.event || imported.barProducts || imported.modulePayments) {
    const migrated = createEventTemplate({
      event: imported.event || {},
      source: {
        spotpassSearchName: imported.event?.spotpassSearchName || "",
        spotpassEventLink: imported.event?.spotpassEventLink || "",
      },
      modulePayments: imported.modulePayments,
      barProducts: imported.barProducts,
      ticketSales: imported.ticketSales,
      tobaccoSales: imported.tobaccoSales,
      operationalExpenses: imported.operationalExpenses,
      suppliesExpenses: imported.suppliesExpenses,
      additionalExpenses: imported.additionalExpenses,
      cashiers: imported.cashiers,
      cashierCommissionRules: imported.cashierCommissionRules,
      productionConsumption: imported.productionConsumption,
      costSales: imported.costSales,
      artisticConsumption: imported.artisticConsumption,
    });
    return { activeEventId: migrated.id, events: [migrated] };
  }
  return loadState();
}

function randomId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
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

function summaryCardCount(label, value, hint) {
  return `
    <article class="metric-card">
      <span class="metric-label">${label}</span>
      <strong class="metric-value">${value}</strong>
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

function sourceFieldTemplate(label, field, value, placeholder = "") {
  return `
    <div class="field">
      <label>${label}</label>
      <input
        data-scope="source"
        data-field="${field}"
        type="text"
        placeholder="${escapeAttribute(placeholder)}"
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

function getMostCommonSource(events) {
  if (events.length === 0) return "Nenhuma";
  const counts = new Map();
  events.forEach((event) => {
    const key = sourceLabel(event.source.type);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function sourceLabel(type) {
  return SOURCE_OPTIONS.find((option) => option.id === type)?.label || "Não definida";
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
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatTime(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatInteger(value) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(toNumber(value));
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return escapeAttribute(value);
}
