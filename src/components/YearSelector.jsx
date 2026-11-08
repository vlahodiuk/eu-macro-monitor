import SelectInput from "./inputs/SelectInput";

const years = [
  { value: 3, label: "3 Years" },
  { value: 5, label: "5 Years" },
  { value: 10, label: "10 Years" },
];

const YearSelector = ({ selectedPeriod, onChange }) => {
  return (
    <div>
      <SelectInput
        label="Time Range"
        name="timeRange"
        options={years}
        value={selectedPeriod}
        onChange={onChange}
      />
    </div>
  );
};

export default YearSelector;
