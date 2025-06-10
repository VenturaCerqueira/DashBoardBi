# 📊 BI Interativo - Carta de Cobrança
-  Análise visual, interativa e responsiva de desempenho de cobranças municipais, com foco em KPIs, gráficos e tabelas por contribuinte;

#  🛠️ Tecnologias Utilizadas
-  HTML5 / CSS3 + TailwindCSS
-  JavaScript (Vanilla)
-  Chart.js (📈 gráficos dinâmicos)
-  html2canvas + html2pdf (📄 geração de PDF)
-  Font Awesome (🎨 ícones visuais)
-  Inter Font (🔤 tipografia)

# 📂 Estrutura de Arquivos

```bash
├── index.html        # Estrutura do HTML com placeholders e layout
├── style.css         # Estilos customizados e responsivos com variáveis CSS
└── script.js         # Lógica de carregamento, interações e geração dos gráficos
```
#   🔍 Funcionalidades
##  🧭 Seleção de Carta
```bash
<select id="carta-cobranca-select">
```
-  Alterna entre datasets (mock) cc1 e cc2.

-  Atualiza KPIs, tabelas e gráficos com base na seleção.

#  📌 KPIs - Indicadores
Mostra dados como:

-  ✉️ Cartas Emitidas

-  🚫 Cartas Canceladas

-  💵 Valor Total Emitido, Pago e Cancelado
Cada KPI é renderizado por:
```bash
createKpiCard(kpi);
```
#  📊 Gráficos
1. 📈 line - Valor Recebido / Mês
Visualiza o crescimento da arrecadação ao longo do tempo.

2. 📊 bar - Quantidade Recebida / Mês
Compara o volume de cartas pagas por mês.

3. 🍩 doughnut - Valor por Tributo
Proporção arrecadada por tipo: IPTU, ISS, TFF.

4. 📉 cancelamentoValorMes / cancelamentoQtdMes
Mostra valores e quantidades canceladas por mês.

5. 🕸️ radar - Performance por Métrica
Compara emitido, arrecadado, cancelado, etc., por tributo.

6. 🎯 polar e 🔵 bubble
Distribuição e concentração por faixas de valor.

7. 🧑🏽‍💼 perfilContribuinte
Pessoa Física vs Jurídica.

8. 💳 pagamentoCanal
Canais de pagamento mais utilizados.

# 📋 Tabelas
- 🥇 Top 10 Maiores Valores
```bash
Destaca maiores contribuintes.
```

- 🥈 Top 10 Menores Valores
```bash
Mostra valores de menor impacto.
```

- 📐 Agelist de Faixas
```bash
1. Agrupa por faixas de valor (ex: R$ 100–200).
2. Atualiza dinamicamente com renderAgelist().
````
#  📥 Exportação
##  📸 Captura Gráfica
```bash
html2canvas(canvas).then(canvas => ...)
```
##  📄 Geração de PDF
```bash
html2pdf().from(...).save()
````
#  🎨 Estilo e Responsividade
O style.css aplica:

-  📱 Grids fluidos com auto-fit

-  🎞️ Animações fadeIn, slideUp, scaleIn

-  📏 Tamanhos e espaçamentos com clamp(...)

-  🌗 Suporte a @media print para PDF

-  💻 Otimizações para telas grandes (>1400px)
