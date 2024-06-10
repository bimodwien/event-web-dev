import { BiSearch } from "react-icons/bi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex px-3 items-center gap-3 border-gray-300 border rounded-full w-80  p-2 ">
      <BiSearch className=" w-4 h-4" />
      <input
        type="search"
        placeholder="Search any event here"
        className="w-full outline-none "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
