# Fechamento Bar Pro

Protótipo inicial de um sistema web para substituir a planilha de fechamento de eventos de bar.

## O que já está pronto

- Dashboard com resumo executivo do evento.
- Cadastro do evento e taxas de pagamento.
- Controle de produtos do bar com custo, venda e consumo da produção.
- Bilheteria e tabacaria com fechamento líquido.
- Auditoria por caixa com total, diferença, comissão e valor a pagar.
- Controle de operacional, insumos, demais despesas e consumo interno.
- Persistência local no navegador via `localStorage`.
- Layout pensado para apresentação e impressão.

## Como usar

1. Abra [index.html](C:/Users/leozi/Documents/Codex/2026-04-18-files-mentioned-by-the-user-bar/index.html).
2. Ajuste os dados do evento e os lançamentos.
3. Use o botão `Imprimir relatório` para gerar uma versão mais apresentável do fechamento.

## Observação importante

Esta é uma primeira versão funcional de protótipo, feita para traduzir a lógica da sua planilha em produto. Para a versão de produção, o ideal é evoluir para:

- frontend com autenticação e permissões;
- banco de dados para histórico de eventos;
- relatórios exportáveis em PDF/Excel;
- cadastros permanentes de produtos, equipe e casas/eventos;
- trilha de auditoria para saber quem lançou e alterou cada valor.

O documento [docs/visao-sistema.md](C:/Users/leozi/Documents/Codex/2026-04-18-files-mentioned-by-the-user-bar/docs/visao-sistema.md) descreve essa evolução.
