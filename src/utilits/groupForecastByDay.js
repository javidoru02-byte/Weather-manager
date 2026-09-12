export const getDailyForecast = (list = []) => {
  const grouped = {};

  list.forEach((item) => {
    const [date, time] = item.dt_txt.split(" ");
    const hour = Number(time.split(":")[0]);
    const diffFromNoon = Math.abs(hour - 12);

    if (!grouped[date] || diffFromNoon < grouped[date].diffFromNoon) {
      grouped[date] = { ...item, diffFromNoon };
    }
  });

  return Object.values(grouped)
    .sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt))
    .slice(0, 5);
};