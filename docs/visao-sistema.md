# Visão do sistema

## Objetivo

Trocar o fechamento feito em planilha por um sistema web de operação e auditoria, com menos erro manual, visão consolidada do evento e relatórios prontos para apresentação.

## O que veio da planilha atual

O arquivo `BAR OKTA MODELO.xlsx` mostrou seis blocos operacionais:

1. `Fechamento_Geral`
   Consolida receitas, despesas, comissão, saldo, portaria, tabacaria e valor a transferir.
2. `DESPESAS_BEBIDAS`
   Funciona como catálogo de produtos, custos, preço de venda, quantidade vendida e consumo da produção.
3. `BILHETERIA`
   Faz o fechamento da portaria com taxa por meio de pagamento.
4. `TABACARIA`
   Faz o fechamento líquido de vendas auxiliares.
5. `CONTROLE_CAIXAS`
   Replica dezenas de blocos manuais de caixa com venda, total, diferença, comissão e pagar.
6. `CONSUMO_PRODUÇÃO`
   Controla consumo interno, venda a preço de custo e consumo artístico.

## Problemas que o sistema resolve

- Fórmulas críticas espalhadas em várias abas.
- Estrutura repetida para cada caixa, difícil de revisar.
- Dependência de células específicas, o que aumenta risco de erro.
- Falta de histórico confiável por evento.
- Relatório final pouco visual para apresentação.

## Módulos da primeira versão

### 1. Evento

- nome do evento
- data
- local
- responsável
- taxas de débito, PIX e crédito
- percentual de comissão de serviços

### 2. Catálogo do bar

- produto
- categoria
- custo
- preço de venda
- quantidade vendida
- quantidade consumida pela produção

### 3. Bilheteria

- tipo de ingresso
- quantidade
- valor unitário
- total bruto
- distribuição por débito, PIX e crédito
- total líquido

### 4. Tabacaria

- produto
- quantidade
- valor unitário
- total bruto
- distribuição por débito, PIX e crédito
- total líquido

### 5. Fechamento por caixa

- operador/caixa
- venda declarada
- troco
- crédito
- débito
- dinheiro
- PIX
- devoluções
- sangria
- voucher
- total
- diferença
- comissão
- valor a pagar

### 6. Despesas

- operacional
- insumos adicionais
- demais despesas
- custos automáticos de bebidas vendidas
- custos automáticos de produção

### 7. Consumo interno

- consumo da produção
- venda a preço de custo
- consumo artístico

### 8. Relatório executivo

- receita do bar
- venda para produção
- taxas
- despesas operacionais
- custos
- resultado do bar
- comissão
- demais despesas
- bilheteria líquida
- tabacaria líquida
- valor final a transferir

## Regras de negócio herdadas da planilha

- `Receita bar` = soma das vendas dos produtos do bar.
- `Venda produção` = soma do módulo de venda a preço de custo.
- `Taxa bar` = débito x taxa débito + PIX x taxa PIX + crédito x taxa crédito.
- `Despesas base do bar` = taxa bar + operacional + insumos + custo das bebidas.
- `Resultado do bar` = receita bar + venda produção - despesas base.
- `Comissão de serviços` = resultado do bar x percentual configurado.
- `Saldo operacional` = resultado do bar - comissão - demais despesas.
- `Portaria líquida` = bilheteria bruta - taxas da bilheteria.
- `Tabacaria líquida` = tabacaria bruta - taxas da tabacaria.
- `Bar transferir` = saldo operacional + portaria líquida + tabacaria líquida.
- `Total do caixa` = crédito + débito + dinheiro + PIX + devoluções + sangria + voucher.
- `Diferença do caixa` = venda declarada - total do caixa.
- `Comissão do caixa`:
  - até 3.500 = 0,5%
  - até 8.000 = 1%
  - até 15.000 = 1,5%
  - acima disso = 2%

## Arquitetura recomendada para a versão de produção

### Frontend

- `Next.js` para painel web
- componentes de formulário e tabela com validação
- dashboard com gráficos e impressão de relatório

### Backend

- `PostgreSQL` para histórico dos eventos
- `Prisma` ou ORM equivalente para modelagem
- autenticação por perfis: administrador, financeiro, coordenador, caixa

### Entidades principais

- `events`
- `products`
- `product_categories`
- `event_product_entries`
- `ticket_entries`
- `tobacco_entries`
- `payment_summaries`
- `cashier_closings`
- `expense_entries`
- `consumption_entries`
- `report_snapshots`
- `users`
- `audit_logs`

## Fluxo ideal do sistema

1. Criar evento.
2. Carregar catálogo padrão de produtos e equipe.
3. Lançar vendas do bar, bilheteria e tabacaria.
4. Registrar fechamento de cada caixa.
5. Lançar despesas e consumo interno.
6. Conferir divergências automáticas.
7. Gerar relatório executivo final.

## Próxima evolução sugerida

1. Transformar este protótipo em aplicação com banco de dados.
2. Criar login e histórico por cliente/casa.
3. Permitir importação automática de vendas de máquinas ou sistema POS.
4. Exportar fechamento em PDF e Excel.
5. Criar dashboard comparativo entre eventos.
