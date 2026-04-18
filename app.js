const STORAGE_KEY = "fechamento-bar-pro-v1";

const defaultState = {
  event: {
    name: "Boate OKTA | Evento Modelo",
    date: "2026-04-18",
    venue: "Belo Horizonte",
    manager: "Equipe Financeira",
    serviceRate: 0.08,
    debitRate: 0.023,
    pixRate: 0.023,
    creditRate: 0.038,
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
    { name: "Caixa 001", sale: 7800, troco: 300, credito: 2800, debito: 1700, dinheiro: 2300, pix: 1000, devolucoes: 0, sangria: 0, voucher: 0, fixed: 120 },
    { name: "Caixa 002", sale: 6950, troco: 250, credito: 2100, debito: 1400, dinheiro: 2150, pix: 950, devolucoes: 0, sangria: 0, voucher: 0, fixed: 120 },
    { name: "Caixa 003", sale: 8420, troco: 350, credito: 3120, debito: 1980, dinheiro: 2140, pix: 1180, devolucoes: 0, sangria: 0, voucher: 0, fixed: 120 },
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
    { key: "fixed", label: "Volante fixo", type: "number", step: "0.01" },
  ],
  productionConsumption: [
    { key: "person", label: "Funcionário", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
  costSales: [
    { key: "person", label: "Funcionário", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
  artisticConsumption: [
    { key: "person", label: "Funcionário", type: "text" },
    { key: "qty", label: "Quantidade", type: "number", step: "1" },
    { key: "product", label: "Produto", type: "text" },
    { key: "unit", label: "Valor unitário", type: "number", step: "0.01" },
  ],
};

let state = loadState();

document.addEventListener("DOMContentLoaded", () => {
  bindStaticActions();
  render();
});

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
    barProducts: saved.barProducts || structuredClone(defaultState.barProducts),
    ticketSales: saved.ticketSales || structuredClone(defaultState.ticketSales),
    tobaccoSales: saved.tobaccoSales || structuredClone(defaultState.tobaccoSales),
    operationalExpenses: saved.operationalExpenses || structuredClone(defaultState.operationalExpenses),
    suppliesExpenses: saved.suppliesExpenses || structuredClone(defaultState.suppliesExpenses),
    additionalExpenses: saved.additionalExpenses || structuredClone(defaultState.additionalExpenses),
    cashiers: saved.cashiers || structuredClone(defaultState.cashiers),
    productionConsumption: saved.productionConsumption || structuredClone(defaultState.productionConsumption),
    costSales: saved.costSales || structuredClone(defaultState.costSales),
    artisticConsumption: saved.artisticConsumption || structuredClone(defaultState.artisticConsumption),
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindStaticActions() {
  document.addEventListener("change", handleInput);
  document.addEventListener("click", handleClick);
  document.getElementById("reset-button").addEventListener("click", () => {
    state = structuredClone(defaultState);
    saveState();
    render();
  });
  document.getElementById("print-button").addEventListener("click", () => window.print());
}

function handleInput(event) {
  const target = event.target;
  if (target.dataset.scope === "event") {
    const value = target.type === "number" ? toNumber(target.value) : target.value;
    state.event[target.dataset.field] = value;
    persistAndRender();
    return;
  }

  if (target.dataset.scope === "payment") {
    state.modulePayments[target.dataset.module][target.dataset.field] = toNumber(target.value);
    persistAndRender();
    return;
  }

  if (target.dataset.array) {
    const collection = state[target.dataset.array];
    const row = collection[Number(target.dataset.index)];
    const field = target.dataset.field;
    row[field] = target.type === "number" ? toNumber(target.value) : target.value;
    persistAndRender();
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
    persistAndRender();
  }
}

function addRow(arrayName) {
  const schema = schemas[arrayName];
  const row = {};
  schema.forEach((column) => {
    row[column.key] = column.type === "number" ? 0 : "";
  });
  if (arrayName === "cashiers") row.fixed = 120;
  state[arrayName].push(row);
  persistAndRender();
}

function persistAndRender() {
  saveState();
  render();
}

function render() {
  const metrics = computeMetrics(state);
  renderEventForm();
  renderPaymentForms();
  renderSummary(metrics);
  renderTables(metrics);
  renderHighlights(metrics);
  renderReport(metrics);
}

function renderEventForm() {
  document.getElementById("hero-subtitle").textContent =
    `${state.event.name} | ${formatDate(state.event.date)} | ${state.event.venue}`;

  document.getElementById("event-form").innerHTML = [
    fieldTemplate("Nome do evento", "event", "name", state.event.name, "text"),
    fieldTemplate("Data", "event", "date", state.event.date, "date"),
    fieldTemplate("Local", "event", "venue", state.event.venue, "text"),
    fieldTemplate("Responsável", "event", "manager", state.event.manager, "text"),
  ].join("");

  document.getElementById("fee-form").innerHTML = [
    fieldTemplate("Comissão de serviços", "event", "serviceRate", state.event.serviceRate, "number", "0.001"),
    fieldTemplate("Taxa débito", "event", "debitRate", state.event.debitRate, "number", "0.001"),
    fieldTemplate("Taxa PIX", "event", "pixRate", state.event.pixRate, "number", "0.001"),
    fieldTemplate("Taxa crédito", "event", "creditRate", state.event.creditRate, "number", "0.001"),
  ].join("");
}

function renderPaymentForms() {
  document.getElementById("bar-payment-form").innerHTML = paymentFields("bar");
  document.getElementById("ticket-payment-form").innerHTML = paymentFields("ticket");
  document.getElementById("tobacco-payment-form").innerHTML = paymentFields("tobacco");
}

function paymentFields(moduleName) {
  const module = state.modulePayments[moduleName];
  return [
    paymentFieldTemplate("Débito", moduleName, "debito", module.debito),
    paymentFieldTemplate("PIX", moduleName, "pix", module.pix),
    paymentFieldTemplate("Crédito", moduleName, "credito", module.credito),
  ].join("");
}

function renderSummary(metrics) {
  const cards = [
    {
      label: "Receita total do fechamento",
      value: metrics.transferBase,
      hint: `Bar + produção + portaria + tabacaria.`,
    },
    {
      label: "Resultado do bar",
      value: metrics.barResult,
      hint: `Receita do bar menos taxas, operacional e insumos.`,
    },
    {
      label: "Saldo após comissão e demais despesas",
      value: metrics.netOperationalBalance,
      hint: `Equivale ao bloco de saldo da aba principal.`,
    },
    {
      label: "Bar transferir",
      value: metrics.transferToBar,
      hint: `Saldo do bar + portaria líquida + tabacaria líquida.`,
    },
  ];

  document.getElementById("summary-cards").innerHTML = cards
    .map(
      (card) => `
        <article class="metric-card">
          <span class="metric-label">${card.label}</span>
          <strong class="metric-value">${formatCurrency(card.value)}</strong>
          <span class="metric-hint">${card.hint}</span>
        </article>
      `,
    )
    .join("");

  document.getElementById("revenue-chart").innerHTML = renderBars([
    { label: "Bar", value: metrics.barRevenue, tone: "dark" },
    { label: "Produção", value: metrics.productionRevenue, tone: "teal" },
    { label: "Bilheteria líquida", value: metrics.ticketNet, tone: "" },
    { label: "Tabacaria líquida", value: metrics.tobaccoNet, tone: "teal" },
  ]);

  document.getElementById("expense-chart").innerHTML = renderBars([
    { label: "Taxa cartão bar", value: metrics.barFees, tone: "" },
    { label: "Operacional", value: metrics.operationalTotal, tone: "dark" },
    { label: "Insumos + custo bebidas", value: metrics.suppliesTotal, tone: "teal" },
    { label: "Demais despesas", value: metrics.additionalTotal, tone: "" },
  ]);
}

function renderTables(metrics) {
  renderDataTable("bar-products-table", "barProducts", state.barProducts, (row) => [
    formatCurrency(toNumber(row.cost) * toNumber(row.soldQty)),
    formatCurrency(toNumber(row.price) * toNumber(row.soldQty)),
    formatCurrency(toNumber(row.cost) * toNumber(row.productionQty)),
  ], ["Custo vendas", "Receita", "Custo produção"]);

  renderDataTable("ticket-sales-table", "ticketSales", state.ticketSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);

  renderDataTable("tobacco-sales-table", "tobaccoSales", state.tobaccoSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.price)),
  ], ["Total"]);

  renderDataTable("operational-expenses-table", "operationalExpenses", state.operationalExpenses, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderDataTable("supplies-expenses-table", "suppliesExpenses", state.suppliesExpenses, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderDataTable("additional-expenses-table", "additionalExpenses", state.additionalExpenses, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderDataTable("production-consumption-table", "productionConsumption", state.productionConsumption, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderDataTable("cost-sales-table", "costSales", state.costSales, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderDataTable("artistic-consumption-table", "artisticConsumption", state.artisticConsumption, (row) => [
    formatCurrency(toNumber(row.qty) * toNumber(row.unit)),
  ], ["Total"]);

  renderCashierTable(metrics.cashiersDetails);
}

function renderHighlights(metrics) {
  document.getElementById("bar-module-kpis").innerHTML = `
    <span class="metric-label">Módulo do bar</span>
    <strong>${formatCurrency(metrics.barRevenue)}</strong>
    <span class="metric-hint">Taxa calculada sobre débito, PIX e crédito do bar: ${formatCurrency(metrics.barFees)}</span>
    <span class="metric-hint">Custo de bebidas vendidas: ${formatCurrency(metrics.beverageSalesCost)} | Custo da produção: ${formatCurrency(metrics.beverageProductionCost)}</span>
  `;
}

function renderReport(metrics) {
  const reportCards = [
    { label: "Bilheteria líquida", value: metrics.ticketNet, hint: `Bruto ${formatCurrency(metrics.ticketGross)}` },
    { label: "Tabacaria líquida", value: metrics.tobaccoNet, hint: `Bruto ${formatCurrency(metrics.tobaccoGross)}` },
    { label: "Comissão de serviços", value: metrics.serviceCommission, hint: `${formatPercent(state.event.serviceRate)} do resultado do bar` },
    { label: "Total a pagar aos caixas", value: metrics.cashiersPayable, hint: `Fixo + comissão por caixa` },
    { label: "Diferença total dos caixas", value: metrics.cashiersDifference, hint: metrics.cashiersDifference === 0 ? "Sem divergência." : "Exige conferência." },
    { label: "Consumo artístico", value: metrics.artisticTotal, hint: "Controle separado para prestação de contas" },
  ];

  document.getElementById("report-kpis").innerHTML = reportCards
    .map(
      (card) => `
        <article class="metric-card">
          <span class="metric-label">${card.label}</span>
          <strong class="metric-value">${formatCurrency(card.value)}</strong>
          <span class="metric-hint">${card.hint}</span>
        </article>
      `,
    )
    .join("");

  document.getElementById("report-breakdown").innerHTML = [
    breakdownItem("Receita bar", metrics.barRevenue),
    breakdownItem("Venda produção", metrics.productionRevenue),
    breakdownItem("Taxas do bar", -metrics.barFees),
    breakdownItem("Operacional", -metrics.operationalTotal),
    breakdownItem("Insumos e custos de bebida", -metrics.suppliesTotal),
    breakdownItem("Resultado do bar", metrics.barResult),
    breakdownItem("Comissão serviços", -metrics.serviceCommission),
    breakdownItem("Demais despesas", -metrics.additionalTotal),
    breakdownItem("Portaria líquida", metrics.ticketNet),
    breakdownItem("Tabacaria líquida", metrics.tobaccoNet),
    breakdownItem("Bar transferir", metrics.transferToBar),
  ].join("");

  document.getElementById("report-insights").innerHTML = generateInsights(metrics)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderDataTable(containerId, arrayName, rows, readonlyBuilder, readonlyLabels) {
  const schema = schemas[arrayName];
  const headers = [
    ...schema.map((column) => `<th>${column.label}</th>`),
    ...readonlyLabels.map((label) => `<th>${label}</th>`),
    "<th>Ações</th>",
  ].join("");

  const body = rows
    .map((row, index) => {
      const inputs = schema
        .map((column) => {
          const value = row[column.key] ?? "";
          return `
            <td>
              <input
                class="cell-input"
                data-array="${arrayName}"
                data-index="${index}"
                data-field="${column.key}"
                type="${column.type}"
                step="${column.step || "1"}"
                value="${escapeAttribute(value)}"
              />
            </td>
          `;
        })
        .join("");

      const readonlyCells = readonlyBuilder(row)
        .map((value) => `<td class="readonly">${value}</td>`)
        .join("");

      return `
        <tr>
          ${inputs}
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
    "Volante fixo",
    "Total",
    "Diferença",
    "Comissão",
    "Pagar",
    "Ações",
  ];

  const body = cashiersDetails
    .map((detail, index) => {
      const row = state.cashiers[index];
      const editableCells = schemas.cashiers
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
          ${editableCells}
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
  const beverageProductionCost = sum(currentState.barProducts, (item) => toNumber(item.cost) * toNumber(item.productionQty));

  const productionRevenue = sum(currentState.costSales, lineTotal);
  const productionConsumptionTotal = sum(currentState.productionConsumption, lineTotal);
  const artisticTotal = sum(currentState.artisticConsumption, lineTotal);

  const ticketGross = sum(currentState.ticketSales, (item) => toNumber(item.qty) * toNumber(item.price));
  const tobaccoGross = sum(currentState.tobaccoSales, (item) => toNumber(item.qty) * toNumber(item.price));

  const barFees = paymentFee(currentState.modulePayments.bar, currentState.event);
  const ticketFees = paymentFee(currentState.modulePayments.ticket, currentState.event);
  const tobaccoFees = paymentFee(currentState.modulePayments.tobacco, currentState.event);

  const operationalTotal = sum(currentState.operationalExpenses, lineTotal);
  const suppliesManual = sum(currentState.suppliesExpenses, lineTotal);
  const suppliesTotal = beverageSalesCost + beverageProductionCost + suppliesManual;
  const additionalTotal = sum(currentState.additionalExpenses, lineTotal);

  const baseExpenses = barFees + operationalTotal + suppliesTotal;
  const totalRevenue = barRevenue + productionRevenue;
  const barResult = totalRevenue - baseExpenses;
  const serviceCommission = barResult * toNumber(currentState.event.serviceRate);
  const netOperationalBalance = barResult - serviceCommission - additionalTotal;
  const ticketNet = ticketGross - ticketFees;
  const tobaccoNet = tobaccoGross - tobaccoFees;
  const transferToBar = netOperationalBalance + ticketNet + tobaccoNet;

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

  return {
    barRevenue,
    beverageSalesCost,
    beverageProductionCost,
    productionRevenue,
    productionConsumptionTotal,
    artisticTotal,
    ticketGross,
    tobaccoGross,
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
    transferBase: totalRevenue + ticketNet + tobaccoNet,
    cashiersDetails,
    cashiersSales,
    cashiersDifference,
    cashiersPayable,
  };
}

function paymentFee(payment, event) {
  return (
    toNumber(payment.debito) * toNumber(event.debitRate) +
    toNumber(payment.pix) * toNumber(event.pixRate) +
    toNumber(payment.credito) * toNumber(event.creditRate)
  );
}

function cashierCommission(total) {
  if (total <= 3500) return total * 0.005;
  if (total <= 8000) return total * 0.01;
  if (total <= 15000) return total * 0.015;
  return total * 0.02;
}

function generateInsights(metrics) {
  const margin = metrics.barRevenue > 0 ? metrics.barResult / metrics.barRevenue : 0;
  const biggestBarItem =
    [...state.barProducts]
      .sort((a, b) => toNumber(b.price) * toNumber(b.soldQty) - toNumber(a.price) * toNumber(a.soldQty))[0] || null;

  const insights = [
    `A margem operacional do bar está em ${formatPercent(margin)} antes das despesas adicionais.`,
    `O módulo de caixa soma ${formatCurrency(metrics.cashiersSales)} em vendas declaradas, com diferença consolidada de ${formatCurrency(metrics.cashiersDifference)}.`,
    `A venda a preço de custo está adicionando ${formatCurrency(metrics.productionRevenue)} ao fechamento principal.`,
    `O consumo artístico está separado em ${formatCurrency(metrics.artisticTotal)}, evitando mistura com custo operacional.`,
  ];

  if (biggestBarItem) {
    insights.unshift(
      `${biggestBarItem.name} é hoje o maior gerador de receita do bar, com ${formatCurrency(
        toNumber(biggestBarItem.price) * toNumber(biggestBarItem.soldQty),
      )}.`,
    );
  }

  if (Math.abs(metrics.cashiersDifference) > 0.01) {
    insights.push("Existe divergência entre venda declarada e fechamento dos caixas. Esse ponto merece uma conferência antes da apresentação final.");
  } else {
    insights.push("Os caixas estão sem divergência relevante, o que indica uma operação mais confiável para o fechamento.");
  }

  if (metrics.barFees > metrics.ticketFees + metrics.tobaccoFees) {
    insights.push("A maior pressão de taxa está no bar. Vale acompanhar a distribuição entre crédito, débito e PIX em tempo real.");
  }

  return insights;
}

function renderBars(data) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  return `
    <div class="bars">
      ${data
        .map((item) => {
          const width = (item.value / maxValue) * 100;
          return `
            <div class="bar-row">
              <div class="bar-label">
                <span>${item.label}</span>
                <strong>${formatCurrency(item.value)}</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill ${item.tone || ""}" style="width: ${width}%"></div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
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

function paymentFieldTemplate(label, moduleName, field, value) {
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

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
