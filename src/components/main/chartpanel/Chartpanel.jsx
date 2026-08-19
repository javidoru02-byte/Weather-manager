import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { sortTemperatureForFiveDays } from "../../../utilits/sortWeather";

function ChartsPanel() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const forecastData = useSelector((state) => state.weather.forecastData);

  useEffect(() => {
    if (!forecastData) return;

    const temperatures = sortTemperatureForFiveDays(forecastData.list);
    const labels = temperatures.map((day) => day.date);
    const temps = temperatures.map((day) => day.temp);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderColor: "rgba(0, 209, 209, 0.55)",
            backgroundColor: "rgba(5, 255, 255, 0.2)",
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.4,
          },
        ],
      },

      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "5-Day Temperature Forecast",
          },
          tooltip: {
            backgroundColor: "#5f676e",
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            border: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(50, 61, 59, 0.25)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [forecastData]);

  return (
    <div className="charts-panel">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ChartsPanel;
