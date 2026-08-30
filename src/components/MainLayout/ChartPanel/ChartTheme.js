
export const CHART_COLORS = {
  accent: "#00D1D1",
  textMuted: "rgba(231, 241, 243, 0.72)",
  gridLine: "rgba(231, 241, 243, 0.08)",
  tooltipBg: "#111C2E",
};

export function buildTemperatureChartConfig(labels, temperatures, t) {
  const { accent, textMuted, gridLine, tooltipBg } = CHART_COLORS;

  return {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: t("forecast.tempLabel"),
          data: temperatures,
          borderColor: accent,
          backgroundColor: "rgba(0, 209, 209, 0.15)",
          pointBackgroundColor: accent,
          pointBorderColor: "#04141A",
          pointRadius: 4,
          pointHoverRadius: 7,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textMuted, font: { family: "monospace" } },
        },
        tooltip: {
          backgroundColor: tooltipBg,
          borderColor: "rgba(0, 209, 209, 0.35)",
          borderWidth: 1,
          titleColor: "#E7F1F3",
          bodyColor: "#E7F1F3",
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          border: { display: false },
          grid: { color: gridLine },
          ticks: { color: textMuted },
        },
        y: {
          beginAtZero: true,
          grid: { color: gridLine },
          ticks: { color: textMuted },
        },
      },
    },
  };
}