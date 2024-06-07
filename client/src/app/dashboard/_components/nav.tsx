import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const NavDashboard = () => {
  return (
    <nav className=" border-gray-200">
      <div className="flex gap-5 w-full justify-between">
        <div>
          <p>Page Name</p>
        </div>
        <div>
          <a
            href="/dashboard/create-event"
            className="text-white hidden md:flex gap-1 items-center bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-full text-sm"
          >
            <IoAdd className="text-lg" />
            Add Event
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavDashboard;
