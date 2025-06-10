document.addEventListener('DOMContentLoaded', () => {

    let currentDataKey = 'cc1';
    let modalChart = null;
    let currentAgelistFilter = 'all';

    const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    const formatNumber = (value) => new Intl.NumberFormat('pt-BR').format(value);

    // --- MOCK DATA (unchanged from previous version) ---
    const mockData = {
        cc1: {
            info: { tributos: 'IPTU, ISS, TFF', emissao: '01/06/2025', vencimento: '30/06/2025' },
            kpisGerais: [
                { label: 'Cartas Emitidas', value: 15280, icon: 'fa-paper-plane', color: 'sky' },
                { label: 'Cartas Canceladas', value: 350, icon: 'fa-ban', color: 'red' },
                { label: 'Valor Principal', value: 25890520.50, isCurrency: true, icon: 'fa-file-invoice-dollar', color: 'blue' },
                { label: 'Valor Encargos', value: 50480.10, isCurrency: true, icon: 'fa-percent', color: 'orange' },
                { label: 'Valor Total Emitido', value: 25941000.60, isCurrency: true, icon: 'fa-sack-dollar', color: 'green' },
                { label: 'Valor Total Cancelado', value: 70000.00, isCurrency: true, icon: 'fa-file-circle-xmark', color: 'red' },
            ],
            kpisArrecadacao: [
                { label: 'Cartas Pagas', value: 3820, icon: 'fa-hand-holding-dollar', color: 'purple' },
                { label: 'Principal Pago', value: 651280.13, isCurrency: true, icon: 'fa-file-invoice-dollar', color: 'blue' },
                { label: 'Encargos Pagos', value: 3620.02, isCurrency: true, icon: 'fa-percent', color: 'orange' },
                { label: 'Total Pago', value: 654900.15, isCurrency: true, icon: 'fa-sack-dollar', color: 'green' },
            ],
            tables: {
                 top: [
                    { name: '12.345.678/0001-99 - GRANDE EMPRESA S.A.', value: 1025270.00, type: 'building', dams: [{ id: '2025001', tipo: 'IPTU', parcela: 'Única', multa: 50000.00, juros: 2527.00, correcao: 0, desconto: 0, valor: 525270.00 }, { id: '2025002', tipo: 'TFF', parcela: 'Única', multa: 48000.00, juros: 2000.00, correcao: 0, desconto: 0, valor: 500000.00 }] },
                    { name: '01.234.567/0001-88 - CONSTRUTORA GERAL LTDA', value: 890200.00, type: 'building', dams: [{ id: '2025003', tipo: 'ISS', parcela: '1/3', multa: 80000.00, juros: 9020.00, correcao: 1000.00, desconto: 0, valor: 890200.00 }] },
                    { name: '98.765.432-10 - JOÃO DA SILVA PEREIRA', value: 751500.00, type: 'user', dams: [{ id: '2025004', tipo: 'IPTU', parcela: '1/10', multa: 70000.00, juros: 5000.00, correcao: 1500.00, desconto: 0, valor: 700000.00 }, { id: '2025005', tipo: 'IPTU', parcela: '2/10', multa: 5000.00, juros: 150.00, correcao: 0, desconto: 0, valor: 51500.00 }] },
                    { name: '25.555.888/0001-11 - SHOPPING CENTER', value: 690100.20, type: 'building', dams: [{ id: '2025006', tipo: 'IPTU', parcela: 'Única', multa: 69000.00, juros: 100.20, correcao: 0, desconto: 0, valor: 690100.20 }] },
                    { name: '12.345.678-90 - MARIA OLIVEIRA SANTOS', value: 550750.80, type: 'user', dams: [{ id: '2025007', tipo: 'IPTU', parcela: '1/5', multa: 55000.00, juros: 750.80, correcao: 0, desconto: 0, valor: 550750.80 }] },
                    { name: '10.203.040/0001-50 - SUPERMERCADO ABC', value: 450000.00, type: 'building', dams: [{ id: '2025008', tipo: 'TFF', parcela: '1/2', multa: 20000.00, juros: 0.00, correcao: 0, desconto: 0, valor: 200000.00 }, { id: '2025009', tipo: 'TFF', parcela: '2/2', multa: 25000.00, juros: 0.00, correcao: 0, desconto: 0, valor: 250000.00 }] },
                    { name: '15.987.654-32 - CARLOS EDUARDO LIMA', value: 234500.75, type: 'user', dams: [{ id: '2025010', tipo: 'ISS', parcela: 'Única', multa: 23450.00, juros: 0.75, correcao: 0, desconto: 0, valor: 234500.75 }] },
                    { name: '22.113.344/0001-89 - PADARIA DOCE PÃO', value: 56800.90, type: 'building', dams: [{ id: '2025011', tipo: 'TFF', parcela: 'Única', multa: 5680.00, juros: 0.90, correcao: 0, desconto: 0, valor: 56800.90 }] },
                    { name: '88.776.655-44 - FERNANDA ALVES', value: 32000.00, type: 'user', dams: [{ id: '2025012', tipo: 'IPTU', parcela: '3/3', multa: 3200.00, juros: 0.00, correcao: 0, desconto: 0, valor: 32000.00 }] },
                    { name: '91.234.567/0001-00 - RESTAURANTE SABOROSO', value: 12500.55, type: 'building', dams: [{ id: '2025013', tipo: 'ISS', parcela: '1/1', multa: 1250.00, juros: 0.55, correcao: 0, desconto: 0, valor: 12500.55 }] },
                ],
                bottom: [
                    { name: '76.543.210-98 - OFICINA DO BAIRRO', value: 120.00, type: 'user', dams: [{ id: '2025014', tipo: 'TFF', parcela: 'Única', multa: 12.00, juros: 0.00, correcao: 0, desconto: 0, valor: 120.00 }] },
                    { name: '34.567.890/0001-12 - LOJA DE ROUPAS ESTILO', value: 112.32, type: 'building', dams: [{ id: '2025015', tipo: 'TFF', parcela: 'Única', multa: 11.23, juros: 0.09, correcao: 0, desconto: 0, valor: 112.32 }] },
                    { name: '65.432.109-87 - MARIANA COSTA', value: 105.10, type: 'user', dams: [{ id: '2025016', tipo: 'IPTU', parcela: '1/1', multa: 10.51, juros: 0.00, correcao: 0, desconto: 0, valor: 105.10 }] },
                    { name: '43.210.987/0001-65 - PAPELARIA CENTRAL', value: 98.98, type: 'building', dams: [{ id: '2025017', tipo: 'TFF', parcela: 'Única', multa: 9.90, juros: 0.08, correcao: 0, desconto: 0, valor: 98.98 }] },
                    { name: '87.654.321-09 - LUCAS MENDES', value: 92.00, type: 'user', dams: [{ id: '2025018', tipo: 'IPTU', parcela: 'Única', multa: 9.20, juros: 0.00, correcao: 0, desconto: 0, valor: 92.00 }] },
                    { name: '11.222.333-44 - MARIA APARECIDA DE SOUZA', value: 87.60, type: 'user', dams: [{ id: '2025019', tipo: 'IPTU', parcela: '1/1', multa: 8.76, juros: 0.00, correcao: 0, desconto: 0, valor: 87.60 }] },
                    { name: '99.888.777/0001-66 - LANCHONETE DO ZÉ LTDA', value: 75.30, type: 'building', dams: [{ id: '2025020', tipo: 'TFF', parcela: 'Única', multa: 7.53, juros: 0.00, correcao: 0, desconto: 0, valor: 75.30 }] },
                    { name: '45.678.912-30 - PEDRO HENRIQUE LIMA', value: 65.15, type: 'user', dams: [{ id: '2025021', tipo: 'ISS', parcela: 'Única', multa: 6.51, juros: 0.04, correcao: 0, desconto: 0, valor: 65.15 }] },
                    { name: '33.444.555/0001-00 - PEQUENO MERCADO MEI', value: 58.40, type: 'building', dams: [{ id: '2025022', tipo: 'TFF', parcela: 'Única', multa: 5.84, juros: 0.00, correcao: 0, desconto: 0, valor: 58.40 }] },
                    { name: '55.666.777-88 - MICROEMPRESA DO BAIRRO', value: 51.17, type: 'user', dams: [{ id: '2025023', tipo: 'TFF', parcela: 'Única', multa: 5.11, juros: 0.06, correcao: 0, desconto: 0, valor: 51.17 }] },
                ],
                fullList: [ /* Full list remains as before for brevity */ ]
            },
            charts: {
                line: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], data: [55000, 78000, 95000, 120000, 180000, 250000] },
                bar: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], data: [310, 450, 520, 680, 890, 970] },
                doughnut: { labels: ['IPTU', 'ISS', 'TFF'], data: [450000, 150000, 54900] },
                qtdTributo: { labels: ['IPTU', 'ISS', 'TFF'], data: [2500, 1000, 320] },
                radar: { labels: ['Emitido (Valor)', 'Arrecadado (Valor)', 'Cancelado (Valor)', 'Qtd Paga', 'Qtd Cancelada'], datasets: [{ label: 'IPTU', data: [90, 75, 10, 80, 15] }, { label: 'ISS', data: [70, 65, 30, 60, 25] }] },
                polar: { labels: ['Até 100', '100-200', '200-300', '300-1k', '> 1k'], data: [5123, 3456, 2180, 3000, 1501] },
                bubble: { datasets: [{ label: 'Até R$100', data: [{x: 5123, y: 50, r: 15}] }, { label: 'R$100-R$200', data: [{x: 3456, y: 150, r: 20}] }, { label: 'R$200-R$300', data: [{x: 2180, y: 250, r: 25}] }, { label: '> R$1k', data: [{x: 1501, y: 1500, r: 40}] }]},
                cancelamentoValorMes: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], data: [5000, 7500, 6000, 11000, 8000, 7000] },
                cancelamentoQtdMes: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], data: [20, 30, 25, 40, 35, 30] },
                emitidoArrecadadoMes: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [ { label: 'Valor Emitido (R$)', data: [600000, 850000, 1000000, 1300000, 2000000, 2800000] }, { label: 'Valor Arrecadado (R$)', data: [55000, 78000, 95000, 120000, 180000, 250000] }]
                },
                pagamentoCanal: { labels: ['App do Banco', 'PIX', 'Lotérica', 'Guichê'], data: [2540, 980, 250, 50] },
                perfilContribuinte: { labels: ['Pessoa Jurídica', 'Pessoa Física'], data: [459380.75, 195519.4] }
            }
        },
        cc2: {
             info: { tributos: 'TFF', emissao: '01/05/2025', vencimento: '31/05/2025' },
            kpisGerais: [
                { label: 'Cartas Emitidas', value: 8500, icon: 'fa-paper-plane', color: 'sky' }, { label: 'Cartas Canceladas', value: 120, icon: 'fa-ban', color: 'red' },
                { label: 'Valor Principal', value: 12500000, isCurrency: true, icon: 'fa-file-invoice-dollar', color: 'blue' }, { label: 'Valor Encargos', value: 630000, isCurrency: true, icon: 'fa-percent', color: 'orange' },
                { label: 'Valor Total Emitido', value: 13130000, isCurrency: true, icon: 'fa-sack-dollar', color: 'green' }, { label: 'Valor Total Cancelado', value: 30000.00, isCurrency: true, icon: 'fa-file-circle-xmark', color: 'red' },
            ],
            kpisArrecadacao: [
                { label: 'Cartas Pagas', value: 2100, icon: 'fa-hand-holding-dollar', color: 'purple' }, { label: 'Principal Pago', value: 3200000, isCurrency: true, icon: 'fa-file-invoice-dollar', color: 'blue' },
                { label: 'Encargos Pagos', value: 150000, isCurrency: true, icon: 'fa-percent', color: 'orange' }, { label: 'Total Pago', value: 3350000, isCurrency: true, icon: 'fa-sack-dollar', color: 'green' },
            ],
            tables: {
                 top: [
                    { name: '33.333.333/0001-33 - INDÚSTRIA PESADA S.A.', value: 950000, type: 'building', dams: [{id: 'TFF001', tipo: 'TFF', parcela: '1/1', multa: 90000, juros: 5000, correcao: 0, desconto: 0, value: 950000}] }, 
                    { name: '44.444.444/0001-44 - REDE DE HOTÉIS', value: 780000, type: 'building', dams: [{id: 'TFF002', tipo: 'TFF', parcela: '1/2', multa: 40000, juros: 0, correcao: 0, desconto: 0, value: 400000}, {id: 'TFF003', tipo: 'TFF', parcela: '2/2', multa: 38000, juros: 0, correcao: 0, desconto: 0, value: 380000}] }, 
                    { name: '55.555.555-55 - ANTÔNIO CARLOS NUNES', value: 620000, type: 'user', dams: [{id: 'TFF004', tipo: 'TFF', parcela: 'Única', multa: 60000, juros: 2000, correcao: 0, desconto: 0, value: 620000}] },
                    { name: '66.666.666/0001-66 - TRANSPORTADORA VELOZ', value: 580000, type: 'building', dams: [{id: 'TFF005', tipo: 'TFF', parcela: '1/1', multa: 58000, juros: 0, correcao: 0, desconto: 0, value: 580000}] }, 
                    { name: '77.777.777-77 - BEATRIZ COSTA', value: 490000, type: 'user', dams: [{id: 'TFF006', tipo: 'TFF', parcela: '1/1', multa: 49000, juros: 0, correcao: 0, desconto: 0, value: 490000}] }, 
                    { name: '88.888.888/0001-88 - CONSULTORIA FINANCEIRA', value: 98000, type: 'building', dams: [{id: 'TFF007', tipo: 'TFF', parcela: '1/1', multa: 9800, juros: 0, correcao: 0, desconto: 0, value: 98000}] },
                    { name: '99.999.999-99 - ROBERTO GOMES', value: 76543, type: 'user', dams: [{id: 'TFF008', tipo: 'TFF', parcela: '1/1', multa: 7654, juros: 0, correcao: 0, desconto: 0, value: 76543}] }, 
                    { name: '10.101.010/0001-10 - ACADEMIA FITNESS', value: 12345, type: 'building', dams: [{id: 'TFF009', tipo: 'TFF', parcela: '1/1', multa: 1234, juros: 1, correcao: 0, desconto: 0, value: 12345}] }, 
                    { name: '20.202.020-20 - PAULO ROBERTO', value: 9876, type: 'user', dams: [{id: 'TFF010', tipo: 'TFF', parcela: '1/1', multa: 987, juros: 0, correcao: 0, desconto: 0, value: 9876}] }, 
                    { name: '30.303.030/0001-30 - ESCRITÓRIO ADVOCACIA', value: 5432, type: 'building', dams: [{id: 'TFF011', tipo: 'TFF', parcela: '1/1', multa: 543, juros: 0, correcao: 0, desconto: 0, value: 5432}] },
                ],
                bottom: [
                    { name: '40.404.040-40 - MARIANA SILVA', value: 210.9, type: 'user', dams: [{id: 'TFF012', tipo: 'TFF', parcela: '1/1', multa: 21, juros: 0, correcao: 0, desconto: 0, value: 210.9}] }, 
                    { name: '50.505.050/0001-50 - MINI MERCADO', value: 187.6, type: 'building', dams: [{id: 'TFF013', tipo: 'TFF', parcela: '1/1', multa: 18, juros: 0, correcao: 0, desconto: 0, value: 187.6}] }, 
                    { name: '60.606.060-60 - FERNANDO LIMA', value: 154.3, type: 'user', dams: [{id: 'TFF014', tipo: 'TFF', parcela: '1/1', multa: 15, juros: 0, correcao: 0, desconto: 0, value: 154.3}] },
                    { name: '70.707.070/0001-70 - LOJA DE PRESENTES', value: 132.1, type: 'building', dams: [{id: 'TFF015', tipo: 'TFF', parcela: '1/1', multa: 13, juros: 0, correcao: 0, desconto: 0, value: 132.1}] }, 
                    { name: '80.808.080-80 - ANA PAULA', value: 121.0, type: 'user', dams: [{id: 'TFF016', tipo: 'TFF', parcela: '1/1', multa: 12, juros: 0, correcao: 0, desconto: 0, value: 121.0}] }, 
                    { name: '01.010.101-01 - JOANA DA SILVA', value: 95.50, type: 'user', dams: [{id: 'TFF017', tipo: 'TFF', parcela: '1/1', multa: 9, juros: 0, correcao: 0, desconto: 0, value: 95.50}] },
                    { name: '02.020.202/0001-02 - SALÃO DE BELEZA', value: 88.00, type: 'building', dams: [{id: 'TFF018', tipo: 'TFF', parcela: '1/1', multa: 8, juros: 0, correcao: 0, desconto: 0, value: 88.00}] }, 
                    { name: '03.030.303-03 - CARLOS PEREIRA', value: 72.30, type: 'user', dams: [{id: 'TFF019', tipo: 'TFF', parcela: '1/1', multa: 7, juros: 0, correcao: 0, desconto: 0, value: 72.30}] }, 
                    { name: '04.040.404/0001-04 - OFICINA MECÂNICA', value: 65.00, type: 'building', dams: [{id: 'TFF020', tipo: 'TFF', parcela: '1/1', multa: 6, juros: 0, correcao: 0, desconto: 0, value: 65.00}] }, 
                    { name: '05.050.505-05 - MERCADINHO FAMÍLIA', value: 55.20, type: 'user', dams: [{id: 'TFF021', tipo: 'TFF', parcela: '1/1', multa: 5, juros: 0, correcao: 0, desconto: 0, value: 55.20}] },
                ],
                fullList: [ /* Full list remains as before for brevity */ ]
            },
             charts: {
                line: { labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], data: [300000, 450000, 600000, 800000, 1100000, 1500000] },
                bar: { labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], data: [200, 280, 350, 480, 590, 650] },
                doughnut: { labels: ['TFF'], data: [3350000] },
                qtdTributo: { labels: ['TFF'], data: [2100] },
                radar: { labels: ['Emitido (Valor)', 'Arrecadado (Valor)', 'Cancelado (Valor)', 'Qtd Paga', 'Qtd Cancelada'], datasets: [{ label: 'TFF', data: [85, 80, 5, 82, 8] }] },
                polar: { labels: ['Até 100', '100-200', '200-300', '300-1k', '> 1k'], data: [2500, 1800, 1500, 1700, 1000] },
                bubble: { datasets: [{ label: 'Até R$100', data: [{x: 2500, y: 75, r: 18}] }, { label: 'R$100-R$200', data: [{x: 1800, y: 160, r: 22}] }, { label: 'R$200-R$300', data: [{x: 1500, y: 260, r: 28}] }, { label: '> R$1k', data: [{x: 1000, y: 1800, r: 45}] }]},
                cancelamentoValorMes: { labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], data: [2000, 1500, 2500, 1800, 3000, 2200] },
                cancelamentoQtdMes: { labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], data: [10, 8, 12, 9, 15, 11] },
                emitidoArrecadadoMes: {
                    labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                    datasets: [ { label: 'Valor Emitido (R$)', data: [350000, 500000, 650000, 850000, 1200000, 1600000] }, { label: 'Valor Arrecadado (R$)', data: [300000, 450000, 600000, 800000, 1100000, 1500000] } ]
                },
                pagamentoCanal: { labels: ['App do Banco', 'PIX', 'Lotérica', 'Guichê'], data: [1500, 450, 100, 50] },
                perfilContribuinte: { labels: ['Pessoa Jurídica', 'Pessoa Física'], data: [2424958, 925042] }
            }
        }
    };
    mockData.cc1.tables.fullList = [...mockData.cc1.tables.top, ...mockData.cc1.tables.bottom];
    mockData.cc2.tables.fullList = [...mockData.cc2.tables.top, ...mockData.cc2.tables.bottom];
    
    const charts = {};
    const chartDescriptions = {
        line: 'Este gráfico de linha mostra a evolução do valor total recebido mês a mês, permitindo visualizar tendências de arrecadação ao longo do tempo.',
        bar: 'Este gráfico de barras representa a quantidade de cartas que foram pagas em cada mês, indicando os períodos de maior volume de pagamentos.',
        doughnut: 'Em formato de rosca, este gráfico exibe a proporção do valor arrecadado para cada tipo de tributo (IPTU, ISS, TFF), mostrando a contribuição de cada um para o total.',
        qtdTributo: 'Similar ao anterior, mas focado na quantidade, este gráfico de barras compara o número de cartas pagas por tipo de tributo.',
        cancelamentoValorMes: 'Este gráfico ilustra o valor total das cartas que foram canceladas a cada mês, ajudando a identificar picos de cancelamento.',
        cancelamentoQtdMes: 'Mostra a quantidade de cartas canceladas por mês, complementando o gráfico de valor de cancelamentos.',
        emitidoArrecadadoMes: 'Um comparativo em linhas que contrasta o valor total emitido com o valor efetivamente arrecadado a cada mês, medindo a eficiência da cobrança.',
        radar: 'O gráfico de radar (ou aranha) oferece uma visão comparativa da performance entre diferentes tributos, avaliando múltiplas métricas como valor emitido, arrecadado e cancelado.',
        polar: 'Este gráfico de área polar demonstra a distribuição das cartas por faixas de valor, mostrando quais faixas concentram a maior quantidade de débitos.',
        bubble: 'O gráfico de bolhas relaciona três variáveis: a quantidade de cartas (eixo X), o valor médio (eixo Y) e o total arrecadado (tamanho da bolha) por faixa, oferecendo uma análise densa da carteira.',
        perfilContribuinte: 'Compara o total arrecadado de Pessoas Físicas versus Pessoas Jurídicas, mostrando qual perfil de contribuinte representa a maior fatia da arrecadação.',
        pagamentoCanal: 'Em formato de pizza, este gráfico detalha por onde os contribuintes estão realizando os pagamentos (App do Banco, PIX, etc.), revelando os canais mais utilizados.'
    };
    
    const agelistRanges = [
        { min: 0.01, max: 100.00, label: 'R$ 0,01 a R$ 100,00' }, { min: 100.01, max: 200.00, label: 'R$ 100,01 a R$ 200,00' }, { min: 200.01, max: 300.00, label: 'R$ 200,01 a R$ 300,00' }, { min: 300.01, max: 400.00, label: 'R$ 300,01 a R$ 400,00' }, { min: 400.01, max: 500.00, label: 'R$ 400,01 a R$ 500,00' },
        { min: 500.01, max: 1000.00, label: 'R$ 500,01 a R$ 1.000,00' }, { min: 1000.01, max: 2000.00, label: 'R$ 1.000,01 a R$ 2.000,00' }, { min: 2000.01, max: 3000.00, label: 'R$ 2.000,01 a R$ 3.000,00' }, { min: 3000.01, max: Infinity, label: 'Acima de R$ 3.000,01' },
    ];

    const createKpiCard = (kpi) => { let valueDisplay = kpi.isPercentage ? kpi.value.toFixed(2) + '%' : (kpi.isCurrency ? formatCurrency(kpi.value) : formatNumber(kpi.value)); const colors = { sky: 'text-sky-600', red: 'text-red-500', blue: 'text-blue-600', orange: 'text-orange-500', green: 'text-green-600', purple: 'text-purple-600', teal: 'text-teal-600', yellow: 'text-yellow-600', pink: 'text-pink-600' }; return `<div class="bg-white p-5 rounded-lg shadow-md border border-slate-200 flex items-center gap-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full"><div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-${kpi.color}-100 rounded-full"><i class="fa-solid ${kpi.icon} ${colors[kpi.color]} text-2xl"></i></div><div><div class="text-2xl font-bold text-slate-900">${valueDisplay}</div><div class="text-sm font-medium text-slate-500">${kpi.label}</div></div></div>`;};
    
    const createTableRow = (item) => `<tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200 cursor-pointer contributor-row" data-contributor-name="${item.name}"><td class="px-6 py-4 font-medium text-slate-900"><div class="flex items-center gap-3"><i class="fa-solid fa-${item.type === 'building' ? 'building' : 'user'} text-slate-400"></i><span>${item.name}</span></div></td><td class="px-6 py-4 text-right font-mono">${formatCurrency(item.value)}</td></tr>`;
    
    const renderAgelist = () => { 
        const fullList = mockData[currentDataKey].tables.fullList; 
        const filteredList = fullList.filter(item => currentAgelistFilter === 'all' || (currentAgelistFilter === 'pf' && item.type === 'user') || (currentAgelistFilter === 'pj' && item.type === 'building')); 
        const agelistData = agelistRanges.map(range => ({ ...range, totalValue: 0, quantity: 0, contributors: [] })); 
        filteredList.forEach(item => { 
            const range = agelistData.find(r => item.value >= r.min && item.value <= r.max); 
            if (range) { 
                range.totalValue += item.value; 
                range.quantity++; 
                range.contributors.push(item); 
            }
        }); 
        document.getElementById('agelist-table-body').innerHTML = agelistData.map((range, index) => 
            `<tr class="border-b border-slate-200 hover:bg-sky-50 transition-colors duration-200 cursor-pointer" data-range-index="${index}">
                <td class="px-6 py-4 font-medium text-slate-900">${range.label}</td>
                <td class="px-6 py-4 text-right font-mono text-slate-600">${formatCurrency(range.totalValue)}</td>
                <td class="px-6 py-4 text-right font-mono text-sky-700 font-bold">${formatNumber(range.quantity)}</td>
            </tr>`).join('');
    };

    const updateDashboard = (data) => { 
        document.getElementById('info-bar').innerHTML = `<div class="info-item flex items-center justify-center gap-2"><i class="fa-solid fa-tags text-sky-600"></i><div><strong class="block text-xs font-semibold text-slate-500 uppercase">Tributos</strong><span class="text-base font-medium text-slate-800">${data.info.tributos}</span></div></div><div class="info-item flex items-center justify-center gap-2"><i class="fa-solid fa-calendar-plus text-sky-600"></i><div><strong class="block text-xs font-semibold text-slate-500 uppercase">Data Emissão</strong><span class="text-base font-medium text-slate-800">${data.info.emissao}</span></div></div><div class="info-item flex items-center justify-center gap-2"><i class="fa-solid fa-calendar-xmark text-sky-600"></i><div><strong class="block text-xs font-semibold text-slate-500 uppercase">Vencimento DAM</strong><span class="text-base font-medium text-slate-800">${data.info.vencimento}</span></div></div>`; 
        const kpisGerais = [...data.kpisGerais]; 
        const kpisArrecadacao = [...data.kpisArrecadacao]; 
        const cartasEmitidas = kpisGerais.find(k => k.label === 'Cartas Emitidas').value; 
        const cartasPagas = kpisArrecadacao.find(k => k.label === 'Cartas Pagas').value; 
        const cartasCanceladas = kpisGerais.find(k => k.label === 'Cartas Canceladas').value; 
        const valorTotalEmitido = kpisGerais.find(k => k.label === 'Valor Total Emitido').value; 
        const valorTotalPago = kpisArrecadacao.find(k => k.label === 'Total Pago').value; 
        const valorTotalCancelado = kpisGerais.find(k => k.label === 'Valor Total Cancelado').value; 
        const kpiMap = { 
            ...kpisGerais.reduce((acc, kpi) => ({ ...acc, [kpi.label]: kpi }), {}), 
            'Cartas em Aberto': { label: 'Cartas em Aberto', value: cartasEmitidas - cartasPagas - cartasCanceladas, icon: 'fa-file-circle-question', color: 'yellow' }, 
            'Valor em Aberto': { label: 'Valor em Aberto', value: valorTotalEmitido - valorTotalPago - valorTotalCancelado, isCurrency: true, icon: 'fa-sack-xmark', color: 'pink' },
        }; 
        document.getElementById('kpi-row-1').innerHTML = ['Cartas Emitidas', 'Valor Principal', 'Valor Encargos', 'Valor Total Emitido'].map(label => createKpiCard(kpiMap[label])).join(''); 
        document.getElementById('kpi-row-2').innerHTML = ['Cartas Canceladas', 'Valor Total Cancelado', 'Cartas em Aberto', 'Valor em Aberto'].map(label => createKpiCard(kpiMap[label])).join(''); 
        const principalPago = kpisArrecadacao.find(kpi => kpi.label === 'Principal Pago').value; 
        const valorPrincipalEmitido = kpisGerais.find(kpi => kpi.label === 'Valor Principal').value; 
        const percentualRecebimento = (valorPrincipalEmitido > 0) ? (principalPago / valorPrincipalEmitido) * 100 : 0; 
        document.getElementById('kpi-container-arrecadacao').innerHTML = [...data.kpisArrecadacao, { label: 'Percentual Recebimento', value: percentualRecebimento, isCurrency: false, icon: 'fa-chart-line', color: 'teal', isPercentage: true }].map(createKpiCard).join(''); 
        
        document.getElementById('top-valores-table').innerHTML = data.tables.top.map(createTableRow).join('');
        const topTotal = data.tables.top.reduce((sum, item) => sum + item.value, 0);
        document.getElementById('top-valores-total').innerHTML = `<tr class="bg-slate-100 text-slate-800 font-bold"><td class="px-6 py-3 text-right">Total Geral:</td><td class="px-6 py-3 text-right">${formatCurrency(topTotal)}</td></tr>`;

        document.getElementById('menores-valores-table').innerHTML = data.tables.bottom.map(createTableRow).join('');
        const bottomTotal = data.tables.bottom.reduce((sum, item) => sum + item.value, 0);
        document.getElementById('menores-valores-total').innerHTML = `<tr class="bg-slate-100 text-slate-800 font-bold"><td class="px-6 py-3 text-right">Total Geral:</td><td class="px-6 py-3 text-right">${formatCurrency(bottomTotal)}</td></tr>`;
        
        renderAgelist(); 
        updateCharts(data.charts);
        addTableEventListeners(); 
    };

    const initCharts = () => { 
        const defaultChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: '#475569', font: { family: "'Inter', sans-serif" } } }, tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 12, cornerRadius: 6, callbacks: { label: function(context) { let label = context.dataset.label || context.label || ''; if (label) { label += ': '; } let value = context.parsed.y; if(['doughnut', 'polarArea', 'pie'].includes(context.chart.config.type)) value = context.parsed; if (value !== null) label += (['doughnut', 'pie'].includes(context.chart.config.type) || (context.chart.canvas.id || '').includes('Valor') || (context.chart.canvas.id || '').includes('perfil')) ? formatCurrency(value) : formatNumber(value); return label;}}}}, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } }, x: { grid: { display: false }, ticks: { color: '#64748b' } }}}; 
        const noScalesOptions = { ...defaultChartOptions, scales: { y: { display: false }, x: { display: false } } }; 
        charts.line = new Chart(document.getElementById('recebimentoValorMesChart'), { type: 'line', data: {}, options: defaultChartOptions }); 
        charts.bar = new Chart(document.getElementById('recebimentoQtdMesChart'), { type: 'bar', data: {}, options: defaultChartOptions }); 
        charts.doughnut = new Chart(document.getElementById('recebimentoValorTributoChart'), { type: 'doughnut', data: {}, options: noScalesOptions }); 
        charts.qtdTributo = new Chart(document.getElementById('recebimentoQtdTributoChart'), { type: 'bar', data: {}, options: defaultChartOptions }); 
        charts.cancelamentoValorMes = new Chart(document.getElementById('cancelamentoValorMesChart'), { type: 'bar', data: {}, options: defaultChartOptions }); 
        charts.cancelamentoQtdMes = new Chart(document.getElementById('cancelamentoQtdMesChart'), { type: 'bar', data: {}, options: defaultChartOptions }); 
        charts.emitidoArrecadadoMes = new Chart(document.getElementById('emitidoArrecadadoMesChart'), { type: 'line', data: {}, options: defaultChartOptions }); 
        charts.radar = new Chart(document.getElementById('radarChart'), { type: 'radar', data: {}, options: { ...noScalesOptions, elements: { line: { tension: 0.1 } } } }); 
        charts.polar = new Chart(document.getElementById('polarAreaChart'), { type: 'polarArea', data: {}, options: noScalesOptions }); 
        charts.bubble = new Chart(document.getElementById('bubbleChart'), { type: 'bubble', data: {}, options: { ...defaultChartOptions, plugins: { legend: { position: 'bottom' } }, scales: { x: { title: { display: true, text: 'Quantidade de Cartas' } }, y: { title: { display: true, text: 'Valor Médio (R$)' } } } } }); 
        charts.pagamentoCanal = new Chart(document.getElementById('pagamentoCanalChart'), {type: 'pie', data: {}, options: noScalesOptions }); 
        charts.perfilContribuinte = new Chart(document.getElementById('perfilContribuinteChart'), {type: 'bar', data: {}, options: defaultChartOptions});
    };

    const updateCharts = (chartData) => { 
        const chartColors = ['#0369a1', '#15803d', '#facc15', '#ea580c', '#be123c', '#0891b2', '#6d28d9']; 
        charts.line.data = { labels: chartData.line.labels, datasets: [{ label: 'Valor Recebido (R$)', data: chartData.line.data, borderColor: '#0284c7', backgroundColor: 'rgba(2, 132, 199, 0.1)', fill: true, tension: 0.4 }] }; 
        charts.bar.data = { labels: chartData.bar.labels, datasets: [{ label: 'Cartas Recebidas', data: chartData.bar.data, backgroundColor: '#16a34a' }] }; 
        charts.doughnut.data = { labels: chartData.doughnut.labels, datasets: [{ label: 'Valor Total Arrecadado', data: chartData.doughnut.data, backgroundColor: chartColors }] }; 
        charts.qtdTributo.data = { labels: chartData.qtdTributo.labels, datasets: [{ label: 'Cartas Recebidas', data: chartData.qtdTributo.data, backgroundColor: ['#38bdf8', '#34d399', '#fde047'] }] }; 
        charts.cancelamentoValorMes.data = { labels: chartData.cancelamentoValorMes.labels, datasets: [{ label: 'Valor Cancelado (R$)', data: chartData.cancelamentoValorMes.data, backgroundColor: '#ef4444' }] }; 
        charts.cancelamentoQtdMes.data = { labels: chartData.cancelamentoQtdMes.labels, datasets: [{ label: 'Qtd Cancelada', data: chartData.cancelamentoQtdMes.data, backgroundColor: '#dc2626' }] }; 
        charts.emitidoArrecadadoMes.data = { labels: chartData.emitidoArrecadadoMes.labels, datasets: [ { label: 'Valor Emitido (R$)', data: chartData.emitidoArrecadadoMes.datasets[0].data, borderColor: '#0284c7', fill: false, tension: 0.4 }, { label: 'Valor Arrecadado (R$)', data: chartData.emitidoArrecadadoMes.datasets[1].data, borderColor: '#16a34a', fill: false, tension: 0.4 }]}; 
        charts.radar.data = { labels: chartData.radar.labels, datasets: chartData.radar.datasets.map((ds, i) => ({ ...ds, fill: true, backgroundColor: i === 0 ? 'rgba(2, 132, 199, 0.2)' : 'rgba(22, 163, 74, 0.2)', borderColor: i === 0 ? '#0284c7' : '#16a34a', pointBackgroundColor: i === 0 ? '#0284c7' : '#16a34a' })) }; 
        charts.polar.data = { labels: chartData.polar.labels, datasets: [{ label: 'Quantidade de Cartas', data: chartData.polar.data, backgroundColor: ['#0ea5e9', '#22c55e', '#facc15', '#f97316', '#ef4444'] }] }; 
        charts.bubble.data = { datasets: chartData.bubble.datasets.map((ds, i) => ({ ...ds, backgroundColor: ['rgba(14, 165, 233, 0.7)', 'rgba(34, 197, 94, 0.7)', 'rgba(250, 204, 21, 0.7)', 'rgba(239, 68, 68, 0.7)'][i] })) }; 
        charts.pagamentoCanal.data = { labels: chartData.pagamentoCanal.labels, datasets: [{ label: 'Pagamentos por Canal', data: chartData.pagamentoCanal.data, backgroundColor: chartColors }] }; 
        charts.perfilContribuinte.data = { labels: chartData.perfilContribuinte.labels, datasets: [{ label: 'Total Arrecadado (R$)', data: chartData.perfilContribuinte.data, backgroundColor: ['#0284c7', '#16a34a'] }] }; 
        Object.values(charts).forEach(chart => chart.update());
    };
    
    // --- EVENT LISTENERS ---
    document.getElementById('carta-cobranca-select').addEventListener('change', (e) => { currentDataKey = e.target.value; updateDashboard(mockData[currentDataKey]); });
    
    document.getElementById('agelist-table-body').addEventListener('click', (e) => { const row = e.target.closest('tr'); if (row && row.dataset.rangeIndex) { openAgelistModal(parseInt(row.dataset.rangeIndex)); } });
    
    // --- MODAL HANDLING ---
    const agelistModal = document.getElementById('agelist-modal');
    const chartModal = document.getElementById('chart-modal');
    const contributorDamsModal = document.getElementById('contributor-dams-modal');
    
    const openModal = (modal) => {
        const loader = modal.querySelector('.loader');
        const modalBody = modal.querySelector('.modal-body');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        if (loader && modalBody) {
            loader.classList.remove('hidden');
            modalBody.classList.add('invisible');
        }

        setTimeout(() => { // Show modal content
            if (loader && modalBody) {
                loader.classList.add('hidden');
                modalBody.classList.remove('invisible');
            }
            modal.classList.remove('opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-95');
        }, 400); // Simulate loading time
    };

    const closeModal = (modal) => {
        modal.classList.add('opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            if (modal.id === 'chart-modal' && modalChart) {
                modalChart.destroy();
                modalChart = null;
            }
        }, 300);
    };
    
    document.getElementById('agelist-modal-close').addEventListener('click', () => closeModal(agelistModal));
    document.getElementById('chart-modal-close').addEventListener('click', () => closeModal(chartModal));
    document.getElementById('contributor-dams-modal-close').addEventListener('click', () => closeModal(contributorDamsModal));
    
    agelistModal.addEventListener('click', (e) => e.target === agelistModal && closeModal(agelistModal));
    chartModal.addEventListener('click', (e) => e.target === chartModal && closeModal(chartModal));
    contributorDamsModal.addEventListener('click', (e) => e.target === contributorDamsModal && closeModal(contributorDamsModal));
    
    function openAgelistModal(rangeIndex) { 
        const range = agelistRanges[rangeIndex]; 
        const fullList = mockData[currentDataKey].tables.fullList; 
        const filteredList = fullList.filter(item => (currentAgelistFilter === 'all' || (currentAgelistFilter === 'pf' && item.type === 'user') || (currentAgelistFilter === 'pj' && item.type === 'building')) && item.value >= range.min && item.value <= range.max); 
        const modalTableBody = document.getElementById('agelist-modal-table-body'); 
        if (filteredList.length > 0) { 
            modalTableBody.innerHTML = filteredList.map(item => 
                `<tr class="border-b border-slate-100">
                    <td class="px-6 py-3"><div class="flex items-center gap-2"><i class="fa-solid fa-${item.type === 'building' ? 'building' : 'user'} text-slate-400"></i>${item.name}</div></td>
                    <td class="px-6 py-3 text-right font-mono">${formatCurrency(item.value)}</td>
                    <td class="px-6 py-3 text-center"><a href="#" class="text-sky-600 hover:underline text-sm"><i class="fa-solid fa-file-invoice-dollar"></i> #${Math.floor(100000 + Math.random() * 900000)}</a></td>
                </tr>`).join(''); 
        } else { 
            modalTableBody.innerHTML = `<tr><td colspan="3" class="text-center p-8 text-slate-500">Nenhum contribuinte encontrado nesta faixa.</td></tr>`; 
        } 
        openModal(agelistModal); 
    }
    
    function openContributorDamsModal(contributorName) {
        const allContributors = [...mockData[currentDataKey].tables.top, ...mockData[currentDataKey].tables.bottom];
        const contributor = allContributors.find(c => c.name === contributorName);

        if (!contributor || !contributor.dams) {
            console.error("Contributor not found or has no DAMs:", contributorName);
            return;
        }

        document.getElementById('contributor-name-in-modal').textContent = contributor.name;
        const modalTableBody = document.getElementById('contributor-dams-table-body');
        
        if (contributor.dams.length > 0) {
            modalTableBody.innerHTML = contributor.dams.map(dam => 
                `<tr class="border-b border-slate-100">
                    <td class="px-6 py-3 font-mono text-slate-700">#${dam.id}</td>
                    <td class="px-6 py-3">${dam.tipo}</td>
                    <td class="px-6 py-3 text-center">${dam.parcela}</td>
                    <td class="px-6 py-3 text-right font-mono">${formatCurrency(dam.multa)}</td>
                    <td class="px-6 py-3 text-right font-mono">${formatCurrency(dam.juros)}</td>
                    <td class="px-6 py-3 text-right font-mono">${formatCurrency(dam.correcao)}</td>
                    <td class="px-6 py-3 text-right font-mono text-green-600">${formatCurrency(dam.desconto)}</td>
                    <td class="px-6 py-3 text-right font-mono font-bold">${formatCurrency(dam.valor)}</td>
                </tr>`
            ).join('');
        } else {
            modalTableBody.innerHTML = `<tr><td colspan="8" class="text-center p-8 text-slate-500">Nenhum DAM encontrado para este contribuinte.</td></tr>`;
        }
        
        openModal(contributorDamsModal);
    }
    
    function addTableEventListeners() {
        document.querySelectorAll('.contributor-row').forEach(row => {
            row.addEventListener('click', (e) => {
                const contributorName = e.currentTarget.dataset.contributorName;
                openContributorDamsModal(contributorName);
            });
        });
    }

    function openChartModal(chartName, buttonElement, filtersAvailable) {
        const originalChart = charts[chartName];
        if (!originalChart) { console.error(`Chart with name ${chartName} not found.`); return; }
        const modalChartData = JSON.parse(JSON.stringify(originalChart.data));
        const modalChartOptions = JSON.parse(JSON.stringify(originalChart.options));
        modalChartOptions.responsive = true;
        modalChartOptions.maintainAspectRatio = false;
        if (['doughnut', 'polarArea', 'pie', 'radar'].includes(originalChart.config.type)) {
            modalChartOptions.scales = { y: { beginAtZero: true, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } }, x: { grid: { display: false }, ticks: { color: '#64748b' } } };
            if (originalChart.config.type === 'radar') { modalChartOptions.elements = { line: { tension: 0.1 } }; }
        }
        if (chartName === 'bubble') { modalChartOptions.scales = { x: { title: { display: true, text: 'Quantidade de Cartas' }, grid: { display: false }, ticks: { color: '#64748b' } }, y: { title: { display: true, text: 'Valor Médio (R$)' }, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } } }; }
        
        const titleElement = buttonElement.closest('article').querySelector('h3 span');
        const iconElement = buttonElement.closest('article').querySelector('h3 i');
        const titleText = titleElement ? titleElement.textContent : "Detalhes do Gráfico";
        const iconClass = iconElement ? iconElement.className : "fa-solid fa-chart-simple";
        
        document.getElementById('chart-modal-title').innerHTML = `<i class="${iconClass}"></i><span>${titleText}</span>`;
        document.getElementById('chart-modal_description').innerHTML = chartDescriptions[chartName] || 'Descrição não disponível.';
        
        if(modalChart) { modalChart.destroy(); }

        const chartModalFilterSection = document.getElementById('chart-modal-filter-section');
        if (filtersAvailable) {
            chartModalFilterSection.classList.remove('hidden');
        } else {
            chartModalFilterSection.classList.add('hidden');
        }

        modalChart = new Chart(document.getElementById('modal-chart-canvas').getContext('2d'), { type: originalChart.config.type, data: modalChartData, options: modalChartOptions });
        document.getElementById('chart-modal-download-btn').onclick = () => { if (modalChart) { const a = document.createElement('a'); a.href = modalChart.toBase64Image('image/png', 1.0); a.download = `grafico-${chartName}-${currentDataKey}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); }};
        openModal(chartModal);
    }
    
    document.getElementById('charts-grid').addEventListener('click', (e) => {
        const expandButton = e.target.closest('.open-chart-modal-btn');
        const downloadButton = e.target.closest('.download-chart-btn');

        if (expandButton) {
            const chartName = expandButton.dataset.chartName;
            const filtersAvailable = expandButton.dataset.filtersAvailable === 'true';
            openChartModal(chartName, expandButton, filtersAvailable);
            return;
        }

        if (downloadButton) {
            const chartName = downloadButton.dataset.chartName;
            const chart = charts[chartName];
            if (chart) {
                const a = document.createElement('a');
                a.href = chart.toBase64Image('image/png', 1.0);
                a.download = `grafico-${chartName}-${currentDataKey}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            return;
        }
    });

    // --- INITIALIZE ---
    initCharts();
    updateDashboard(mockData[currentDataKey]);
});