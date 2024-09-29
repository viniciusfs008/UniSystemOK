import Chart from "react-apexcharts";
import './chart.css';

export default function ChartBar({ data, selectedCities, column, title1, title2, horizontal, name}) {
  // Extrair os anos e as cidades do conjunto de dados
  const valores = [...new Set(data.map((item) => item[column]))];

  let series = [];
  // Calcular o total de casos para todas as cidades
  const totalCasos = valores.map((valor) => {
    return data
      .filter((item) => item[column] === valor)
      .reduce((acc, curr) => acc + curr.NumeroCasos, 0);
  });

  if (selectedCities.length === 0) {
    // Criar uma única série de dados para representar as porcentagens de casos
    series.push({
      name: name ? name : "Percentual de Casos",
      data: totalCasos.map((total, index) => {
        return (total / totalCasos.reduce((a, b) => a + b, 0)) * 100;
      }),
    });
  } else {
    // Calcular as porcentagens de casos para cada cidade selecionada
    series = selectedCities.map((city) => {
      const cityTotal = data
        .filter((item) => item.MunicipioResidencia === city)
        .reduce((acc, curr) => acc + curr.NumeroCasos, 0);
      return {
        name: city,
        data: valores.map((valor) => {
          const record = data.find(
            (item) =>
              item[column] === valor && item.MunicipioResidencia === city
          );
          return record ? (record.NumeroCasos / cityTotal) * 100 : 0;
        }),
      };
    });
  }

  // Configurações do gráfico
  const options = {
    dataLabels: {
      formatter: function(val) {
        return val.toFixed(0) + "%"; // Formatar para duas casas decimais
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
        horizontal: horizontal,
      },
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
        formatter: function(val) {
          return val.toFixed(0) + "%"; // Formatar para duas casas decimais
        },
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
          transition: "all 0.3s",
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
          return val.toFixed(2) + "%";
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
