interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-3 md:flex-col md:gap-1  items-center md:items-start">
      <label htmlFor="city" className="font-semibold">
        City
      </label>
      <select
        id="city"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Jakarta">Jakarta</option>
        <option value="Bandung">Bandung</option>
        <option value="Surabaya">Surabaya</option>
      </select>
    </div>
  );
};

export default CitySelect;
