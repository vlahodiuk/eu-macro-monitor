export const transformEurostat = (data) => {
  const years = Object.keys(data.dimension.time.category.index);
  const result = years
    .map((year) => ({
      year: year,
      value: data.value[data.dimension.time.category.index[year]],
    }))
    .filter(
      (item) => typeof item.value === "number" && Number.isFinite(item.value),
    )
    .sort((a, b) => Number(a.year) - Number(b.year));
  return result;
};
