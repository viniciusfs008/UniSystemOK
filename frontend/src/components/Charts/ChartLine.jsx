import Chart from "react-apexcharts";
import './chart.css';

export default function ChartColumn({ data, selectedCities, column, title1, title2, name}) {
  // Extrair os anos e as cidades do conjunto de dados
  const valores = [...new Set(data.map((item) => item[column]))];

  let series = [];
  // Organizar os dados em um formato adequado para o gráfico
  if (selectedCities.length === 0) {
    // Se nenhum cidade selecionada, calcular o total de casos para todas as cidades
    const totalCasos = valores.map((valor) => {
      const totalItens = data
        .filter((item) => item[column] === valor)
        .reduce((acc, curr) => acc + curr.NumeroCasos, 0);
      return totalItens;
    });

    // Criar uma única série de dados para representar o total de casos
    series.push({
      name: name ? name : "Número de Casos",
      data: totalCasos,
    });
  } else {
    // Se cidades selecionadas, calcular os casos para cada cidade
    series = selectedCities.map((city) => {
      return {
        name: city,
        data: valores.map((valor) => {
          const record = data.find(
            (item) =>
              item[column] === valor && item.MunicipioResidencia === city
          );
          return record ? record.NumeroCasos : 0;
        }),
      };
    });
  }

  // Configurações do gráfico
  const options = {
    dataLabels: {
      enabled: true,
    },
    chart: {
      type: "line",
    },
    stroke: {
        width: 3,
        curve: "straight",
      },
    xaxis: {
      categories: valores,
      title: {
        text: title1,
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
        text: title2,
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
    tooltip: {
      theme: false,
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    legend: {
      labels: {
        colors: "var(--text-50)",
      },
    },
  };

  return (
      <Chart
        options={options}
        series={series}
        type="line"
        height="100%"
        width="100%"
      />
  );
}
