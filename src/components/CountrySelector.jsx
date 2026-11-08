import SelectInput from "./inputs/SelectInput";

const countries = [
  { value: "PL", label: "🇵🇱 Poland" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "NL", label: "🇳🇱 Netherlands" },
];

const CountrySelector = ({ selectedCountry, onChange }) => {
  return (
    <div>
      <SelectInput
        label="Country"
        name="country"
        options={countries}
        value={selectedCountry}
        onChange={onChange}
      />
    </div>
  );
};

export default CountrySelector;
