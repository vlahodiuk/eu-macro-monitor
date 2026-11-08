import { transformEurostat } from "../utils/transformEurostat";
const API_URL =
  "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tec00115";

export const fetchGdpData = async (country, signal) => {
  const response = await fetch(
    `${API_URL}?geo=${country}&lastTimePeriod=10&lang=EN`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(`Eurostat API error: ${response.status}`);
  }

  const data = await response.json();

  return transformEurostat(data);
};

export const fetchInflationData = async (country, signal) => {
  const API_URL =
    "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_ainr";

  const params = new URLSearchParams({
    geo: country,
    freq: "A",
    unit: "RCH_A_AVG",
    coicop18: "TOTAL",
    lastTimePeriod: "10",
    lang: "EN",
  });

  const response = await fetch(`${API_URL}?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Eurostat inflation API error: ${response.status}`);
  }

  const data = await response.json();

  return transformEurostat(data);
};

export const fetchUnemploymentData = async (country, signal) => {
  const API_URL =
    "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/une_rt_a";

  const params = new URLSearchParams({
    geo: country,
    freq: "A",
    age: "Y15-74",
    sex: "T",
    unit: "PC_ACT",
    lastTimePeriod: "10",
    lang: "EN",
  });

  const response = await fetch(`${API_URL}?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Eurostat unemployment API error: ${response.status}`);
  }

  const data = await response.json();

  return transformEurostat(data);
};
