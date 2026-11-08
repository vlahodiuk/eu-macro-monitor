const KpiCard = ({
  title,
  value,
  change,
  year,
  icon: Icon,
  loading = false,
  error = null,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 animate-pulse dark:border-slate-700 dark:bg-slate-800">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-white p-4 dark:border-red-900 dark:bg-slate-800">
        <h3 className="text-sm text-slate-600 dark:text-slate-400">{title}</h3>
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Unable to load data
        </p>
      </div>
    );
  }

  // Normal state
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </h3>

        {Icon && (
          <Icon size={20} className="text-cyan-600 dark:text-cyan-400" />
        )}
      </div>

      <p className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>

      <p
        className={
          change == null
            ? "text-slate-500 dark:text-slate-400"
            : change > 0
              ? "text-green-600 dark:text-green-400"
              : change < 0
                ? "text-red-600 dark:text-red-400"
                : "text-slate-500 dark:text-slate-400"
        }
      >
        {change == null
          ? "N/A"
          : `${change > 0 ? "+" : ""}${change.toFixed(1)} pp`}
      </p>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {year != null ? `Data for ${year}` : "No data available"}
      </p>
    </div>
  );
};

export default KpiCard;
