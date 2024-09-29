import Chart from "react-apexcharts";
import './chart.css';

export default function ChartGastos({ data, xKey, yKey, calculateYValue, title1, title2, horizontal }) {
  // Extrair os valores únicos do eixo X (baseado na chave xKey)
  const categorias = [...new Set(data.map((item) => item[xKey]))];

  // Calcular os valores do eixo Y (baseado na função de cálculo passada como prop)
  const valoresY = categorias.map((categoria) => {
    return data
      .filter((item) => item[xKey] === categoria)
      .reduce((acc, curr) => acc + calculateYValue(curr), 0);
  });

  // Combinar categorias com valores Y para fazer a ordenação
  const dadosOrdenados = categorias
    .map((categoria, index) => ({
      categoria,
      valor: valoresY[index],
    }))
    .sort((a, b) => a.valor - b.valor); // Ordenar do menor para o maior

  // Separar categorias e valores após a ordenação
  const categoriasOrdenadas = dadosOrdenados.map((item) => item.categoria);
  const valoresYOrdenados = dadosOrdenados.map((item) => item.valor);

  // Criar uma série de dados com os valores calculados e ordenados
  const series = [
    {
      name: yKey, // Nome da série (pode ser passado como prop)
      data: valoresYOrdenados,
    },
  ];

  // Configurações do gráfico
  const options = {
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(0); // Formatar para duas casas decimais
      },
      enabled: true,
    },
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: horizontal, // Definir se o gráfico será horizontal ou vertical
      },
    },
    xaxis: {
      categories: categoriasOrdenadas, // Categorias do eixo X ordenadas
      title: {
        text: title1, // Título do eixo X
        style: {
          color: "var(--text-50)",
        },
      },
      labels: {
        style: {
          colors: "var(--text-50)",
        },
      },
    },
    yaxis: {
      title: {
        text: title2, // Título do eixo Y
        style: {
          color: "var(--text-50)",
          transition: "all 0.3s",
        },
      },
      labels: {
        style: {
          colors: "var(--text-50)",
        },
        formatter: function (val) {
          return val.toFixed(0); // Formatar para 0 casas decimais
        },
      },
    },
    
    tooltip: {
      theme: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2); // Formatar como valor numérico
        },
      },
    },
    legend: {
      labels: {
        colors: "var(--text-50)",
      },
      markers: {
        radius: "50%",
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height="100%"
      width="100%"
    />
  );
}
