import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "use-debounce";

const SearchOnNavbar = () => {
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 500);

  return (
    <form className="w-[400px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="search event here"
          className="w-full h-10 p-4 rounded-full bg-slate-800 text-sm text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-slate-600 text-white rounded-full"
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchOnNavbar;
