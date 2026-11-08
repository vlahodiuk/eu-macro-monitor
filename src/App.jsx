import KpiCard from "./components/KpiCard";
import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import {
  fetchGdpData,
  fetchInflationData,
  fetchUnemploymentData,
} from "./services/eurostatApi";
import GdpChart from "./components/GdpChart";
import YearSelector from "./components/YearSelector";
import { useEurostatData } from "./hooks/useEurostatData";
import { calculateKpi } from "./utils/calculateKpi";
import { TrendingUp, Activity, Users } from "lucide-react";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };
  // Country State
  const [selectedCountry, setSelectedCountry] = useState("PL");
  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Period State
  const [selectedPeriod, setPeriod] = useState(10);
  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  const {
    data: gdpData,
    loading: gdpLoading,
    error: gdpError,
  } = useEurostatData(fetchGdpData, selectedCountry);

  const {
    data: inflationData,
    loading: inflationLoading,
    error: inflationError,
  } = useEurostatData(fetchInflationData, selectedCountry);

  const {
    data: unemploymentData,
    loading: unemploymentLoading,
    error: unemploymentError,
  } = useEurostatData(fetchUnemploymentData, selectedCountry);

  const gdpKpi = calculateKpi(gdpData);
  const inflationKpi = calculateKpi(inflationData);
  const unemploymentKpi = calculateKpi(unemploymentData);

  const filteredGdpData = gdpData.slice(-selectedPeriod);

  const indicators = [
    {
      id: "gdp",
      title: "GDP Growth",
      icon: TrendingUp,
      value:
        gdpLoading || gdpError || gdpKpi.value == null
          ? "—"
          : `${gdpKpi.value.toFixed(1)}%`,
      change: gdpLoading || gdpError ? null : gdpKpi.change,
      year: gdpLoading || gdpError ? null : gdpKpi.year,
      loading: gdpLoading,
      error: gdpError,
    },
    {
      id: "inflation",
      title: "Inflation",
      icon: Activity,
      value:
        inflationLoading || inflationError || inflationKpi.value == null
          ? "—"
          : `${inflationKpi.value.toFixed(1)}%`,
      change: inflationLoading || inflationError ? null : inflationKpi.change,
      year: inflationLoading || inflationError ? null : inflationKpi.year,
      loading: inflationLoading,
      error: inflationError,
    },
    {
      id: "unemployment",
      title: "Unemployment",
      icon: Users,
      value:
        unemploymentLoading ||
        unemploymentError ||
        unemploymentKpi.value == null
          ? "-"
          : `${unemploymentKpi.value.toFixed(1)}%`,
      change:
        unemploymentLoading || unemploymentError
          ? null
          : unemploymentKpi.change,
      year:
        unemploymentLoading || unemploymentError ? null : unemploymentKpi.year,
      loading: unemploymentLoading,
      error: unemploymentError,
    },
  ];
  return (
    // Outer container: full-screen background
    <div
      className={`min-h-screen ${
        isDark ? "dark bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Inner container: centered content with limited width */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        {/* Country and year selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl">
          <CountrySelector
            selectedCountry={selectedCountry}
            onChange={handleChange}
          />

          <YearSelector
            selectedPeriod={selectedPeriod}
            onChange={handleChangePeriod}
          />
        </div>
        {gdpLoading && <p className="text-cyan-400">Loading GDP data...</p>}

        {!gdpLoading && gdpError && (
          <p className="text-red-400">❌ Failed to load GDP data: {gdpError}</p>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {indicators.map((indicator) => {
            return (
              <KpiCard
                key={indicator.id}
                title={indicator.title}
                value={indicator.value}
                change={indicator.change}
                year={indicator.year}
                icon={indicator.icon}
                loading={indicator.loading}
                error={indicator.error}
              />
            );
          })}
        </div>
        <GdpChart
          data={filteredGdpData}
          loading={gdpLoading}
          error={gdpError}
          isDark={isDark}
        />
      </div>
    </div>
  );
}

export default App;
