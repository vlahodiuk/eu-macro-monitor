export const calculateKpi = (data) => {
  if (data.length === 0) {
    return {
      value: null,
      change: null,
      year: null,
    };
  }

  const latest = data.at(-1);

  const previousYear = String(Number(latest.year) - 1);

  const previous = data.find((item) => item.year === previousYear);

  const change = previous ? latest.value - previous.value : null;

  return {
    value: latest.value,
    change: change,
    year: latest.year,
  };
};
