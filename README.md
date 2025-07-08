# Readme Dashboard de BI de Cobrança
https://dashboardbi.onrender.com/

### **1. Seção: Desempenho da Arrecadação**
---
#### **1.1. Gráfico de Linha: Valor Recebido / Mês**
* **ID do Componente:** `recebimentoValorMesChart`
* **Tipo:** Gráfico de Linha (`line`)
* **Objetivo:** Apresentar a evolução temporal do valor monetário total arrecadado. Permite a identificação de tendências, sazonalidade e o impacto de ações de cobrança ao longo dos meses.
* **Análise de Dados:**
    * **Eixo X:** Representa a série temporal, especificamente os meses de referência (ex: 'Jan', 'Fev', 'Mar').
    * **Eixo Y:** Representa o valor total em Reais (BRL) recebido em cada mês correspondente. Os dados são formatados como moeda para exibição nos tooltips.
* **Implementação:** Utiliza a classe `Chart` com o tipo `line`. A área sob a linha é preenchida para dar maior ênfase visual ao volume (`fill: true`), e a linha possui uma leve curvatura (`tension: 0.4`) para suavizar a representação.
---

#### **1.2. Gráfico de Barras: Quantidade Recebida / Mês**
* **ID do Componente:** `recebimentoQtdMesChart`
* **Tipo:** Gráfico de Barras (`bar`)
* **Objetivo:** Quantificar o número de cartas de cobrança que foram efetivamente pagas a cada mês. Ideal para analisar os períodos com maior volume de pagamentos.
* **Análise de Dados:**
    * **Eixo X:** Meses do ano.
    * **Eixo Y:** Contagem absoluta do número de cartas pagas. Os valores são formatados como números inteiros.
* **Implementação:** Gráfico de barras vertical padrão que facilita a comparação direta do volume entre os meses.

---

#### **1.3. Gráfico de Rosca: Valor por Tributo**
* **ID do Componente:** `recebimentoValorTributoChart`
* **Tipo:** Gráfico de Rosca (`doughnut`)
* **Objetivo:** Exibir a composição percentual do valor total arrecadado, segmentado por tipo de tributo (ex: IPTU, ISS, TFF). Mostra qual tributo tem maior representatividade financeira na arrecadação.
* **Análise de Dados:**
    * **Rótulos:** Nomes dos tributos.
    * **Dados:** Valor monetário acumulado para cada tributo. O gráfico calcula automaticamente a proporção de cada fatia.
* **Implementação:** Implementado como `doughnut`. Não possui eixos (escalas) visíveis, focando puramente na proporção. As cores são atribuídas a partir de um array de cores pré-definido (`chartColors`) para garantir consistência.

---

#### **1.4. Gráfico de Barras: Quantidade por Tributo**
* **ID do Componente:** `recebimentoQtdTributoChart`
* **Tipo:** Gráfico de Barras (`bar`)
* **Objetivo:** Comparar a quantidade de cartas pagas para cada tipo de tributo. Complementa o gráfico de "Valor por Tributo", mostrando se um tributo com alto valor arrecadado também possui um alto volume de pagamentos (ou vice-versa).
* **Análise de Dados:**
    * **Eixo X:** Nomes dos tributos.
    * **Eixo Y:** Contagem absoluta de cartas pagas por tributo.
* **Implementação:** Gráfico de barras simples para comparação direta entre as categorias de tributos.

---

#### **1.5. Gráfico de Barras: Valor Cancelado / Mês**
* **ID do Componente:** `cancelamentoValorMesChart`
* **Tipo:** Gráfico de Barras (`bar`)
* **Objetivo:** Monitorar o valor monetário total das cartas de cobrança que foram canceladas a cada mês. Ajuda a identificar picos de cancelamento que podem exigir investigação.
* **Análise de Dados:**
    * **Eixo X:** Meses do ano.
    * **Eixo Y:** Valor monetário total cancelado no mês. As barras são destacadas com a cor vermelha para indicar alerta/negativo.
* **Implementação:** Gráfico de barras vertical. A cor `#ef4444` é usada para representar visualmente os cancelamentos.

---

#### **1.6. Gráfico de Barras: Quantidade Cancelada / Mês**
* **ID do Componente:** `cancelamentoQtdMesChart`
* **Tipo:** Gráfico de Barras (`bar`)
* **Objetivo:** Apresentar o número de cartas canceladas por mês, complementando a análise de valores cancelados.
* **Análise de Dados:**
    * **Eixo X:** Meses do ano.
    * **Eixo Y:** Contagem absoluta de cartas canceladas.
* **Implementação:** Semelhante ao gráfico de valor cancelado, usa uma cor vermelha (`#dc2626`) para reforçar a natureza do dado.

---

#### **1.7. Gráfico de Linha: Emitido vs. Arrecadado**
* **ID do Componente:** `emitidoArrecadadoMesChart`
* **Tipo:** Gráfico de Linha (`line`)
* **Objetivo:** Comparar diretamente o valor total emitido em cobranças com o valor efetivamente arrecadado no mesmo período. É um indicador chave de eficiência da cobrança.
* **Análise de Dados:**
    * **Rótulos:** Meses do ano.
    * **Datasets:** Contém duas séries de dados:
        1.  `Valor Emitido (R$)`: Linha representando o total cobrado.
        2.  `Valor Arrecadado (R$)`: Linha representando o total pago.
* **Implementação:** Gráfico de linha com dois datasets. Cores distintas (`#0284c7` para emitido e `#16a34a` para arrecadado) são usadas para facilitar a distinção visual entre as duas métricas.

---

#### **1.8. Gráfico de Radar: Performance Comparativa**
* **ID do Componente:** `radarChart`
* **Tipo:** Gráfico de Radar (`radar`)
* **Objetivo:** Oferecer uma visão multidimensional para comparar a performance de diferentes tributos através de múltiplas métricas normalizadas (ex: Valor Emitido, Valor Arrecadado, Quantidade Paga, etc.).
* **Análise de Dados:**
    * **Rótulos:** Eixos do radar, cada um representando uma métrica de performance.
    * **Datasets:** Cada dataset representa um tributo (ex: IPTU, ISS), com valores para cada uma das métricas nos eixos.
* **Implementação:** Tipo `radar`. Permite a sobreposição de polígonos (tributos) para uma comparação visual direta. A área é preenchida com transparência para não obstruir a visualização de outros datasets.

---

#### **1.9. Gráfico de Área Polar: Participação por Faixa (%)**
* **ID do Componente:** `polarAreaChart`
* **Tipo:** Gráfico de Área Polar (`polarArea`)
* **Objetivo:** Demonstrar a distribuição das cartas de cobrança por faixas de valor predefinidas. Ajuda a entender onde se concentra a maior quantidade de débitos (em faixas de valor baixo, médio ou alto).
* **Análise de Dados:**
    * **Rótulos:** Descrição das faixas de valor (ex: 'Até 100', '100-200').
    * **Dados:** Quantidade de cartas pertencentes a cada faixa.
* **Implementação:** No gráfico de área polar, cada segmento tem o mesmo ângulo; o raio é o que difere, representando o valor do dado. Isso facilita a comparação da magnitude entre as faixas.

---

#### **1.10. Gráfico de Bolhas: Valor vs. Quantidade**
* **ID do Componente:** `bubbleChart`
* **Tipo:** Gráfico de Bolhas (`bubble`)
* **Objetivo:** Relacionar três dimensões de dados em um único visual: a quantidade de cartas (eixo X), o valor médio (eixo Y) e o total arrecadado (tamanho da bolha). Oferece uma análise de alta densidade da carteira de cobrança.
* **Análise de Dados:**
    * **Dataset:** Cada bolha é um ponto de dados com três propriedades:
        * `x`: Quantidade de cartas na faixa.
        * `y`: Valor médio da faixa.
        * `r`: Raio da bolha, proporcional ao valor total da faixa.
* **Implementação:** Tipo `bubble`. Os eixos são configurados com títulos (`Quantidade de Cartas` e `Valor Médio (R$)`) para contextualizar os dados.

---

#### **1.11. Gráfico de Barras: Receita por Perfil**
* **ID do Componente:** `perfilContribuinteChart`
* **Tipo:** Gráfico de Barras (`bar`)
* **Objetivo:** Comparar o total arrecadado de contribuintes do tipo Pessoa Física (PF) versus Pessoa Jurídica (PJ). Mostra qual perfil contribui mais para a receita.
* **Análise de Dados:**
    * **Rótulos:** 'Pessoa Jurídica', 'Pessoa Física'.
    * **Dados:** Valor monetário total arrecadado para cada perfil.
* **Implementação:** Gráfico de barras vertical com duas categorias, permitindo uma comparação clara e direta.

---

#### **1.12. Gráfico de Pizza: Canal de Pagamento**
* **ID do Componente:** `pagamentoCanalChart`
* **Tipo:** Gráfico de Pizza (`pie`)
* **Objetivo:** Detalhar a participação de cada canal de pagamento (ex: App do Banco, PIX, Lotérica) no total de transações. Revela a preferência dos contribuintes e a eficiência de cada canal.
* **Análise de Dados:**
    * **Rótulos:** Nomes dos canais de pagamento.
    * **Dados:** Quantidade de pagamentos realizados por cada canal.
* **Implementação:** Utiliza o tipo `pie`, uma alternativa ao `doughnut` para representar proporções. Assim como o `doughnut`, não possui escalas visíveis.
---
### **2. Seção: Visão Geral (KPIs)**

Esta seção apresenta os Indicadores Chave de Performance (KPIs) mais importantes, que fornecem um resumo executivo do estado atual da carta de cobrança selecionada.

* **ID dos Componentes:** `kpi-row-1`, `kpi-row-2`
* **Objetivo:** Oferecer uma visão rápida e de alto nível sobre os números essenciais da operação de cobrança, divididos em duas linhas para melhor organização visual.
* **Análise de Dados:**
    * Os dados são obtidos do objeto `mockData` em `script.js`, especificamente das chaves `kpisGerais` e `kpisArrecadacao`.
    * A função `createKpiCard(kpi)` é responsável por renderizar cada card de KPI dinamicamente, formatando os valores como moeda (`BRL`) ou número, e associando um ícone e um esquema de cores para fácil identificação.
* **Implementação:**
    * **KPIs da Linha 1 (`kpi-row-1`): Foco na Emissão**
        * **Cartas Emitidas:** Total de notificações enviadas.
        * **Valor Principal:** Soma do valor original dos débitos, sem encargos.
        * **Valor Encargos:** Soma de multas, juros e correções.
        * **Valor Total Emitido:** Soma do valor principal e dos encargos.
    * **KPIs da Linha 2 (`kpi-row-2`): Foco no Status Atual**
        * **Cartas Canceladas:** Total de notificações invalidadas.
        * **Valor Total Cancelado:** Valor correspondente às cartas canceladas.
        * **Cartas em Aberto:** Campo calculado: `Emitidas - Pagas - Canceladas`.
        * **Valor em Aberto:** Campo calculado: `Valor Emitido - Valor Pago - Valor Cancelado`.

---

### **3. Seção: Detalhes por Contribuinte**

Esta área do painel foca na análise granular, permitindo a identificação de contribuintes e faixas de valor específicas.

#### **3.1. Tabela: Top 10 Maiores Valores**
* **ID do Componente:** `top-valores-table`
* **Objetivo:** Identificar e listar os 10 contribuintes com os maiores valores totais em débito na carta de cobrança selecionada. Essencial para priorizar ações de cobrança sobre os débitos de maior impacto.
* **Análise de Dados:**
    * Os dados são extraídos de `mockData[currentDataKey].tables.top`.
    * Cada linha da tabela é gerada pela função `createTableRow(item)`, que exibe o nome/razão social do contribuinte e o valor total formatado.
    * Um ícone (`fa-building` ou `fa-user`) diferencia Pessoas Jurídicas de Pessoas Físicas.
* **Interatividade:**
    * Clicar em uma linha da tabela aciona a função `openContributorDamsModal(contributorName)`, que abre um modal com o detalhamento de todos os Documentos de Arrecadação Municipal (DAMs) daquele contribuinte.

---

#### **3.2. Tabela: Top 10 Menores Valores**
* **ID do Componente:** `menores-valores-table`
* **Objetivo:** Listar os 10 contribuintes com os menores valores em débito. Embora de menor impacto financeiro individual, essa análise pode revelar padrões em débitos de baixo valor, úteis para estratégias de cobrança em massa ou automatizadas.
* **Análise de Dados:**
    * Os dados vêm de `mockData[currentDataKey].tables.bottom`.
    * A renderização e a interatividade seguem o mesmo padrão da tabela "Top 10 Maiores Valores".

---

#### **3.3. Tabela: Agelist de Cobrança por Faixa de Valor**
* **ID do Componente:** `agelist-table-body`
* **Objetivo:** Agrupar os débitos em faixas de valor pré-definidas (ex: R$ 0,01 a R$ 100,00), mostrando o valor total e a quantidade de contribuintes em cada faixa. Ajuda a segmentar a carteira e a direcionar campanhas de cobrança específicas para cada perfil de dívida.
* **Análise de Dados:**
    * As faixas são definidas no array `agelistRanges` em `script.js`.
    * A função `renderAgelist()` processa a lista completa de contribuintes (`fullList`), distribui-os pelas faixas e calcula os totais de valor e quantidade para cada uma.
* **Interatividade:**
    * Clicar em uma faixa de valor na tabela abre o modal `agelist-modal`, exibindo a lista completa de contribuintes que pertencem àquela faixa específica. A função `openAgelistModal(rangeIndex)` é responsável por essa lógica.

### **4. Seção: Componentes Interativos (Modais)**

Os modais são elementos essenciais do dashboard, pois permitem ao usuário aprofundar a análise, passando de uma visão geral para um nível de detalhe granular sem sair da tela principal. A implementação utiliza JavaScript para controlar a visibilidade e o conteúdo dinâmico de cada modal.

#### **4.1. Modal: Detalhes do Contribuinte (DAMs)**
* **ID do Componente:** `contributor-dams-modal`
* **Acionamento:** Clique em qualquer linha das tabelas "Top 10 Maiores Valores" ou "Top 10 Menores Valores". A função `openContributorDamsModal(contributorName)` é chamada.
* **Objetivo:** Fornecer uma visão completa de todos os Documentos de Arrecadação Municipal (DAMs) que compõem o débito total de um contribuinte específico. É a visão mais detalhada do sistema, essencial para auditoria e atendimento ao contribuinte.
* **Análise de Dados:**
    * Ao ser acionado, o sistema busca no `mockData` o contribuinte correspondente pelo nome (`contributorName`).
    * A propriedade `dams` do objeto do contribuinte é iterada para popular a tabela do modal.
    * Cada linha exibe detalhes do DAM: número, tipo de tributo, parcela, e os valores de multa, juros, correção, desconto e o valor total. Os valores monetários são formatados pela função `formatCurrency`.
* **Implementação:** O modal contém uma tabela (`contributor-dams-table-body`) que é preenchida dinamicamente. O nome do contribuinte é exibido no título para contextualização.

---

#### **4.2. Modal: Detalhes da Faixa de Valor (Agelist)**
* **ID do Componente:** `agelist-modal`
* **Acionamento:** Clique em uma linha na tabela "Agelist de Cobrança por Faixa de Valor". A função `openAgelistModal(rangeIndex)` é invocada.
* **Objetivo:** Listar todos os contribuintes que se enquadram em uma faixa de valor específica selecionada pelo usuário. Facilita a criação de listas de trabalho para campanhas de cobrança segmentadas.
* **Análise de Dados:**
    * A função `openAgelistModal` filtra a lista completa de contribuintes (`fullList`) para encontrar todos os que pertencem à faixa de valor (`rangeIndex`) clicada.
    * A tabela do modal (`agelist-modal-table-body`) é populada com a lista de contribuintes filtrada, mostrando o nome e o valor exato de cada um.
* **Implementação:** Similar ao modal de DAMs, este componente apresenta uma tabela dinâmica preenchida com base na interação do usuário na tela principal.

---

#### **4.3. Modal: Detalhes do Gráfico**
* **ID do Componente:** `chart-modal`
* **Acionamento:** Clique no botão "Detalhes" (ícone de expandir) em qualquer card de gráfico no dashboard. A função `openChartModal(chartName, ...)` é executada.
* **Objetivo:** Apresentar uma versão ampliada e mais detalhada de um gráfico específico, acompanhada de uma descrição analítica e funcionalidades adicionais, como o download da imagem.
* **Análise de Dados:**
    * A função `openChartModal` clona os dados (`data`) e as opções (`options`) do gráfico original que está na tela principal.
    * O título e a descrição do modal são preenchidos dinamicamente com base no `chartName`, buscando as informações no objeto `chartDescriptions`.
    * Um novo gráfico é renderizado dentro do canvas do modal (`modal-chart-canvas`).
* **Implementação:**
    * Este modal é o mais complexo em termos de implementação. Ele recria uma instância do `Chart.js` em um novo contexto, garantindo que a visualização seja clara e grande.
    * **Funcionalidade de Download:** Um botão (`chart-modal-download-btn`) permite ao usuário baixar a visualização do gráfico como um arquivo PNG. Isso é feito utilizando o método `toBase64Image()` do objeto do gráfico.
    * **Destruição da Instância:** É crucial que, ao fechar o modal, a instância do gráfico (`modalChart`) seja destruída (`modalChart.destroy()`) para liberar memória e evitar conflitos ao abrir um novo gráfico.
