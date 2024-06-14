interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-3 md:flex-col md:gap-1 items-center md:items-start">
      <label htmlFor="category" className="font-semibold">
        Category
      </label>
      <select
        id="category"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Music">Music</option>
        <option value="Sport">Sport</option>
        <option value="Workshop">Workshop</option>
      </select>
    </div>
  );
};

export default CategorySelect;
