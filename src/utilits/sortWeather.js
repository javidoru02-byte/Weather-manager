export function sortTemperatureForFiveDays(list) {
  const grouped = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(Math.floor(item.main.temp));
  });

  return Object.entries(grouped).map(([date, temps]) => ({
    date,
    temp: temps.reduce((a, b) => a + b, 0) / temps.length,
  }));
}